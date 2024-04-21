"use server";
import MiniSearch, { type SearchResult } from "minisearch";
import { type Post, allPosts } from "contentlayer/generated";

interface SearchResponse {
  result: (SearchResult | Post)[] | null;
}

const flattenPosts = allPosts.map((post) => ({
  id: post._id,
  title: post.title,
  body: post.body.raw,
  url: post.url,
}));

const segmenter = new Intl.Segmenter("zh", { granularity: "word" });

const miniSearch = new MiniSearch({
  fields: ["title", "body"],
  storeFields: ["title", "url"],
  tokenize: (text) =>
    [...segmenter.segment(text)]
      .map(({ segment, isWordLike }) => isWordLike && segment)
      .filter(Boolean) as string[],
});
miniSearch.addAll(flattenPosts);

export const handleSearch = async (
  _: SearchResponse,
  formData: FormData,
): Promise<SearchResponse> => {
  const query = formData.get("q") as string;

  if (!query) {
    return { result: [] };
  }

  const matched = miniSearch.search(formData.get("q") as string, {
    fuzzy: 0.4,
  });

  const result = matched.map((item) => {
    const post = allPosts.find((p) => p._id === item.id);
    return {
      ...item,
      ...post,
    };
  });

  return { result };
};
