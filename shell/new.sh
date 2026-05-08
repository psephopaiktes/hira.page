#!/bin/sh
# 新規記事を作成するスクリプト（多言語対応）

# 記事IDを引数にとる（例: blog/hello-world, works/web-design）
ID=$1

# 引数がなかった場合は入力を待つ
if [ -z ${ID} ]; then
  echo "Enter page id (ex.blog/hello-world or works/web-design) :"
  read ID
fi

# collection（blog or works）と slug を分割
COLLECTION=${ID%%/*}
SLUG=${ID#*/}

# 3言語ぶんテンプレートをコピー
for LANG in ja en zh-cn; do
  cp -r ./src/_template ./src/${COLLECTION}/${LANG}/${SLUG}
done

# Finder で ja フォルダを開き、ja の index.mdx を VS Code で開く
open ./src/${COLLECTION}/ja/${SLUG}
code ./src/${COLLECTION}/ja/${SLUG}/index.mdx

# サーバをたててChromeで開く
open http://localhost:4321/ja/${COLLECTION}/${SLUG}/
npm start
