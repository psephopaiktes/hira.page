import { type CollectionEntry, getCollection } from "astro:content";

type LoadCollectionResult = {
  posts: CollectionEntry<'blog' | 'works'>[];
  tags: string[];
  tagCounts: Record<string, number>;
};

const loadCollection = async (collection: 'blog' | 'works'): Promise<LoadCollectionResult> => {
  // 記事一覧を取得
  const posts = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  // タグの件数リストと、件数順のタグ一覧を取得
  const tagCounts: Record<string, number> = {};
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  const tags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

  return { posts, tags, tagCounts };
};

export { loadCollection };
