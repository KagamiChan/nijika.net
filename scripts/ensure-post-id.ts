import path from 'node:path/posix'
import fs from 'node:fs/promises'

import * as glob from 'glob'
import pMap from 'p-map'
import pRetry from 'p-retry'
import matter from 'gray-matter'
import { customAlphabet } from 'nanoid'

const randomId = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz')

const main = async () => {
  const files = glob.sync(
    path.resolve(import.meta.dirname, '../contents/*/*.mdx'),
  )

  const pendingAssignments: {
    file: string
    result: ReturnType<typeof matter>
  }[] = []

  const knownIds: string[] = []

  await pMap(files, async (file) => {
    const content = await fs.readFile(file, 'utf-8')
    const result = matter(content)
    if (!result.data.id) {
      pendingAssignments.push({
        file,
        result,
      })
    } else {
      knownIds.push(result.data.id)
    }
  })

  await pMap(pendingAssignments, async ({ file, result }) => {
    const id = await pRetry(() => {
      const id = randomId(5)
      if (knownIds.includes(id)) {
        throw new Error('ID collision')
      }
      return id
    })
    const newContent = matter.stringify(result.content, { ...result.data, id })
    await fs.writeFile(file, newContent)
  })
}

void main()
