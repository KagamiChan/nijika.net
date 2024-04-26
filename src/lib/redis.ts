import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'
import pRetry from 'p-retry'

const ID_LENGTH = 4

enum PostsIDStorageKeys {
  URLMap = 'postsURLMap',
  KnownIds = 'postsKnownIds',
}

interface URLMapEntry {
  id: string
  createdAt: number
}

const globalRedis: Redis | null = null

const ensureRedis = () => {
  if (globalRedis) {
    return globalRedis
  }
  try {
    return Redis.fromEnv()
  } catch (error) {
    console.error('Error connecting to Redis:', String(error))
    return null
  }
}

export const ensureNewId = async (): Promise<string | null> =>
  pRetry(async () => {
    const redis = ensureRedis()
    if (!redis) {
      return null
    }

    const id = nanoid(ID_LENGTH).toLowerCase()
    if (await redis.sismember(PostsIDStorageKeys.KnownIds, id)) {
      throw new Error('ID already exists')
    }
    await redis.sadd(PostsIDStorageKeys.KnownIds, id)
    return id
  })

export const ensurePostId = async (str: string): Promise<string | null> => {
  const redis = ensureRedis()
  if (!redis) {
    return null
  }
  const [entry] =
    (await redis.json.get<URLMapEntry[]>(
      PostsIDStorageKeys.URLMap,
      `$.${str}`,
    )) ?? []

  if (!entry) {
    const id = await ensureNewId()
    await redis.json.set(PostsIDStorageKeys.URLMap, '$', {
      [str]: {
        id,
        createdAt: Date.now(),
      },
    })

    return id
  }

  return entry.id
}

export const getUrlById = async (id: string) => {
  const redis = ensureRedis()
  if (!redis) {
    return
  }

  const [maps] =
    (await redis.json.get<Record<string, URLMapEntry>[]>(
      PostsIDStorageKeys.URLMap,
      '$',
    )) ?? []

  if (!maps) {
    return null
  }

  return (
    Object.entries(maps).find(([_, record]) => record.id === id)?.[0] ?? null
  )
}
