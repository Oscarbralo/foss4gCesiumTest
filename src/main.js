import {

  Terrain,
  Viewer,
  Ion,
  defined,
  CesiumTerrainProvider,
  IonResource,
  Cesium3DTileStyle,
  Cesium3DTileset
} from "cesium";
import "cesium/Widgets/widgets.css";
import "./style.css";

import { addlabel } from "./modules/addlabel";

window.CESIUM_BASE_URL = "/cesium";

//REQUIRED
Ion.defaultAccessToken = ""; // Required!

console.log(Ion.defaultAccessToken);

//const viewer = new Viewer("cesiumContainer", {
//  terrain: Terrain.fromWorldTerrain(),
//});

//viewer.terrainProvider = await CesiumTerrainProvider.fromIonAssetId(2767062);
//viewer.scene.pickTranslucentDepth = true;


//// Container, buttons and listeners for hlabel
//
//const modulesContainer = document.createElement("div");
//modulesContainer.id = "modulesContainer";
//document.body.appendChild(modulesContainer);
//
//const startLabelBtn = document.createElement("button");
//startLabelBtn.id = "startLabelBtn";
//startLabelBtn.innerText = "Start Labeling";
//modulesContainer.appendChild(startLabelBtn);
//
//const stopLabelBtn = document.createElement("button");
//stopLabelBtn.id = "stopLabelBtn";
//stopLabelBtn.innerText = "Stop Labeling";
//modulesContainer.appendChild(stopLabelBtn);
//
//let handler;
//startLabelBtn.addEventListener("click", () => {
//  if (defined(handler)) {
//    handler = null;
//  }
//  startLabelBtn.disabled = true;
//  stopLabelBtn.style.display = "inline-block";
//  handler = addlabel(viewer);
//});
//
//stopLabelBtn.addEventListener("click", () => {
//  stopLabelBtn.style.display = "none";
//  startLabelBtn.disabled = false;
//
//  if (defined(handler)) {
//    handler.destroy();
//  }
//});
