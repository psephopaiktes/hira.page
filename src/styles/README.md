# CSS Rule

ネイティブCSSのみを使用する（プリプロセッサなし）。ネスト・カスタムプロパティ・Relative Color Syntax を活用する。

## メディアクエリ

ブレークポイントは変数管理せず直値で記述する。

```css
@media (width < 480px) {
  display: none;
}
```

参考値: 2xs=360px / xs=480px / sm=640px / md=768px / lg=1024px / xl=1280px / 2xl=1536px

## カラー

カラーは `--color-*`（hex）をカスタムプロパティで定義（`foundation.css`）。透明度は Relative Color Syntax で指定する。

```css
/* 透明度あり */
color: rgb(from var(--color-theme) r g b / 0.5);

/* 透明度100% */
color: var(--color-theme);
```

## 共通の再利用値

`foundation.css` の `:root` に定義：

- `--transition`（トランジション）
- `--filter-shadow`（共通シャドウ）
- `--color-placeholder`（画像プレースホルダ）
