INSTRUCTIONS

### [1] プロジェクトのダウンロード

[https://github.com/Oscarbralo/foss4gCesiumTest](https://github.com/Oscarbralo/foss4gCesiumTest)

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

src/main.jsの以下の部分に、Cesium Ionのアクセストークンを記入します。アクセストークンが設定されていないと正しく実行できないので、Cesium Ionのサイトへアクセスし、アクセストークンを取得してください。

```javascript
//REQUIRED
Ion.defaultAccessToken = ""; // Required!
```

さらに、以下の部分をアンコメントします。

```javascript
const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});
```

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

### [5] src/main.jsのすべてのコードをアンコメント


### [6] テキストボックスとボタンを作成

Cesium IonアセットのアセットIDを入力するためのテキストボックスと、ロードするためのボタンを作成します。

```javascript
    //ASSET ID CODE
    //CREATE THE CONTAINER FOR THE ASSET TEXT INPUT AND BUTTON
    const assetContainer = document.createElement("div");
    assetContainer.id = "assetLoaderContainer";
    document.body.appendChild(assetContainer);

    //CREATES THE ASSET INPUT TEXT
    const assetInput = document.createElement("input");
    assetInput.type = "text";
    assetInput.id = "assetIdInput";
    assetInput.placeholder = "Enter your ID here";
    assetContainer.append(assetInput);

    //CREATES THE ASSET LOAD BUTTON
    const loadBtn = document.createElement("button");
    loadBtn.id = "loadAssetBtn";
    loadBtn.innerText = "Load Asset";
    assetContainer.append(loadBtn);

    //2602291  for japan buildings

    //LOAD THE ASSET ID WHEN CLICK
    loadBtn.addEventListener("click", async  () => {

      const assetId = parseInt(assetInput.value, 10);

      const tileset = await Cesium3DTileset.fromIonAssetId(assetId);
      viewer.scene.primitives.add(tileset);
      viewer.flyTo(tileset);

    })
```

### [7] ラベル追加のモジュールを実装

```javascript
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction(async function (movement) {

        let cartesian = viewer.scene.pickPosition(movement.position);

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


### [8] クリックした地点の点の色を設定

```javascript
    const picked = viewer.scene.pick(movement.position);

    picked.color = Color.RED;
```


### [9] 点群データをCesium Ionにアップデート

Cesium IonにHouse.lazをアップロードし、アセットの位置を設定します。

### [10] 点群のアセットをCesiumにロード

点群データをロードすると、表示される点のサイズが小さすぎて見づらい状態になっています。そこで、点のサイズを調整して見やすく表示されるようにします。

### [11] 点群の点のサイズの大きさを設定するスライダを配置

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

```javascript
    slider.addEventListener("input", () => tileset.style = new Cesium3DTileStyle({pointSize: slider.value}));
```

点群の点のサイズが小さいままだとクリックして選択することが困難ですが、点のサイズを大きくすることで選択が容易になります。

### [13] ガウシアンスプラフティングデータをロード

上記の点群と同様にCesium Ionにアップロードし、座標を設定後Cesiumにロードしてみましょう。ロードしたガウシアンスプラフティングのデータは、点群データと同様にクリックして選択することができます。

