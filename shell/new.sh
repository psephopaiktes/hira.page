#!/bin/sh

cd hugo-amp-contents

# 記事IDを引数にとる
ID=$1

# 引数がなかった場合は入力を待つ
if [ -z ${ID} ]; then
  echo "Enter blog id (ex.blog/hello-world or works/web-design) :"
  read ID
fi

# 記事ファイルを作成してVS CODEで開く
echo $ID | pbcopy
hugo new $ID/index.md

# 記事IDをクリップボードにコピーしておく。
open ./content/$ID

# サーバをたててChromeで開く
open https://spark.adobe.com/
open https://www.canva.com/design?create&width=1200&height=600&units=px&schema=web-2
hugo server -D & open http://localhost:1313/$ID
