export const sha256 = (str: string) => {
  const buffer = new TextEncoder().encode(str)
  return crypto.subtle.digest('SHA-256', buffer).then((hash) => {
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  })
}
