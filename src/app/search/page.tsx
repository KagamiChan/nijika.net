import { type Metadata } from "next"
import { SITE_TITLE, SITE_URL } from "~/constants"
import { Search } from "./search"

export const metadata = {
  title: `${SITE_TITLE}::搜索`,
  openGraph: {
    url: `${SITE_URL}/search`,
  },
} satisfies Metadata

const SearchPage = () => {
  return <Search />
}
export default SearchPage
