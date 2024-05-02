import { Redis } from '@upstash/redis'
import pRetry from 'p-retry'
import pMap from 'p-map'

import { randomId } from './random-id'

const ID_LENGTH = 4

enum PostsIDStorageKeys {
  URLMap = 'postsURLMap',
  Views = 'views',
  KnownIds = 'postsKnownIds',
  LatestCommit = 'latestCommit',
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

export const ping = async (): Promise<number[]> => {
  const redis = ensureRedis()
  if (!redis) {
    return []
  }

  const pings = await pMap(
    new Array(5),
    async () => {
      performance.mark('redis-ping-start')
      await redis.ping()
      performance.mark('redis-ping-end')

      return performance.measure(
        'redis-ping',
        'redis-ping-start',
        'redis-ping-end',
      ).duration
    },
    { concurrency: 1 },
  )
  return pings
}

interface Commit {
  sha: string
  url: string
  commit: {
    message: string
  }
}

export const getLatestCommit = async (): Promise<Commit> => {
  const redis = ensureRedis()
  if (!redis) {
    return {} as Commit
  }

  const commit = await redis.get<Commit>(PostsIDStorageKeys.LatestCommit)
  if (!commit) {
    console.log('no commit cached')
    const resp = await fetch(
      'https://api.github.com/repos/kagamichan/nijika.net/commits/main',
    )
    if (!resp.ok) {
      return {} as Commit
    }
    const result = (await resp.json()) as Commit
    await redis.set(PostsIDStorageKeys.LatestCommit, result, {
      ex: 10 * 60,
    })
    return result
  }

  return commit
}
