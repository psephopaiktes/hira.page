#!/bin/sh

# Draft状態の記事を配列に取得
DRAFTS=($(find . -name "*.mdx" -exec grep -l "draft: true" {} +
))

# どの記事を編集したいか選択させる
echo "Select draft number:"
select DRAFT in ${DRAFTS[@]}
do
  # 記事ファイルとフォルダを開く
  open $DRAFT
  open ${DRAFT%/index.mdx}

  # 記事ページを表示 文中先頭と末尾の不要な文字は削除する
  DRAFT=${DRAFT#./src/content}
  open http://localhost:4321${DRAFT%/index.mdx}
  npm start

  break
done
