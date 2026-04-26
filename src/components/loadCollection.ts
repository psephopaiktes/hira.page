import type { Lang } from "@/i18n";
import { type CollectionEntry, getCollection } from "astro:content";

type LoadCollectionResult<T extends "blog" | "works"> = {
  posts: CollectionEntry<T>[];
  tags: string[];
  tagCounts: Record<string, number>;
};

const loadCollection = async <T extends "blog" | "works">(
  collection: T,
  locale?: Lang,
): Promise<LoadCollectionResult<T>> => {
  // 記事一覧を取得
  const posts = (await getCollection(collection))
    .filter(
      (post) =>
        // locale が指定された場合はフィルタリング
        (locale ? post.id.split("/")[0] === locale : true) &&
        // 本番環境ではドラフトを除外
        (import.meta.env.PROD ? post.data.draft !== true : true),
    )
    // 新しい日付順にソート
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  // タグの件数リストと、件数順のタグ一覧を取得
  const tagCounts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  const tags = Object.keys(tagCounts).sort(
    (a, b) => tagCounts[b] - tagCounts[a],
  );

  return { posts, tags, tagCounts };
};

export { loadCollection };
