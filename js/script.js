const container = document.querySelector("#container");
const width = container.clientWidth;
const height = container.clientHeight;
const blockSnapSize = Math.round(width / 16); // tweak this if needed (grid size)
const lineSize = 2; // size of line drawings
const dpi = window.devicePixelRatio;

//*-------------------------- download workspace --------------------------*/

const downloadBtn = document.querySelector("#download");

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
    let link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

downloadBtn.addEventListener("click", () => {
    // removes grid lines for printing purposes
    gridGroup.hide();
    // adds white background
    background.visible(true);

    const dataURL = stage.toDataURL({ pixelRatio: dpi });
    downloadURI(dataURL, 'ladderLogic.png');

    // adds grid lines
    gridGroup.show();
    // removes white background
    background.hide();
});

/*-------------------------- save workspace --------------------------*/
// todo
/*
    get all necessary info to store items:
        store lines in array
        store components in array
        store text in array
    store in local storage
    check to see how big the arrays end up being
*/

/*-------------------------- load workspace --------------------------*/
// todo
/*
    if stored workspace exists:
        clear container
        loop over stored items and add them to stage
        check to see how long a full container takes: if lots, add load icon
    else do nothing
*/

/*-------------------------- clear workspace --------------------------*/

const clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", () => {
    drawLayer.destroyChildren();
    componentGroup.destroyChildren();
    textGroup.destroyChildren();
});

/*-------------------------- general section --------------------------*/

// A stage is used to contain multiple layers
const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

// keeps track of which item was previously selected
let prevSelected = document.querySelector("#pencil");
prevSelected.classList.toggle("selected");

//  keeps track of handler added to container
let containerFunc;

// removes certain konva listeners
function removeListeners() {
    stage.off("mousedown mouseup mousemove");
    highlight.off("mousedown");
}

/*-------------------------- add grid layer --------------------------*/

// used as a guide for drawing lines, adding text and components

const gridLayer = new Konva.Layer({ listening: false });
stage.add(gridLayer);

const gridGroup = new Konva.Group();
gridLayer.add(gridGroup);

// x lines
for (let i = 0; i < width / blockSnapSize; i++) {
    gridGroup.add(new Konva.Line({
        points: [Math.round(i * blockSnapSize), 0, Math.round(i * blockSnapSize), height],
        stroke: '#ddd',
        strokeWidth: 1,
    }));
}
//  y lines
for (let j = 0; j < height / blockSnapSize; j++) {
    gridGroup.add(new Konva.Line({
        points: [0, Math.round(j * blockSnapSize), width, Math.round(j * blockSnapSize)],
        stroke: '#ddd',
        strokeWidth: 0.5,
    }));
}

