const sortTypes = [
  {
    id: "priority",
    label: { ja: "おすすめ順", en: "Suggested", "zh-cn": "推荐顺序" },
  },
  {
    id: "date",
    label: { ja: "新しい順", en: "Newest", "zh-cn": "最新顺序" },
  },
  {
    id: "title",
    label: { ja: "タイトル順", en: "Title", "zh-cn": "标题顺序" },
  },
];

const sortPosts = (posts, sortType) => {
  let sortedPosts = [];

  if (sortType === "priority") {
    sortedPosts = [...posts].sort((a, b) => b.data.priority - a.data.priority);
  } else if (sortType === "title") {
    sortedPosts = [...posts].sort((a, b) =>
      a.data.title.localeCompare(b.data.title),
    );
  } else if (sortType === "date") {
    sortedPosts = [...posts].sort(
      (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
    );
  }

  return sortedPosts;
};

export { sortPosts, sortTypes };
