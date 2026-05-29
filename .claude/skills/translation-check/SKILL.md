---
name: translation-check
description: hira.page リポジトリの記事 (src/blog, src/works) の翻訳状況をチェックし、必要なら翻訳版を作成する。ユーザーが「翻訳チェック」「翻訳状況確認」「記事翻訳」「translation check」と発言したとき、または `works/記事ID` `blog/記事ID` の形式で翻訳依頼をしたときに起動する。ja を正本に en / zh-cn の翻訳漏れを検出し、引数指定時は自動で翻訳して書き込む。
---

# 翻訳チェックスキル

`hira.page` の記事 (`src/blog/`, `src/works/`) の 3 言語 (ja / en / zh-cn) の翻訳状況をチェックし、必要なら翻訳版を生成する。

## リポジトリ構造の前提

```
src/
├── blog/{ja,en,zh-cn}/{記事ID}/index.mdx
├── works/{ja,en,zh-cn}/{記事ID}/index.mdx
└── _template/index.mdx  ← 未翻訳判定の参照
```

`shell/new.sh` は 3 言語分のテンプレートを一括コピーするため、**ファイルは存在しても内容がテンプレートのまま** というケースが多い。

## 動作モード

ユーザーの起動メッセージから引数を判定する。

- 「翻訳チェック works/foo」「works/foo 翻訳して」「blog/bar の翻訳お願い」など、`{blog|works}/{記事ID}` の指定があれば **モード A**
- それ以外（「翻訳チェック」だけ等）は **モード B**

---

## モード A: 自動翻訳モード（引数あり）

**手順:**

1. 引数を `{collection}/{記事ID}` にパース（例: `works/ags-corporate` → collection=`works`, slug=`ags-corporate`）。
2. `src/{collection}/ja/{slug}/index.mdx` を Read。存在しなければ「ja 版がありません」と表示して終了。
3. `src/{collection}/en/{slug}/index.mdx` と `src/{collection}/zh-cn/{slug}/index.mdx` を Read（存在しなければ「ファイル不足」として後で新規作成）。
4. 必要なら `src/_template/index.mdx` も Read（判定用キャッシュ）。
5. en と zh-cn それぞれについて「未翻訳判定ロジック」を実施。
6. 未翻訳と判定された言語版について「翻訳ルール」に従って翻訳し、Write で上書き。
7. 結果サマリを以下の形式で表示:
   ```
   📝 {collection}/{slug}
   ├ ja:    ✓ 正本
   ├ en:    ✓ 翻訳済み (変更なし) / 🔄 翻訳しました / ➕ 新規作成
   └ zh-cn: ✓ 翻訳済み (変更なし) / 🔄 翻訳しました / ➕ 新規作成
   ```

**注意:** 既に翻訳されている言語版は触らない（上書きしない）。

---

## モード B: チェックのみモード（引数なし）

**書き込みは絶対に行わない。** 一覧表示のみ。

**手順:**

1. Bash で `ls src/blog/ja src/blog/en src/blog/zh-cn src/works/ja src/works/en src/works/zh-cn` を実行（`.DS_Store` は除外）。
2. 各 collection について:
   - ja に存在して en/zh-cn に存在しない記事ID → 「ファイル不足」
   - en/zh-cn に存在して ja に存在しない記事ID → 「ja 不在（要確認）」
   - 3 言語すべて存在する記事ID → 各言語の `index.mdx` を Read して未翻訳判定
3. 結果を以下の形式で表示:
   ```
   ## src/blog
   | 記事ID                  | en      | zh-cn   |
   | ---                     | ---     | ---     |
   | 201710_lets-bookmarklet | ✓       | ✓       |
   | 202601_some-draft       | ✗ 未翻訳 | ✗ 未翻訳 |
   | 202602_only-ja          | – 不足   | – 不足   |

   ## src/works
   ...
   ```
4. 末尾に必ず以下を表示:
   ```
   翻訳する場合は「翻訳チェック {collection}/{記事ID}」と指示してください。
   ```

