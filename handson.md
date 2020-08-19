# Firebase を用いて ToDo アプリ を動かそう！

## はじめに

このレポジトリには Web技術（HTML,CSS,JavaScript）で実現された ToDo アプリが配置されており、Firebase の機能を用いてデプロイ（インターネット上に公開）する事ができます。

この README において、デプロイするまでの簡単な手順を説明していますので、手順に沿いながら実装してみて下さい。

## アプリ画面イメージ

PC

![](https://i.imgur.com/rULzRnp.png)

スマホ

![](https://i.imgur.com/JRmyXfI.png)


## ファイル構成

```
firebase-tutorial
├── README.md
├── database.rules.json
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
└── public
    ├── _404.html
    └── sample.html
```

## HTML の編集が反映されることを確認する

次に、自分のプロジェクトで `public/index.html` をエディタなどで開き、下記箇所を変更します。

`public/index.html`

変更前

```htmlembedded=34
<div id="message">
  <h2>Welcome</h2>
  <h1>テスト</h1>
  <p>You're seeing this because you've successfully setup Firebase Hosting. Now it's time to go build something extraordinary!</p>
  <a target="_blank" href="https://firebase.google.com/docs/hosting/">Open Hosting Documentation</a>
</div>
<p id="load">Firebase SDK Loading&hellip;</p>
```

変更が完了したら、再度デプロイを行います。

```shell
$ firebase deploy
```

下記のようにWelcomeの文字列がテストに変更されていれば完了です。

![](https://i.imgur.com/1C4bh8m.png)


## ToDo アプリ を動かして見る

ここまでできたら、メニューバーの歯車からプロジェクトの設定を開きます。

![](https://i.imgur.com/3gqeEET.png)

次のような画面に遷移するはずです。

![](https://i.imgur.com/xmywGFy.png)

Firebase SDK snippet で表示されているコードをコピーしておきます。

![](https://i.imgur.com/omaafXd.png)


※ ブラウザからソースコードをコピペされると他の人も操作できる状態になっているので、自由にデータベースを更新されてしまいます。そのまま公開（他人にリンクを教えるなど）はしないで下さい。

※ SNS によるリンクの共有や検索に引っかかるようにして、一般に公開する場合は Firebase Authentication の機能を利用して、別途ユーザー作成、権限管理をするなどの対応を必ず行うようにして下さい。

[Firebase apiKey ってさらしていいの? ほんとに?](https://qiita.com/hoshymo/items/e9c14ed157200b36eaa5)


次に、既存の index.html をバックアップしたうえで、サンプルファイルを index.html に置き換えます。

```shell
$ mv public/index.html public/_index.html 
$ cp public/sample.html public/index.html
```

ここで先程コピペした Config 情報を index.html の以下の部分に上書きします。

index.html
```htmlmixed=98
let firebaseConfig = {
    apiKey: "xxxxxxxxxx",
    authDomain: "{project_id}.firebaseapp.com",
    databaseURL: "https://{project_id}.firebaseio.com",
    projectId: "{project_id}",
    storageBucket: "{project_id}.appspot.com",
    messagingSenderId: "yyyyyyyyyy",
    appId: "1:yyyyyyyyyy:web:zzzzzzzzzzzz"
};
```

コピペが完了したら、デプロイします。

```shell
$ firebase deploy
```

デプロイができたら、先ほどと同じ URL をブラウザから開き、下図のような表示になるかを確認します。[こちら](https://www.atmarkit.co.jp/ait/articles/1403/20/news050.html) の方法を用いて、PC上でもスマホでの挙動をエミュレートして確認する事ができます。

PC

![](https://i.imgur.com/rULzRnp.png)

スマホ

![](https://i.imgur.com/JRmyXfI.png)
