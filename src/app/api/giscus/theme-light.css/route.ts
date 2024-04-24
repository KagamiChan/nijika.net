export const runtime = 'edge'

export const GET = async () => {
  const css = await fetch(new URL('theme.txt', import.meta.url)).then((res) =>
    res.text(),
  )
  const fontPatch = await fetch(
    new URL('../font-patch.txt', import.meta.url),
  ).then((res) => res.text())
  return new Response(`${fontPatch}\n\n${css}`, {
    headers: { 'content-type': 'text/plain' },
  })
}
