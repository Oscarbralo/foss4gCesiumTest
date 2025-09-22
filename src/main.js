import {

  Terrain,
  Viewer,
  Ion,
  defined,
  CesiumTerrainProvider,
  IonResource,
  Cesium3DTileset
} from "cesium";
import "cesium/Widgets/widgets.css";
import "./style.css";

window.CESIUM_BASE_URL = "/cesium";


Ion.defaultAccessToken = ""; // Required!

console.log(Ion.defaultAccessToken);

const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});

//viewer.terrainProvider = await CesiumTerrainProvider.fromIonAssetId(2767062);
//viewer.scene.pickTranslucentDepth = true;

