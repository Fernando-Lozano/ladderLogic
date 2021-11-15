/*-------------------------- draw square highlighter --------------------------*/

// layer that will contain components and text
const componentLayer = new Konva.Layer();

stage.add(componentLayer);

// hides highlighter if mouse leaves container
function noHighlight() {
    highlight.hide();
};

// hover effect from: https://medium.com/@pierrebleroux/snap-to-grid-with-konvajs-c41eae97c13f
// used to highlight area to place components
const highlight = new Konva.Rect({
    x: 0,
    y: 0,
    width: blockSnapSize,
    height: blockSnapSize,
    fill: '#c6e6f1',
    opacity: 0.6,
});
componentLayer.add(highlight);
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

// groups components to "z-index" relative to text group accordingly
const componentGroup = new Konva.Group();
componentLayer.add(componentGroup);

const components = document.querySelectorAll(".component");

let imgObj;
function addComponent() {
    let x = highlight.x();
    let y = highlight.y();

    let component = new Konva.Image({
        x: x + lineSize / 2,
        y: y + lineSize / 2,
        image: imgObj,
        width: blockSnapSize - lineSize,
        height: blockSnapSize - lineSize,
        fill: "white",
    });
    componentGroup.add(component);

    // removes component
    component.on("dblclick", function() {
        this.destroy();
    });
}

function addComponentListeners() {
    stage.on("mousemove", highlighter);
    highlight.on('mousedown touchstart', addComponent);
}

components.forEach(component => {
    component.addEventListener("click", function() {
        // keeps track of which button is selected
        prevSelected.classList.remove("selected");
        this.classList.add("selected");
        prevSelected = this;

        // removes previous listeners: lives in script.js
        removeListeners();
        // starts component functionality
        addComponentListeners();

        // moves highlighter to bottom
        highlight.zIndex(0);

        // gets image from component selected
        imgObj = this.firstElementChild;

        container.removeEventListener("mouseleave", containerFunc);
        containerFunc = noHighlight;
        container.addEventListener("mouseleave", containerFunc);
    });
});