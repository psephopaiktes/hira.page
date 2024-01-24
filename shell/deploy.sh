#!/bin/sh

# Git用コミットメッセージを引数にとる
COMMENT=$1

# 引数がなかった場合は入力を待つ
if [ -z ${COMMENT} ]; then
  echo "please enter commit message:"
  read COMMENT
fi

# ビルド
npm run build

# GitHubにpush
git add -A
git commit -m "$COMMENT"
git push
