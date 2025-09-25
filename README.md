INSTRUCTIONS

[] Download the project 

    https://github.com/Oscarbralo/foss4gCesiumTest


[] Install webpack  

	npm i -D webpack webpack-cli webpack-dev-server ts-loader typescript html-webpack-plugin copy-webpack-plugin css-loader style-loader


[] Build 

	npm run build

[] Run the project

	npm run start

    This will not work without your own token ID, so lets enter cesium Ion and lets see the token


[] Add your ion token in order to view the globe


[] Then uncomment everything


[] Lets create a input text and a button to call an id from ion and load it here

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



[] Lets fill the add label module


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



[] Next we will add next some color to the picked feature

    const picked = viewer.scene.pick(movement.position);

    picked.color = Color.RED;


[] Load example items in cesium Ion

    Load the House.laz into Cesium Ion

    We will have to adust the tileset location

[] Load the example of the house through the app

    You will see small points, so we will do them bigger in order to watch them properly


[] Pin point inside the point cloud in order to see your point


[] Then lets add a slider in order to make the points inside the point cloud bigger

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 1;
    slider.max = 10;
    slider.step = 1;
    slider.value = 1;
    assetContainer.append(slider);


[] And the listener

    slider.addEventListener("input", () => tileset.style = new Cesium3DTileStyle({pointSize: slider.value}));


[] Make the tests that click the small points is not very easy, but when you make them bigger, its easier

[] Load the gasussian splat (if time permits)

[] Click point inside the gaussian splat 