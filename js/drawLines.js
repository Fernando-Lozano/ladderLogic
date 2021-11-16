/*-------------------------- draws lines --------------------------*/

const drawLayer = new Konva.Layer();
stage.add(drawLayer);

let isPaint = false;
let mode = "pencil";
let line;
let points;

function startDraw(e) {
    isPaint = true;

    const pos = stage.getPointerPosition();
    // adjusts pointer position to nearest grid line
    pos.x = Math.round(pos.x / blockSnapSize) * blockSnapSize;
    pos.y = Math.round(pos.y / blockSnapSize) * blockSnapSize;

    line = new Konva.Line({
        points: [pos.x, pos.y],
        stroke: "black",
        // makes stroke width bigger for eraser so that no streaks are left behind
        strokeWidth: mode === "pencil" ? lineSize : lineSize + 1,
        globalCompositeOperation:
        mode === "pencil" ? "source-over" : "destination-out",
        // rounds cap for smoother lines
        lineCap: "round",
    });
    drawLayer.add(line);
}

// stops drawing if mouse leaves container or mouse up
function stopDraw() {
    isPaint = false;
}

function drawing(e) {
    if (!isPaint) {
        return;
    }
    const pos = stage.getPointerPosition();
    // adjusts pointer position to nearest grid line
    pos.x = Math.round(pos.x / blockSnapSize) * blockSnapSize;
    pos.y = Math.round(pos.y / blockSnapSize) * blockSnapSize;

    points = line.points();
    // draw only if mouse has moved to another grid intersection
    if (pos.x !== points[points.length-2] || pos.y !== points[points.length-1]) {
        const newPoints = points.concat([pos.x, pos.y]);
        line.points(newPoints);
    }
}

function addLineListeners() {
    stage.on("mousedown", startDraw);
    stage.on("mouseup", stopDraw);
    stage.on("mousemove", drawing);
}
// enables drawing for default setting
addLineListeners();
containerFunc = stopDraw;
container.addEventListener("mouseleave", containerFunc);

const pencil = document.querySelector("#pencil");
const eraser = document.querySelector("#eraser");

pencil.addEventListener("click", function() {
    // keeps track of which button is selected
    prevSelected.classList.remove("selected");
    this.classList.add("selected");
    prevSelected = this;

    mode = this.dataset.value;
    
    removeListeners();
    // starts drawing functionality
    addLineListeners();
    
    // stops drawing if the mouse leaves the container
    container.removeEventListener("mouseleave", containerFunc);
    containerFunc = stopDraw;
    container.addEventListener("mouseleave", containerFunc);
});

eraser.addEventListener("click", function() {
    // keeps track of which button is selected
    prevSelected.classList.remove("selected");
    this.classList.add("selected");
    prevSelected = this;

    mode = this.dataset.value;

    removeListeners();
    // starts drawing functionality
    addLineListeners();

    // stops drawing if the mouse leaves the container
    container.removeEventListener("mouseleave", containerFunc);
    containerFunc = stopDraw;
    container.addEventListener("mouseleave", containerFunc);
});