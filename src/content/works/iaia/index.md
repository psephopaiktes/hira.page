---
title: "iAiA"
date: 2020-06-16T18:39:26+09:00
draft: false
tags: ["UI","CODE"]
description: "現在開発中のクトゥルフTRPG用のゲームアプリです。"
url: "https://iaia.app/"
priority: 3
---

## 概要
現在知人と2人で開発中のWebアプリです。クトゥルフ神話TRPGというボードゲームの一種を、スマホだけで遊べるようにするために開発しました。

## UI
未来+宇宙的恐怖神話のコンセプトでデザインを作成しています。「誰でもかんたん」に遊べることを第一目標にしているため、複雑なゲームシステムを簡易的に理解できるUIの工夫を随所に盛り込んでいます。
![UI](./ui.png))

全体のUIデザインはFigmaで公開しているので、ぜひご覧ください。

<iframe class="figma-iframe" style="border: 1px solid rgb(0 0 0 / 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FcjVUh6J1EYjoztzKKoPHbF7D%2Fiaia%3Fnode-id%3D192%253A0" allowfullscreen></iframe>

## 実装
Webページをアプリとして提供できる、PWAの形態でリリースしました。フロントエンドはVue.js+TypeScript、バックエンドはFirebaseを利用しています。ソースコードは[GitHub](https://github.com/psephopaiktes/iAiA)に公開しています。
