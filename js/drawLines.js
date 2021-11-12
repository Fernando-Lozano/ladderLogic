/*
    fix: when mouse off canvas disable drawing--if possible
*/

// ------- draws lines to grid -------
const drawLayer = new Konva.Layer();

stage.add(drawLayer);

let isPaint = false;
let mode = 'pencil';
let lastLine;

function startDraw(e) {
    isPaint = true;
    const pos = stage.getPointerPosition();
    // adjust pointer position to nearest grid line
    pos.x = Math.round(pos.x / blockSnapSize) * blockSnapSize;
    pos.y = Math.round(pos.y / blockSnapSize) * blockSnapSize;
    lastLine = new Konva.Line({
        stroke: '#df4b26',
        // make stroke width bigger for eraser so that no streaks are left behind
        strokeWidth: mode === "pencil" ? 5 : 6,
        globalCompositeOperation:
            mode === 'pencil' ? 'source-over' : 'destination-out',
        // round cap for smoother lines
        lineCap: 'round',
        // add point twice, so we have some drawings even on a simple click
    });
    drawLayer.add(lastLine);
}

function endDraw() {
    isPaint = false;
}

// and core function - drawing
function drawing(e) {
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
}

function addListeners() {
    stage.on('mousedown touchstart', startDraw);
    stage.on('mouseup touchend', endDraw);
    stage.on('mousemove touchmove', drawing);
}
// enables drawing for default setting
addListeners();

const pencil = document.querySelector("#pencil");
const eraser = document.querySelector("#eraser");

pencil.addEventListener("click", function() {
    // keeps track of which button is selected
    prevSelected.classList.remove("selected");
    this.classList.add("selected");
    prevSelected = this;

    mode = this.dataset.value;
    
    // removes previous listeners
    stage.off("mousedown mouseup touchstart touchend mousemove touchmove");
    // starts drawing functionality
    addListeners();
});
eraser.addEventListener("click", function() {
    // keeps track of which button is selected
    prevSelected.classList.remove("selected");
    this.classList.add("selected");
    prevSelected = this;

    mode = this.dataset.value;

    // removes previous listeners
    stage.off("mousedown mouseup touchstart touchend mousemove touchmove");
    // starts drawing functionality
    addListeners();
});