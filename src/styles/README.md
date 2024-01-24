# CSS Rule

できるだけ生CSSを使うが、CSS変数ではBreakpoint管理をできないのでLessを活用。

## メディアクエリ

```.less
@media (width < @xs) {
  display: none;
}
```

## カラー

```.less
color: rgb(@theme);
```

`rgb()`もしくは`rgba()`は生CSS関数。
