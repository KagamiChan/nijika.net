interface Item {
  title: string
  url: string
  items?: Item[]
}

interface Items {
  items?: Item[]
}

export type TableOfContents = Items

export async function getTableOfContents(
  content: string
): Promise<TableOfContents>
