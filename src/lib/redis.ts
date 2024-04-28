import { Redis } from '@upstash/redis'
import pRetry from 'p-retry'

import { randomId } from './random-id'

const ID_LENGTH = 4

enum PostsIDStorageKeys {
  URLMap = 'postsURLMap',
  Views = 'views',
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

    const id = randomId(ID_LENGTH)
    if (await redis.sismember(PostsIDStorageKeys.KnownIds, id)) {
      throw new Error('ID already exists')
    }
    await redis.sadd(PostsIDStorageKeys.KnownIds, id)
    return id
  })

export const ensurePostId = async (
  postPath: string,
): Promise<string | null> => {
  const redis = ensureRedis()
  if (!redis) {
    return null
  }

  const entry = await redis.hget<URLMapEntry>(
    PostsIDStorageKeys.URLMap,
    postPath,
  )

  if (!entry) {
    const id = await ensureNewId()
    await redis.hset(PostsIDStorageKeys.URLMap, {
      [postPath]: {
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

  const map = await redis.hget<URLMapEntry>(PostsIDStorageKeys.URLMap, id)

  if (!map) {
    return null
  }

  return map.id
}

export const increaseCount = async (key: string) => {
  const redis = ensureRedis()
  if (!redis) {
    return null
  }

  return redis.hincrby(PostsIDStorageKeys.Views, key, 1)
}

export const getCount = async (key: string) => {
  const redis = ensureRedis()
  if (!redis) {
    return null
  }

  return redis.hget<number>(PostsIDStorageKeys.Views, key)
}
