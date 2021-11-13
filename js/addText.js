/*-------------------------- draw text --------------------------*/

// maybe just add them to component layer ?

// displays text input
function showPopup() {
    popup.classList.toggle("showInput");
}

const add = document.querySelector("#addText");
// gets user text and adds it to container
add.addEventListener("click", function() {
    // get user text

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


});

function addTextListeners() {
    stage.on("mousemove", highlighter);
    highlight.on('mousedown touchstart', showPopup);
}

const textBtn = document.querySelector("#text");
const popup = document.querySelector(".inputDiv");

textBtn.addEventListener("click", function() {
        // keeps track of which button is selected
        prevSelected.classList.remove("selected");
        this.classList.add("selected");
        prevSelected = this;

        // removes previous listeners: lives in script.js
        removeListeners();
        // starts component functionality
        addTextListeners();

        container.removeEventListener("mouseleave", containerFunc);
        containerFunc = noHighlight;
        container.addEventListener("mouseleave", containerFunc);
});