// used to add a white background for downloading image
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
    if (pos.x !== points[points.length - 2] || pos.y !== points[points.length - 1]) {
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

pencil.addEventListener("click", function () {
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

eraser.addEventListener("click", function () {
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

/*-------------------------- draw square highlighter --------------------------*/

// layer that will contain components and text
const componentLayer = new Konva.Layer();
stage.add(componentLayer);


// hover effect from: https://medium.com/@pierrebleroux/snap-to-grid-with-konvajs-c41eae97c13f
// used to highlight area to place components
const highlight = new Konva.Rect({
    x: 0,
    y: 0,
    width: blockSnapSize,
    height: blockSnapSize,
    fill: '#c6e6f1',
    opacity: 0.8,
});
componentLayer.add(highlight);

// hides highlighter if mouse leaves container
function noHighlight() {
    highlight.hide();
};
noHighlight();

function highlighter() {
    // makes highlighter visible
    if (!highlight.isVisible()) highlight.visible(true);

    // gets mouse position
    const pos = stage.getPointerPosition();
    pos.y += blockSnapSize / 2;

    highlight.position({
        x: Math.floor(pos.x / blockSnapSize) * blockSnapSize,
        y: Math.floor(pos.y / blockSnapSize) * blockSnapSize - blockSnapSize / 2
    });
}

/*-------------------------- draw components --------------------------*/

// groups components so that its' z-index can be changed relative to text
const componentGroup = new Konva.Group();
componentLayer.add(componentGroup);

let imgObj;
// sizes height based on type of component
let scale;
function addComponent() {
    // gets scaled height of component
    scale = Number(imgObj.dataset.scale);
    let x = highlight.x();
    let y = highlight.y();

    let component = new Konva.Image({
        x: x + lineSize / 2,
        y: y,
        image: imgObj,
        width: blockSnapSize - lineSize,
        height: blockSnapSize * scale,
        fill: "white",
    });
    componentGroup.add(component);

    // removes component
    component.on("dblclick", function () {
        stage.container().style.cursor = 'default';
        this.destroy();
    });
    // changes cursor on hover
    component.on('mouseenter', function () {
        stage.container().style.cursor = 'pointer';
    });
    component.on('mouseleave', function () {
        stage.container().style.cursor = 'default';
    });
}

function addComponentListeners() {
    stage.on("mousemove", highlighter);
    highlight.on("mousedown", addComponent);
}

const components = document.querySelectorAll(".component");
components.forEach(component => {
    component.addEventListener("click", function () {
        // keeps track of which button is selected
        prevSelected.classList.remove("selected");
        this.classList.add("selected");
        prevSelected = this;

        removeListeners();
        // starts component functionality
        addComponentListeners();

        // moves highlighter below components so that components can be clicked
        highlight.zIndex(0);

        // gets image from component selected
        imgObj = this.firstElementChild;

        // stops highlighting if the mouse leaves the container
        container.removeEventListener("mouseleave", containerFunc);
        containerFunc = noHighlight;
        container.addEventListener("mouseleave", containerFunc);
    });
});

/*-------------------------- draw text --------------------------*/

// groups text so that its' z-index can be changed relative to components
const textGroup = new Konva.Group();
componentLayer.add(textGroup);

// displays/hides text input
function togglePopup() {
    popup.classList.toggle("displayInput");
    setTimeout(() => {
        popup.classList.toggle("opacityInput");
        // focuses text input
        textInput.focus();
    }, 10);
}

// tracks mouse positon
let pos = {
    x: 0,
    y: 0
};
function getText() {
    // get position of mouse on click
    pos.x = highlight.x();
    pos.y = highlight.y();

    togglePopup();
}

const addText = document.querySelector("#addText");
const textInput = document.querySelector("#textInput");

// gets user text and adds it to container
addText.addEventListener("submit", function (e) {
    e.preventDefault();
    // gets user text
    const text = textInput.value;
    textInput.value = "";

    const textNode = new Konva.Text({
        text: text,
        x: pos.x + blockSnapSize / 2,
        y: pos.y,
        fontSize: 12,
        draggable: true
    });
    // centers the text
    textNode.offsetX(textNode.width() / 2);
    // offsets text above square
    textNode.offsetY(5 + textNode.height() / 2);
    textGroup.add(textNode);

    // removes text
    textNode.on("dblclick", function () {
        this.destroy();
        stage.container().style.cursor = 'default';
    });
    // changes cursor on hover
    textNode.on('mouseenter', function () {
        stage.container().style.cursor = 'pointer';
    });
    textNode.on('mouseleave', function () {
        stage.container().style.cursor = 'default';
    });

    togglePopup();
});

function addTextListeners() {
    stage.on("mousemove", highlighter);
    highlight.on("mousedown", getText);
}

const textBtn = document.querySelector("#text");
const popup = document.querySelector(".inputDiv");

textBtn.addEventListener("click", function () {
    // keeps track of which button is selected
    prevSelected.classList.remove("selected");
    this.classList.add("selected");
    prevSelected = this;

    removeListeners();
    // starts text functionality
    addTextListeners();

    // moves highlighter above components so components can't be clicked
    highlight.zIndex(1);

    container.removeEventListener("mouseleave", containerFunc);
    containerFunc = noHighlight;
    container.addEventListener("mouseleave", containerFunc);
});

// closes text popup
const closeBtn = document.querySelector("#closeText");
closeBtn.addEventListener("click", () => {
    togglePopup();
});