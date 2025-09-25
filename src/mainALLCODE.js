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

//REQUIRED
Ion.defaultAccessToken = ""; // Required!

console.log(Ion.defaultAccessToken);

const viewer = new Viewer("cesiumContainer", {
  terrain: Terrain.fromWorldTerrain(),
});

viewer.terrainProvider = await CesiumTerrainProvider.fromIonAssetId(2767062);
viewer.scene.pickTranslucentDepth = true;


//CREATE THE CONTAINER FOR THE LABEL
const modulesContainer = document.createElement("div");
modulesContainer.id = "modulesContainer";
document.body.appendChild(modulesContainer);

//CREATED THE START LABELING BUTTON
const startLabelBtn = document.createElement("button");
startLabelBtn.id = "startLabelBtn";
startLabelBtn.innerText = "Start Labeling";
modulesContainer.appendChild(startLabelBtn);

//CREATED THE HIDDEN STOP LABELLING BUTTON
const stopLabelBtn = document.createElement("button");
stopLabelBtn.id = "stopLabelBtn";
stopLabelBtn.innerText = "Stop Labeling";
modulesContainer.appendChild(stopLabelBtn);

//CREATED THE HANDLE TO CALL THE ADDLABEL MODULE
let handler;
startLabelBtn.addEventListener("click", () => {
  if (defined(handler)) {
    handler = null;
  }
  startLabelBtn.disabled = true;
  stopLabelBtn.style.display = "inline-block";
  handler = addlabel(viewer);
});

stopLabelBtn.addEventListener("click", () => {
  stopLabelBtn.style.display = "none";
  startLabelBtn.disabled = false;

  if (defined(handler)) {
    handler.destroy();
  }
});




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
  tileset.pointCloudShading.attenuation = true;
  tileset.style = new Cesium3DTileStyle({
      pointSize: 3 
  });
  viewer.flyTo(tileset);

})







