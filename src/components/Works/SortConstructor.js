
const sortTypes = [
  {
    id: "priority",
    label: "おすすめ順",
  },
  {
    id: "date",
    label: "新しい順",
  },
  {
    id: "title",
    label: "タイトル順",
  },
];

const sortPosts = (posts, sotrType) => {
  let sortedPosts = [];

  if (sotrType == "priority") {
    sortedPosts = [...posts].sort((a, b) => b.data.priority - a.data.priority);
  } else if (sotrType == "title") {
    sortedPosts = [...posts].sort((a, b) => a.data.title.localeCompare(b.data.title));
  } else if (sotrType == "date") {
    sortedPosts = [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  }

  return sortedPosts;
};

export { sortPosts, sortTypes };
