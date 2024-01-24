---
title: "Mafia vs Painter"
date: 2019-10-16T18:10:57+09:00
draft: false
tags: ["UI","CODE"]
description: "スマホ１台あればみんなで遊べる、超お手軽ゲーム。Vueにより開発し、PWAアプリとしてリリースしました。"
# url: "https://psephopaiktes.github.io/mafia-vs-painter/"
priority: 4
---

## 概要
紙とペン、4人以上のプレイヤーがいれば、スマホだけで遊べるお絵かきボードゲームです。[エセ芸術家ニューヨークへ行く](https://oinkgames.com/ja/games/analog/a-fake-artist-goes-to-new-york/)というボードゲームのルールを参考に、みんなで気軽に盛り上がれてかんたんなゲームを目指しました。日本語/英語の両方に対応しています。

企画、デザイン、設計、実装をすべて1人で行いました。

## UI
昨今のデバイス拡大化に伴い、指をディスプレイの上部に伸ばさなくて良い、下部ナビゲーションを採用しています。当然レスポンシブ対応しています。
![UI](./ui.png)

## 実装
Webページをアプリとして提供できる、PWAの形態でリリースしました。基本はVue.jsで作成しています。ソースコードは[GitHub](https://github.com/psephopaiktes/mafia-vs-painter)に公開しています。
