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
    component.on("dblclick", function() {
        this.destroy();
    });
}

function addComponentListeners() {
    stage.on("mousemove", highlighter);
    highlight.on("mousedown", addComponent);
}

const components = document.querySelectorAll(".component");
components.forEach(component => {
    component.addEventListener("click", function() {
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