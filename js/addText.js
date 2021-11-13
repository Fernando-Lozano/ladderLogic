/*-------------------------- draw text --------------------------*/

// groups components to "z-index" relative to component group accordingly
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

const add = document.querySelector("#addText");
const textInput = document.querySelector("#textInput");
// gets user text and adds it to container
add.addEventListener("click", function() {
    // gets user text
    const parent = this.parentElement;
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

    textNode.moveToTop();

    // removes text
    textNode.on("dblclick", function () {
        this.destroy();
    });
    togglePopup();
});

function addTextListeners() {
    stage.on("mousemove", highlighter);
    highlight.on('mousedown touchstart', getText);
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

        // moves highlighter to top
        highlight.moveToTop();

        container.removeEventListener("mouseleave", containerFunc);
        containerFunc = noHighlight;
        container.addEventListener("mouseleave", containerFunc);
});