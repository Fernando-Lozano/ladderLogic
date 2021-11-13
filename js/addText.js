/*-------------------------- draw text --------------------------*/


// maybe just add them to component layer ?


// hover effect from: https://medium.com/@pierrebleroux/snap-to-grid-with-konvajs-c41eae97c13f
// used to highlight area to place components

function addText() {

    //  get user input here

    // add text to container
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
    componentLayer.add(component);

    // removes text
    component.on("dblclick", function () {
        this.destroy();
    });
}

function addComponentListeners() {
    stage.on("mousemove", highlighter);
    highlight.on('mousedown touchstart', addText);
}

const textBtn = document.querySelector("#text");

textBtn.addEventListener("click", function() {
        // keeps track of which button is selected
        prevSelected.classList.remove("selected");
        this.classList.add("selected");
        prevSelected = this;

        // removes previous listeners: lives in script.js
        removeListeners();
        // starts component functionality
        addComponentListeners();


        container.removeEventListener("mouseleave", containerFunc);
        containerFunc = noHighlight;
        container.addEventListener("mouseleave", containerFunc);
});