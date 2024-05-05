import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import {
  type FC,
  useMemo,
  type DetailedHTMLProps,
  type ImgHTMLAttributes,
} from 'react'
import * as runtime from 'react/jsx-runtime'

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
}

type MDXContentProps = {
  [props: string]: unknown
  components?: MDXComponents
}

export const getMDXComponent = (code: string): FC<MDXContentProps> => {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function(code)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return fn({ ...runtime }).default
}

export const useMDXComponent = (code: string) => {
  return useMemo(() => getMDXComponent(code), [code])
}

export const MdxContent = ({
  code,
  className,
}: {
  code: string
  className?: string
}) => {
  const MDX = useMDXComponent(code)

  return <MDX className={className} components={mdxComponents} />
}
