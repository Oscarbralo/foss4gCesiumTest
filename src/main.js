//========================================
// Cesium の必要モジュールを個別にインポート
//========================================
import {
  Terrain,                            // CesiumJS 1.111 以降の新しい地形API。CesiumTerrainProviderが不要になる。
                                      // Cesium World Terrain や Cesium Ion 上の地形アセットを扱うクラス。
                                      // 内部的には Quantized-Mesh（.terrain）形式をロードし、GPUで動的にタイル化して表示する。
                                      // 旧API（CesiumTerrainProvider）を抽象化、シンプルな記述で利用可能。
                                      // CesiumJS 専用であり、Unreal や Unity 版 Cesium とは別実装。
                                      // 使い方は Terrain.fromWorldTerrain() または Terrain.fromIonAssetId(id)
  Viewer,                             // Cesium の中心的クラス。地球表示ウィンドウ、シーン、カメラ、UIを管理する。
  Ion,                                // Cesium Ion への接続・認証・アセット読み込みを行うユーティリティ。
  defined,                            // 値が null / undefined でないかを判定する Cesium のヘルパー関数。
  IonResource,                        // Cesium Ion 上のアセットやリソースを安全に参照するためのリソース管理クラス。
  Cesium3DTileStyle,                  // 3D Tiles（建物や点群など）のスタイル（色・点サイズ等）を動的に制御するクラス。
  Cesium3DTileset                     // 3D Tiles データセット全体をロード・管理・描画するためのクラス。
} from "cesium";

// CesiumのデフォルトUIスタイルを読み込む（ボタンなどの表示に必要）
import "cesium/Widgets/widgets.css";

// 自作のCSS（ボタン配置などの調整用）を読み込む
import "./style.css";

// ラベリング機能を外部モジュールからインポート（クリックでラベルを配置するなど）
import { addlabel } from "./modules/addlabel";

// Cesiumの静的アセット（Assets/Widgetsなど）のベースURLを指定
// Webpackで /cesium にコピーされている必要がある
window.CESIUM_BASE_URL = "/cesium";

// Cesium Ion のアクセストークン（必須。自分のトークンを使用）
// Cesium ionのサイトにログインして『Access Tokens』タブで「Create Token」ボタン通して、新たに自分のTokenを作成する。";
Ion.defaultAccessToken = ""; // Required!

console.log(Ion.defaultAccessToken);

//// Viewer を初期化し、Asset ID 2767062（PLATEAUの高精細地形）を terrain に使用
//// "cesiumContainer" は HTML 側の <div id="cesiumContainer"> に対応する
//const viewer = new Viewer("cesiumContainer", {
//  terrain: Terrain.fromWorldTerrain(),
//});
//viewer.terrainProvider = await CesiumTerrainProvider.fromIonAssetId(2767062);

//// 透明なオブジェクトの裏側でも選択できるようにする（例：建物の背後をピック可能に）
//viewer.scene.pickTranslucentDepth = true;

// === 以下：UIの動的生成とイベント処理 ===

//// UIコンテナを作成して、HTMLのbody に追加（ボタンを配置するための親要素になる）
//// HTMLに要素を追加するときの、いつものやり方。
//// 以下、appendChild で要素を追加していく。
//const modulesContainer = document.createElement("div");
//modulesContainer.id = "modulesContainer";
//document.body.appendChild(modulesContainer);

//// 「Start Labeling」ボタンを作成し、コンテナに追加
//const startLabelBtn = document.createElement("button");
//startLabelBtn.id = "startLabelBtn";
//startLabelBtn.innerText = "Start Labeling";
//modulesContainer.appendChild(startLabelBtn);

//// 「Stop Labeling」ボタンを作成し、初期状態では非表示にしてコンテナに追加
//const stopLabelBtn = document.createElement("button");
//stopLabelBtn.id = "stopLabelBtn";
//stopLabelBtn.innerText = "Stop Labeling";
//modulesContainer.appendChild(stopLabelBtn);

//// イベントハンドラの参照を保持する変数（ラベリング処理を止めるために必要）
//let handler;

//// 「Start Labeling」ボタンがクリックされたときの処理
//startLabelBtn.addEventListener("click", () => {
  //// 既存の handler があれば解除（保険的処理）
  // if (defined(handler)) {
  //   handler = null;
  // }
  //// 「Start」ボタンを無効化し、「Stop」ボタンを表示
  // startLabelBtn.disabled = true;
  // stopLabelBtn.style.display = "inline-block";
  //// ラベル配置機能を起動（外部モジュールから関数呼び出し）
  // handler = addlabel(viewer);
//});

//// 「Stop Labeling」ボタンがクリックされたときの処理
//stopLabelBtn.addEventListener("click", () => {
  //// 「Stop」ボタンを非表示にして、「Start」ボタンを有効化
  // stopLabelBtn.style.display = "none";
  // startLabelBtn.disabled = false;

  //// イベントハンドラが存在すれば破棄（ラベリング停止）
  // if (defined(handler)) {
  //   handler.destroy();
  // }
// });
