#!/bin/sh

WORK_DIR="$(cd "$(dirname "${BASH_SOURCE:-$0}")" && pwd)"
cd "$WORK_DIR"

# MP4ファイルの処理
for FILE in *.mp4; do
  ffmpeg -i "${FILE}" -vf "fps=12,scale=if(gte(iw\,ih)\,min(960\,iw)\,-2):if(lt(iw\,ih)\,min(960\,ih)\,-2)" -loop 0 -y -stats "${FILE%.mp4}.webp"
done

# MOVファイルの処理
for FILE in *.mov; do
  ffmpeg -i "${FILE}" -vf "fps=12,scale=if(gte(iw\,ih)\,min(960\,iw)\,-2):if(lt(iw\,ih)\,min(960\,ih)\,-2)" -loop 0 -y -stats "${FILE%.mov}.webp"
done

# 同じフォルダにMP4またはMOVファイルを置いて実行するとWEBPに変換
