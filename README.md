# Firebase を用いて ToDo アプリ を動かそう！

## はじめに

このレポジトリには Web技術（HTML,CSS,JavaScript）で実現された ToDo アプリが配置されており、Firebase の機能を用いてデプロイ（インターネット上に公開）する事ができます。

Firebase とは何かを知りたい方は [資料](./js_firebase_tutorial.pdf) も併せてご確認ください。

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

## 注意事項

* ブラウザからソースコードをコピペされると他の人からも操作できる状態になっているので、自由にデータベースを更新できてしまいます。そのまま公開（他人にリンクを教えるなど）はしないで下さい
* 公開する場合などは Firebase Authentication の機能を利用して、別途ユーザー作成、権限管理をするなどの対応を行う必要がございます
* Firebase はクレジットカードを登録せずに利用できます。無料枠を使い切った場合はサーバなどの稼働が止まってしまうので注意しましょう
* ただし、本格的にサービスを公開する場合など、上位のプランを選択した場合には **課金が発生します**。詳しくは [こちら](https://firebase.google.com/pricing/) をご確認下さい
* このレポジトリに関する不明点や疑問がございましたら、Hack U サポート用の Slack でサポーター宛に質問をお願い致します（Hack U 開催期間中のみ）

## 前提

* ここでは、Firebase の初期設定の仕方と、サンプルコードを動かします。エディタや Git に関する説明は行いません、また、コーディングも行いません。
* 2020/08/09 現在の情報です。Firebase に関する最新の情報は [公式ページ](https://firebase.google.com/) をご確認下さい
* Macでの操作を前提としております。Windowsでも開発可能ですがここでの説明ではカバーしておりません。 [こちら](https://qiita.com/gaku3601/items/53c11efee18244e6852b) を参考に環境構築 の設定をした上で、Mac と同じ手順で実装しましょう

## 利用技術/ツール

* Firebase CLI: ターミナルからプロジェクトにおける Firebase の設定や操作を行うためのコマンドラインツール
* Firebase Hosting: 静的なWebサイトを提供できる機能
* Firebase Cloud Firestore: NoSQL データベース
* [Bootstrap](https://getbootstrap.jp/): ベーシックなWebデザインを簡単に実現するためのライブラリ

## このチュートリアル完了までの目安時間

* 2時間程度

## 検証済みの環境

* OSX Catalina 10.15.5
* Firebase CLI 8.6.0
* jQuery 3.5.1
* bootstrap 4.5.0
* firebasejs 6.2.0

## Firebase Dashboard にログインする

https://firebase.google.com/?hl=ja へアクセスし、「コンソールへ移動」を選択します。

![](https://i.imgur.com/IQiYKab.png)

Googleアカウントでログインします。

![](https://i.imgur.com/NWhMIMa.png)

再度、「コンソールへ移動」を選択します。

![](https://i.imgur.com/TxxlQB0.png)

プロジェクトを作成します。

![](https://i.imgur.com/fZSohD6.png)

プロジェクト名を入力し、Firebaseの規約に同意します。

![](https://i.imgur.com/GdhdkWR.png)

![](https://i.imgur.com/S08NNLu.png)

Google アナリティクスを有効化します。（必須ではありません）

![](https://i.imgur.com/o5Gy6Ql.png)

![](https://i.imgur.com/60ibBSM.png)

![](https://i.imgur.com/t4QDFop.png)

![](https://i.imgur.com/SRuQ83p.png)


## データベース（Firestore）の作成

次に、Firestore の機能を使ってデータベースを作成します。

まずは、[こちら](https://console.firebase.google.com/u/0/) から作成したプロジェクトを選択します。

![](https://i.imgur.com/OEYNshc.png)

「Cloud Firesotre」を選択して下さい。

![](https://i.imgur.com/10KzHVS.png)

このような画面になったら「データベースの作成」を行います。

![](https://i.imgur.com/hPSDky3.png)

「本番環境で開始」を選択します。

![](https://i.imgur.com/eL7xc6K.png)

ロケーションを選択します。（`asia-east2` がオススメ）

![](https://i.imgur.com/Lp1sQaJ.png)

数十秒ほど待って、画面が移行すればここの作業は完了です。

[Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart?authuser=1) についての説明はこちらから確認できます。


## Firebase CLI を利用した Deploy

作成したプロジェクトを選択します。

![](https://i.imgur.com/OEYNshc.png)

![](https://i.imgur.com/10KzHVS.png)

「開始するにはアプリを追加してください」と書かれた箇所のウェブアイコン `</>` をクリックしてください。

アプリのニックネームの入力し、Firebase Hostingの設定をします。

![](https://i.imgur.com/4gXKQJT.png)

「次へ」を選択します。

![](https://i.imgur.com/oAyZQYN.png)

![](https://i.imgur.com/vv6uNDV.png)


この README がある Repository を clone します。

```
$ git clone https://github.com/hackujp/firebase-tutorial
$ cd firebase-tutorial
```

Firebase CLI をインストールします

Node.js を利用できる環境上であれば、 `npm` を利用してインストールができます。

```
$ npm install -g firebase-tools
```

Node.js を利用できる環境上でなければ、下記リンクを参考にインストールを行いましょう。

https://firebase.google.com/docs/cli?hl=ja#windows-standalone-binary


![](https://i.imgur.com/vt8b9M3.png)

完了まで1分ほど待機、完了したら「次へ」

ここからは画面上の指示に従って、デプロイ（Web上へのアップロード）を実施します。

![](https://i.imgur.com/cRoAjA2.png)

Firebase CLI でログインを実施します。

***CLI の作業は必ず firebase-tutorial ディレクトリの中に移動してから実行するようにしてください。***

```shell
$ firebase login
```

次に、Firebase 用のプロジェクトを生成します。

![](https://i.imgur.com/Au8iv8V.png)

`firebase init` コマンドを実行して、いくつか質問をされるので space で回答します。

```shell
$ firebase init
```

![](https://i.imgur.com/js9zYot.png)
 
`Firestore: Deploy rules and create indexes for Firestore` 

と

`Hosting: Configure and deploy Firebase Hosting sites` の **2つ** を space で選択して、Enter を押下します。

![](https://i.imgur.com/4gh1FRo.png)

次の質問 `Please select an option:` には `Use an existing project` を Enter で選択します。

![](https://i.imgur.com/qXP3LOp.png)


`Select a default Firebase project for this directory: ` には、先程作成したプロジェクト名を Enter で選択しましょう。（以前に Firebase を別の用途で使用したことがある人は複数提示されます）

![](https://i.imgur.com/ItQqmno.png)

Firestore Setup として出てくる

`What file should be used for Firestore Rules? ` には何も選択せず Enter

![](https://i.imgur.com/2bcRbi9.png)

`File firestore.rules already exists. Do you want to overwrite it with the Firestore Rules from the Firebase Console?` は `N` を入力して Enter

![](https://i.imgur.com/B7qTwM9.png)
 
`What file should be used for Firestore indexes?` は何も選択せず Enter

![](https://i.imgur.com/KfOh26o.png)

`File firestore.indexes.json already exists. Do you want to overwrite it with the Firestore Indexes from the Firebase Console?` は `N` を入力して Enter

![](https://i.imgur.com/nXTAzOV.png)

`? What do you want to use as your public directory?` は何も選択せず Enter

![](https://i.imgur.com/jzibUS5.png)

`Configure as a single-page app (rewrite all urls to /index.html)? (y/N) ` は `y` を入力して Enter

![](https://i.imgur.com/9GZGqjV.png)

`File public/index.html already exists. Overwrite?` は `N`

![](https://i.imgur.com/Tr8dZAC.png)

ここまで実施できたら、`firebase serve` で このレポジトリのプログラムを動かしてみましょう。

```shell
$ firebase serve
```

下記のようなコマンドの実行結果となるので、表示された http://localhost:5000 を開いてみましょう。

![](https://i.imgur.com/Xo7o2iu.png)

下記のように表示されれば成功です。

![](https://i.imgur.com/G9JK7Ot.png)

また、`Ctrl + C` (Windowsの場合は `Command + C`) で動作を停止できます。

動作が確認できたら、Firebase Hosting の機能を利用して、クラウド（インターネット）上に Deploy します。

```shell
$ firebase deploy
```

Deploy 後、ブラウザの下記で表示されるリンクからアクセスします。

![](https://i.imgur.com/QyLuqWO.png)

下記のように表示されれば成功です。これで、このページはインターネット上に公開され、他の人からも閲覧できる状態になりました。

![](https://i.imgur.com/G9JK7Ot.png)

`firebase serve` ではローカル上（自分のPC上）でプログラムを実行させているのに対し、`firebase deploy` ではクラウド上に Deploy してインターネット上に公開させているということを理解しましょう。


## HTML の編集が反映されることを確認する

次に、自分のプロジェクトで `public/index.html` をエディタなどで開き、下記箇所を変更します。

`public/index.html`

変更前

```htmlembedded=34
<div id="message">
  <h2>Welcome</h2>
  <h1>Firebase Hosting Setup Complete</h1> <!-- この行を編集 -->
  <p>You're seeing this because you've successfully setup Firebase Hosting. Now it's time to go build something extraordinary!</p>
  <a target="_blank" href="https://firebase.google.com/docs/hosting/">Open Hosting Documentation</a>
</div>
<p id="load">Firebase SDK Loading&hellip;</p>
```

変更後

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

実際にどう動いているか、という点についてはソースコードにコメントをつけて簡単に説明を加えております。[Firebase のドキュメント](https://firebase.google.com/docs/) と合わせてご確認下さい。

## その他、Firebase の機能例

* [Firebaseの各機能を3行で説明する](https://qiita.com/shibukk/items/4a015c5b3296563ac19d)

## 参考リンク　

* [Google の Firebase サンプル](https://firebase.google.com/docs/samples?authuser=1#web)
* [Firebase入門 フリマアプリを作りながら、認証・Firestore・Cloud Functionsの使い方を学ぼう！](https://employment.en-japan.com/engineerhub/entry/2019/06/07/103000)

## イベント実施

* 2020/2/10
  * [【Open Hack U 2020 出場者限定】Firebase ワークショップ](https://hacku.connpass.com/event/201564/)
