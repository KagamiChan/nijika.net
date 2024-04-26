import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { sha256 } from './hash'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getViewsKey = (str: string) => `views:${str}`

export const getViewsKeyByPostPath = async (path: string) => {
  const shasum = await sha256(path)
  return getViewsKey(shasum)
}
