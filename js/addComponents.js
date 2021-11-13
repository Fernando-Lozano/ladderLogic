// ------- draw components -------

const componentLayer = new Konva.Layer();

stage.add(componentLayer);

const components = document.querySelectorAll(".component");

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
    fill: '#FF7B17',
    opacity: 0.6,
    stroke: '#CF6412',
    strokeWidth: 3,
    dash: [20, 2]
});
componentLayer.add(highlight);
noHighlight();

function highlighter() {
    // makes highlighter visible
    if (!highlight.isVisible()) highlight.visible(true);

    // gets mouse position
    const pos = stage.getPointerPosition();
    pos.x += blockSnapSize / 2;
    pos.y += blockSnapSize / 2;

    highlight.position({
        x: Math.floor(pos.x / blockSnapSize) * blockSnapSize - blockSnapSize / 2,
        y: Math.floor(pos.y / blockSnapSize) * blockSnapSize - blockSnapSize / 2
    });
}


function addComponentListeners() {
    stage.on("mousemove", highlighter);
}

components.forEach(component => {
    component.addEventListener("click", function() {
        // keeps track of which button is selected
        prevSelected.classList.remove("selected");
        this.classList.add("selected");
        prevSelected = this;

        // removes previous listeners
        stage.off("mousedown mouseup touchstart touchend mousemove touchmove");
        // starts component functionality
        addComponentListeners();
        container.removeEventListener("mouseleave", containerFunc);
        containerFunc = noHighlight;
        container.addEventListener("mouseleave", containerFunc);
    });
});