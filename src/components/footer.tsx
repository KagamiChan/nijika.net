export const Footer = () => {
  const nowYear = new Date().getFullYear()
  return (
    <footer className="border-t p-4 md:p-8">
      <p>
        ©{nowYear === 2024 ? nowYear : `2024-${nowYear}`}&nbsp;
        <span className="text-primary">虹夏</span>工房 feat.
        <span className="text-[#0099FF]">かがみ</span>， 内容基于&nbsp;
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/legalcode"
          target="_blank"
        >
          CC-BY-SA 4.0
        </a>
        &nbsp;授权。图标字型来自于
        <a href="https://makefont.com/font-1778.html" target="_blank">
          造字工房
        </a>
        。
      </p>
      {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA && (
        <p>
          版本：
          <span className="font-mono">
            {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA.slice(0, 7)}-
            {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}
          </span>
        </p>
      )}
    </footer>
  )
}
