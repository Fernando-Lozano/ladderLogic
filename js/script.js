const dpi = window.devicePixelRatio;

// download workspace
const printBtn = document.querySelector("#print");

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

printBtn.addEventListener("click", () => {
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

// clear workspace
const clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", () => {
    drawLayer.destroyChildren();
    toDelete = componentGroup.getChildren();
    componentGroup.destroyChildren();
    textGroup.destroyChildren();
});

// keeps track of which item was previously selected
let prevSelected = document.querySelector("#pencil");
prevSelected.classList.toggle("selected");

// A stage is used to contain multiple layers
const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

//  keeps track of handlers added to container
let containerFunc;

// removes all konva listeners
function removeListeners() {
    stage.off("mousedown mouseup touchstart touchend mousemove touchmove");
    highlight.off('mousedown touchstart');
}