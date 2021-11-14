/*-------------------------- add grid layer --------------------------*/

const gridLayer = new Konva.Layer({
    listening: false
});
stage.add(gridLayer);

const gridGroup = new Konva.Group();
gridLayer.add(gridGroup);

// x lines
for (let i = 0; i <= width / padding; i++) {
    gridGroup.add(new Konva.Line({
        points: [Math.round(i * padding), 0, Math.round(i * padding), height],
        stroke: '#ddd',
        strokeWidth: 1,
    }));
}
//  y lines
for (let j = 0; j < height / padding; j++) {
    gridGroup.add(new Konva.Line({
        points: [0, Math.round(j * padding), width, Math.round(j * padding)],
        stroke: '#ddd',
        strokeWidth: 0.5,
    }));
}

// used to add a white background for downloading image
// used only to add white background for image download
const background = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: "white",
    // remove background from hit graph for better perf
    // because we don't need any events on the background
    listening: false,
});
background.hide();
gridLayer.add(background)