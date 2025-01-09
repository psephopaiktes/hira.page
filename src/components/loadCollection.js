import { getCollection } from "astro:content";

const loadCollection = async (collection) => {

  // 記事一覧を取得
  const posts = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  // タグの件数リストと、件数順のタグ一覧を取得
  const tagCounts = {};
  for (const post of posts) {
    for (const tag of post.data.tags) {
      if (tagCounts[tag]) {
        tagCounts[tag]++;
      } else {
        tagCounts[tag] = 1;
      }
    }
  }
  const tags = Object.keys(tagCounts).sort((a, b) => {
    return tagCounts[b] - tagCounts[a];
  });

  return { posts, tags, tagCounts };
};

export { loadCollection };
