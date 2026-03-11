# AGENTS Rules for hira.page

個人ブログ兼ポートフォリオサイト
ユーザーには**必ず日本語で対応**してください。

## 技術スタック

- **Framework**: Astro 5.x (SSG)
- **Content**: MDX with Content Collections
- **Styling**: LESS (breakpoint management) + CSS variables
- **Linting**: Biome
- **Deployment**: Cloudflare Pages (wrangler.toml)
- **Node**: >=20

## コマンド

### 開発・ビルド
```bash
npm start          # 開発サーバー起動 (localhost:4321)
npm run server     # ネットワーク共有で起動 (--host)
npm run build      # biome → astro check → astro build
npm run preview    # プロダクションビルドをプレビュー
```

### コンテンツ管理
```bash
npm run new        # 新規記事作成 (テンプレートコピー + VS Code起動)
npm run draft      # 下書き記事を選択して編集再開
npm run deploy     # ビルド + GitHubプッシュ + 本番公開
```

### Linting
```bash
npm run biome      # biome check --write (format + lint + import sort)
```

## アーキテクチャ

### Content Collections

2つのコレクションがある:

- **blog**: ブログ記事 (`src/content/blog/`)
- **works**: 実績・作品 (`src/content/works/`)

両方とも以下の構造:
```
src/content/{collection}/{id}/
  ├── index.mdx     # 記事本文
  ├── cover.png     # カバー画像
  └── thumbnail.png # サムネイル
```

スキーマは `src/content.config.ts` で定義。共通フィールド:
- `title`, `description`, `date`, `updatedDate`, `draft`, `tags`
- blog: `cover` (必須), `redirect`, `customCSS`
- works: `thumbnail`, `cover` (両方必須), `url`, `priority`

**重要**: ファイル名が `_` で始まるものは読み込まれない (glob pattern: `**/[^_]*.{md,mdx}`)

### ディレクトリ構造

```
src/
├── pages/           # ルーティング (.astro)
│   ├── blog/        # ブログページ
│   └── works/       # 実績ページ
├── layouts/         # レイアウトコンポーネント
│   ├── Base.astro       # 共通ベース
│   ├── BlogDetail.astro # ブログ記事用
│   └── CommonBody.astro # 共通ボディ
├── components/      # コンポーネント (ページ別に整理)
│   ├── Blog/, Home/, Me/, Price/, Works/
│   └── ui/          # 共通UIコンポーネント
├── content/         # MDXコンテンツ
│   ├── _template/   # 新規記事のテンプレート
│   ├── blog/        # ブログ記事
│   └── works/       # 実績記事
├── styles/          # グローバルスタイル (LESS)
├── assets/          # 静的アセット
└── consts.ts        # サイト定数 (SITE_TITLE, SITE_DESCRIPTION等)
```

### パスエイリアス

`tsconfig.json`で設定: `@/*` → `src/*`

```typescript
import { SITE_TITLE } from "@/consts";
```

## コーディング規約

### スタイリング

**LESS使用ルール** (from `src/styles/README.md`):
- 基本は生CSSを使用
- Breakpoint管理とカラー透明度にLESSを活用

**メディアクエリ**:
```less
@media (width < @xs) {
  display: none;
}
```

**カラー (透明度)**:
```less
color: rgb(@theme / 0.5);
```

### Biome設定 (biome.jsonc)

- **Formatter**: 2スペース、ダブルクォート
- **Import Organization**: 自動整理
- **特殊ルール**: `.astro`, `.svelte`, `.vue`では以下をオフ:
  - `useConst`, `useImportType`
  - `noUnusedVariables`, `noUnusedImports`

### MDX記事作成

**新規作成ワークフロー**:
1. `npm run new` を実行
2. 記事ID入力 (例: `blog/hello-world`, `works/web-design`)
3. テンプレートが `src/content/{id}/` にコピーされる
4. VS Codeでフォルダとファイルが自動で開く
5. 開発サーバーが起動し、Chromeでプレビュー表示

**下書き管理**:
- frontmatterに `draft: true` を設定
- `npm run draft` で下書き一覧から選択・編集再開

### Shiki Code Highlighting

`astro.config.mjs`で設定済み:
- テーマ: `one-dark-pro`
- Transformers: diff, highlight, word-highlight, focus, error-level

## 注意事項

- コンタクトフォームには `.env` ファイルが必要 (本番のみ)
- `src/content/_template/` は記事として読み込まれない
- デプロイは Cloudflare Pages (node_compat有効)
