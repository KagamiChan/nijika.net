import { type MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image, { type ImageProps } from 'next/image'
import { type DetailedHTMLProps, type ImgHTMLAttributes } from 'react'

const mdxComponents = {
  Image,
  img: (
    props: DetailedHTMLProps<
      ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
  ) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      {...(props as ImageProps)}
    />
  ),
} satisfies MDXComponents

export const Content = ({
  code,
  className,
}: {
  code: string
  className: string
}) => {
  const MDX = useMDXComponent(code)

  return <MDX className={className} components={mdxComponents} />
}
