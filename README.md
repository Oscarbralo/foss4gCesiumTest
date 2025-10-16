
# foss4gCesiumTest

本リポジトリは2025年10月9日に行われた[「CesiumJSで始める3Dマップ開発 –– 基礎と活用例を学ぶ」](https://talks.osgeo.org/foss4g-2025-japan/talk/PR7QBP/)ハンズオンセッションで使用されたCesium.jsのサンプルコードです。
以下に、ハンズオンセッションで実施した内容の概要を示します。

### [0] 前提条件

本リポジトリのプロジェクトは[Node.js](https://nodejs.org/ja/)を使用します。あらかじめNode.jsをインストールしてください。

### [1] プロジェクトのダウンロード

以下のコマンドでリポジトリをクローンするか、ZIPでダウンロードしてください。

```bash
git clone https://github.com/Oscarbralo/foss4gCesiumTest.git
```

### [2] webpackのインストール  

以下のコマンドでWebpackの必要なパッケージをインストールします。

```bash
npm i -D webpack webpack-cli webpack-dev-server ts-loader typescript html-webpack-plugin copy-webpack-plugin css-loader style-loader
```

### [3] プロジェクトの実行

[src/main.js](src/main.js)の以下の部分に、[Cesium Ion](https://cesium.com/platform/cesium-ion/)のアクセストークンを記入します。アクセストークンが設定されていないと正しく実行できないので、[Cesium Ion](https://cesium.com/platform/cesium-ion/)のサイトへアクセスし、アクセストークンを取得してください。

```javascript
//REQUIRED
Ion.defaultAccessToken = "ココにアクセストークンを貼り付ける"; // Required!
```

さらに、以下の部分をアンコメントします。

*[src/main.js](src/main.js)*
```javascript
const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});
```

> [!TIP]
> Visual Studio Codeをお使いの場合は、範囲を選択してCtrl + / でコメント／ア> ンコメントを切り替えることができます。

ここまでの準備ができたら、以下のコマンドを実行するとブラウザが起動し、Cesiumの画面が表示されます。

```bash
npm run start
```

### [4] ビルド 

以下のコマンドでビルドを実行します。

```bash
npm run build
```

ビルドを実行すると、distというディレクトリが作成され、本番環境用のファイル一式が作成されます。

### [5] [src/main.js](src/main.js)のすべてのコードをアンコメント

先頭の「//」を消去してください。

> [!NOTE]
> 先頭が「////」となっているところはコメント行なので、スラッシュを2つ残してください。

### [6] テキストボックスとボタンを作成

[Cesium Ion](https://cesium.com/platform/cesium-ion/)アセットのアセットIDを入力するためのテキストボックスと、アセットをロードするためのボタンを作成します。

*[src/main.js](src/main.js)*
```javascript
    // テキストボックスとボタンのためのコンテナを作成
    const assetContainer = document.createElement("div");
    assetContainer.id = "assetLoaderContainer";
    document.body.appendChild(assetContainer);

    // テキストボックスを作成
    const assetInput = document.createElement("input");
    assetInput.type = "text";
    assetInput.id = "assetIdInput";
    assetInput.placeholder = "Enter your ID here";
    assetContainer.append(assetInput);

    // アセットを読み込むボタンを作成
    const loadBtn = document.createElement("button");
    loadBtn.id = "loadAssetBtn";
    loadBtn.innerText = "Load Asset";
    assetContainer.append(loadBtn);

    // Japan 3D Buildingsをロードする場合は、あらかじめ
    // Cesium IonのAsset DepotでMy Assetsに追加しておいてください。
    // Japan 3D BuildingsのアセットIDは2602291。

    // ボタンをクリックしたときにアセットをロードするイベントハンドラ
    loadBtn.addEventListener("click", async  () => {

      const assetId = parseInt(assetInput.value, 10);

      const tileset = await Cesium3DTileset.fromIonAssetId(assetId);
      viewer.scene.primitives.add(tileset);
      viewer.flyTo(tileset);

    })
```

### [7] ラベル追加のモジュールを実装

* [src/modules/addlabel.js](src/modules/addlabel.js)
```javascript
    // シーン上をクリックしたときのイベントハンドラを作成
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    // クリック時のイベント内容を実装
    handler.setInputAction(async function (movement) {

        // クリックされた地点の座標を取得
        let cartesian = viewer.scene.pickPosition(movement.position);

        // シーンにクリックした地点のポイントとラベルを追加
        viewer.entities.add({
                position: cartesian,
                point: { pixelSize: 10, color: Color.RED },
                label: {
                    text: `You clicked here`,
                    font: "20px sans-serif",
                    fillColor: Color.YELLOW,
                    style: LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    pixelOffset: new Cartesian2(0, -12),
                },
            });
    }, ScreenSpaceEventType.LEFT_CLICK);
    return handler
```

> [!NOTE]
> イベントハンドラとは、ユーザの入力やレンダリングの開始といったプログラムのイベントに対する動作を定義する関数です。

### [8] クリックした地点の点の色を設定

* [src/modules/addlabel.js](src/modules/addlabel.js)
```javascript
    // 
    const picked = viewer.scene.pick(movement.position);

    picked.color = Color.RED;
```

### [9] 点群データをCesium Ionにアップデート

[Cesium Ion](https://cesium.com/platform/cesium-ion/)に、リポジトリに同梱されているHouse.lazをアップロードし、アセットの座標を設定します。

### [10] 点群のアセットをCesiumにロード

点群データをロードすると、表示される点のサイズが小さすぎて見づらい状態になっています。そこで、点のサイズを調整して見やすく表示されるようにします。

### [11] 点群の点のサイズの大きさを設定するスライダを配置

*[src/main.js](src/main.js)*
```javascript
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 1;
    slider.max = 10;
    slider.step = 1;
    slider.value = 1;
    assetContainer.append(slider);
```

### [12] スライダに対するイベントハンドラを実装

*[src/main.js](src/main.js)*
```javascript
slider.addEventListener("input", () => tileset.style = new Cesium3DTileStyle({pointSize: slider.value}));
```

点群の点のサイズが小さいままだとクリックして選択することが困難ですが、点のサイズを大きくすることで選択が容易になります。

### [13] ガウシアンスプラフティングデータをロード

上記の点群と同様にCesium Ionにアップロードし、座標を設定後Cesiumにロードしてみましょう。ロードしたガウシアンスプラフティングのデータは、点群データと同様にクリックして選択することができます。

