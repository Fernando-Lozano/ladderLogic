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

/*-------------------------- load workspace --------------------------*/
// todo

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