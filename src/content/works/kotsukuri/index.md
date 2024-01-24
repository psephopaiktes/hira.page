---
title: "コツクリ"
date: 2017-06-05T23:02:55+09:00
draft: false
tags: ["UI"]
description: "2つのスマホでそれぞれ画像を撮影し、スマホ同士をコツっとさせることで、それぞれの画像の子供となる画像を表示するアプリ。SPAJAM東京C予選優勝作品。"
url: "https://gamebiz.jp/?p=186617"
priority: 3
---

例えば、「椅子」と「机」の画像から、「部屋」の画像を返すなど。Microsoft Computer Vision APIで入力画像を認識してラベル付けを行い、そのラベルからword2vecで概念的な子供としての単語を生成、その単語からMicrosoft Bing Search APIを用いて画像を返している。

![UI](./ui.png)

友人と参加し、アイディア出しと、アプリデザインやプレゼン資料など全体的なデザイン作業を行いました。SketchとSympliを用いてエンジニアと効率的に作業の連携を取りました。
