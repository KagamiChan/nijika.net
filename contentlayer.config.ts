import { pluginFramesTexts } from "@expressive-code/plugin-frames";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import rehypeExpressiveCode, {
  type ExpressiveCodeTheme,
} from "rehype-expressive-code";

import { defineDocumentType, makeSource } from "contentlayer/source-files";

pluginFramesTexts.addLocale("zh", {
  terminalWindowFallbackTitle: "终端窗口",
  copyButtonTooltip: "复制代码",
  copyButtonCopied: "复制成功🎉",
});

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  markdown: {
    rehypePlugins: [
      [
        rehypeExpressiveCode,
        {
          customizeTheme: (theme: ExpressiveCodeTheme) => {
            theme.name = theme.type;
            return theme;
          },
          themeCssSelector: (theme: ExpressiveCodeTheme) => `.${theme.name}`,
          useDarkModeMediaQuery: false,
          defaultLocale: "zh-CN",
          plugins: [pluginLineNumbers()],
          themes: ["dark-plus", "light-plus"],
          defaultProps: {
            wrap: true,
          },
        },
      ],
    ],
  },
});
