import {
    Cartesian2,
    VerticalOrigin,
    LabelStyle,
    Color,
    ScreenSpaceEventType,
    ScreenSpaceEventHandler
} from "cesium";

export function addlabel(viewer) {

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

        const picked = viewer.scene.pick(movement.position);

        picked.color = Color.RED;


    }, ScreenSpaceEventType.LEFT_CLICK);
    return handler

}