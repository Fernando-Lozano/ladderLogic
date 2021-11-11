/*
    fix: when mouse off canvas disable drawing
    use stage.off(); to remove event listeners
    enable and disable event listeners according to what item in toolbar is selected
*/

// ------- draws lines to grid -------
const drawLayer = new Konva.Layer();

stage.add(drawLayer);

let isPaint = false;
let mode = 'brush';
let lastLine;

stage.on('mousedown touchstart', function (e) {
    isPaint = true;
    const pos = stage.getPointerPosition();
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
    });
    drawLayer.add(lastLine);
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
    const newPoints = lastLine.points().concat([pos.x, pos.y]);
    lastLine.points(newPoints);
});

// reference gridLinesAndSave
const select = document.getElementById('tool');
select.addEventListener('change', function () {
    mode = select.value;
});