const width = 1200;
const height = 1200;
const dpi = window.devicePixelRatio;
const blockSnapSize = width / 30; // tweak this to suite your needs
// first we need Konva core things: stage and layer
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});


// ------- adds grid lines as a guide -------
var gridLayer = new Konva.Layer();
var padding = blockSnapSize;
console.log(width, padding, width / padding);

// x lines
for (var i = 0; i <= width / padding; i++) {
    gridLayer.add(new Konva.Line({
        points: [Math.round(i * padding), 0, Math.round(i * padding), height],
        stroke: '#ddd',
        strokeWidth: 1,
    }));
}

//  y lines
for (var j = 0; j < height / padding; j++) {
    gridLayer.add(new Konva.Line({
        points: [0, Math.round(j * padding), width, Math.round(j * padding)],
        stroke: '#ddd',
        strokeWidth: 0.5,
    }));
}
stage.add(gridLayer);
// gridLayer.hide();


// ------- draws lines to grid -------
var layer = new Konva.Layer();
stage.add(layer);

var isPaint = false;
var mode = 'brush';
var lastLine;

stage.on('mousedown touchstart', function (e) {
    isPaint = true;
    var pos = stage.getPointerPosition();
    // adjust pointer position to nearest grid line
    pos.x = Math.round(pos.x / blockSnapSize) * blockSnapSize;
    pos.y = Math.round(pos.y / blockSnapSize) * blockSnapSize;
    lastLine = new Konva.Line({
        stroke: '#df4b26',
        strokeWidth: 5,
        globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out',
        // round cap for smoother lines
        lineCap: 'round',
        // add point twice, so we have some drawings even on a simple click
        // points: [pos.x, pos.y, pos.x, pos.y],
    });
    layer.add(lastLine);
});

stage.on('mouseup touchend', function () {
    isPaint = false;
});

// and core function - drawing
stage.on('mousemove touchmove', function (e) {
    if (!isPaint) {
        return;
    }

    // prevent scrolling on touch devices
    e.evt.preventDefault();

    const pos = stage.getPointerPosition();
    pos.x = Math.round(pos.x / blockSnapSize) * blockSnapSize;
    pos.y = Math.round(pos.y / blockSnapSize) * blockSnapSize;
    var newPoints = lastLine.points().concat([pos.x, pos.y]);
    lastLine.points(newPoints);
});

var select = document.getElementById('tool');
select.addEventListener('change', function () {
    mode = select.value;
});

const printer = document.querySelector("#print");
const show = document.querySelector(".show");
printer.addEventListener("click", () => {
    gridLayer.hide();
    let img = document.createElement("img");
    img.src =  stage.toDataURL({ pixelRatio: dpi });
    img.width = 1200;
    img.height = 1200;
    show.append(img);
    gridLayer.show();

});