#!/bin/sh
# Draft状態の記事(ja)を選択してローカルで表示するスクリプト

# ja のみを対象に Draft 記事を取得
DRAFTS=($(find ./src/blog/ja ./src/works/ja -name "*.mdx" -exec grep -l "draft: true" {} +
))

# 該当なし
if [ ${#DRAFTS[@]} -eq 0 ]; then
  echo "No draft articles found in ja."
  exit 0
fi

# どの記事を編集したいか選択させる
echo "Select draft number:"
select DRAFT in ${DRAFTS[@]}
do
  # 記事ファイルとフォルダを開く
  open $DRAFT
  open ${DRAFT%/index.mdx}

  # URL を組み立てる: ./src/blog/ja/foo/index.mdx → /ja/blog/foo/
  REL=${DRAFT#./src/}
  COLLECTION=${REL%%/*}
  REST=${REL#*/}
  LANG=${REST%%/*}
  SLUG_PATH=${REST#*/}
  SLUG=${SLUG_PATH%/index.mdx}

  open http://localhost:4321/${LANG}/${COLLECTION}/${SLUG}/
  npm start

  break
done