**Read を多数行うため**、まず ja 一覧を Bash で取り、en/zh-cn の存在は `ls` の結果から判断。存在する記事に絞って Read する。記事数が多い場合は最初の数件だけ詳細チェックし、残りは「未確認」マーカーをつけて時短してもよい（その場合はその旨を明示）。

---

## 未翻訳判定ロジック

以下のいずれかに該当する言語版は **未翻訳** と判定する:

1. ファイルが存在しない
2. 本文（frontmatter 部分を除く `---` 以降）が `src/_template/index.mdx` の本文と完全一致
3. 本文（frontmatter 部分を除く `---` 以降）が ja 版の本文と完全一致（コピーされただけ）
4. frontmatter の `title` が空文字、または ja の `title` と完全一致

`description` は補助情報。title が翻訳されていれば本文も翻訳されている前提でよい。

判定時は **空白・改行差分は無視せず厳密一致** で比較。

---

## 翻訳ルール（重要）

### frontmatter

| フィールド    | 扱い                                          |
| ---          | ---                                          |
| `title`      | **翻訳する**                                  |
| `description`| **翻訳する**                                  |
| `date`       | ja からそのまま継承                            |
| `updatedDate`| ja からそのまま継承                            |
| `draft`      | ja からそのまま継承                            |
| `tags`       | ja からそのまま継承（タグ名は翻訳しない）       |
| `cover`      | ja からそのまま継承                            |
| `thumbnail`  | ja からそのまま継承                            |
| `url`        | ja からそのまま継承                            |
| `priority`   | ja からそのまま継承                            |

### 本文

- **地の文・見出し (`##`, `###`)** → 翻訳する
- **import 文** (`import EmbedCard from '@/components/Blog/EmbedCard.astro';` 等) → そのまま
- **コードブロック** (` ``` ` で囲まれた範囲、インラインの `` ` `` 含む) → 中身は翻訳しない
- **URL・ファイルパス** → そのまま
- **MDX コンポーネント** (`<EmbedCard ... />` 等) → タグはそのまま、可視テキスト属性のみ翻訳

### トーン・文体

既存サンプル `src/blog/{en,zh-cn}/201710_lets-bookmarklet/index.mdx` を必ず読んでトーンを揃える。

- **en**: 自然で読みやすい英語。一人称は I。砕けすぎず堅すぎず。
- **zh-cn**: 簡体字。「我」一人称。技術用語は中国語の慣例に従う（例: ブックマークレット → 书签小工具(Bookmarklet)）。

固有名詞（平田 / Hirata）は適切にローカライズ。

---

## 実行フロー（チェックリスト）

スキル起動時は以下の順で動作する:

1. ユーザーメッセージから引数を抽出（`{blog|works}/{slug}` 形式があるか）
2. 引数あり → モード A、引数なし → モード B
3. モード A の場合:
   - [ ] ja 版を Read
   - [ ] en 版を Read（無ければ「新規」フラグ）
   - [ ] zh-cn 版を Read（無ければ「新規」フラグ）
   - [ ] 未翻訳判定
   - [ ] 翻訳実行 (Write)
   - [ ] サマリ表示
4. モード B の場合:
   - [ ] 全 collection × 言語のディレクトリ一覧取得
   - [ ] 差分検出
   - [ ] 未翻訳判定（記事ファイル Read）
   - [ ] 表形式表示
   - [ ] 個別翻訳の案内を表示
   - [ ] **Write は絶対に呼ばない**

---

## 注意事項

- frontmatter の YAML フォーマットを壊さないこと。クォート、配列リテラル、コメントを保持する。
- ja のソースに `<!-- ... -->` コメントがあれば、訳語に合わせて翻訳するか、そのまま残すかを判断（通常はそのまま）。
- 翻訳後、frontmatter の `cover: "./cover.png"` のような相対パスは絶対に変更しない。
- 大量翻訳になる場合、ユーザーに「{N} 件の翻訳を実行します」と一言伝えてから着手する。
