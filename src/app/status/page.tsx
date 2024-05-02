import { getLatestCommit, ping } from '~/lib/redis'
import { cn } from '~/lib/utils'

const Page = async () => {
  const pings = await ping()

  const latestCommit = await getLatestCommit()

  return (
    <div className="font-mono">
      <h2 className={cn(pings.length > 0 && 'text-green-500')}>Redis PING</h2>
      {pings.length ? (
        <p>
          Max: {Math.round(Math.max(...pings))}ms / Min:{' '}
          {Math.round(Math.min(...pings))}ms / Avg:{' '}
          {Math.round(pings.reduce((a, b) => a + b, 0) / pings.length)}ms
        </p>
      ) : (
        <p>Redis connection lost</p>
      )}

      <h2
        className={cn(
          process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA === latestCommit.sha &&
            'text-green-500',
        )}
      >
        Commit
      </h2>
      <p>Instance: {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? 'NA'}</p>
      <p>Remote: {latestCommit.sha ?? 'NA'}</p>
    </div>
  )
}

export default Page
