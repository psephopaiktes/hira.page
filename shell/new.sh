#!/bin/sh

# 記事IDを引数にとる
ID=$1

# 引数がなかった場合は入力を待つ
if [ -z ${ID} ]; then
  echo "Enter page id (ex.blog/hello-world or works/web-design) :"
  read ID
fi

# 記事ファイルを作成して開く
cp -r ./src/content/_template ./src/content/$ID
open ./src/content/$ID
code ./src/content/$ID/index.mdx

# サーバをたててChromeで開く
open http://localhost:4321/$ID
npm start

# 画像素材サイトを開く
# open https://chat.openai.com/chat
# open https://express.adobe.com/
