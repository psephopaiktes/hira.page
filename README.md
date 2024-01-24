# WEBA
[hira.page](https://hira.page/)

[![GitHub license](https://img.shields.io/github/license/psephopaiktes/hira.page)](https://github.com/psephopaiktes/hira.page/blob/main/LICENSE)

<strong>平田 章</strong>のブログ兼ポートフォリオWebサイト

<br />

## 環境構築・開発
`$ npm i` のみでOK

> [!NOTE]
> コンタクトフォームを使うには [.env](https://www.notion.so/psephopaiktes/Blog-Portfolio-Renewal-ad291ee9ac9d445489982f8ca9daf450)🔒 がルートに必要

Astroのサーバー起動
```bash
npm start
```

ビルド
```bash
npm run build
```

ブログ・実績記事の新規追加
```bash
npm run new
```

下書き中の記事を選択して編集を再開
```bash
npm run draft
```

ビルド、GitHubプッシュ、本番公開
```bash
npm run deploy
```

[./src/assets/svg-sprite/](./src/assets/svg-sprite/)の.svgからSVGスプライト用のファイルを生成。フォルダ構造は無視される
```bash
npm run sprite
```
