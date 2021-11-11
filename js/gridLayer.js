/*
    use gridLayer.hide(); to hide grid lines
*/

// ------- adds grid lines as a guide -------
const gridLayer = new Konva.Layer({
    listening: false
});

// x lines
for (let i = 0; i <= width / padding; i++) {
    gridLayer.add(new Konva.Line({
        points: [Math.round(i * padding), 0, Math.round(i * padding), height],
        stroke: '#ddd',
        strokeWidth: 1,
    }));
}
//  y lines
for (let j = 0; j < height / padding; j++) {
    gridLayer.add(new Konva.Line({
        points: [0, Math.round(j * padding), width, Math.round(j * padding)],
        stroke: '#ddd',
        strokeWidth: 0.5,
    }));
}

stage.add(gridLayer);