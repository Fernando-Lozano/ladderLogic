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
addText.addEventListener("submit", function(e) {
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
    });
    togglePopup();
});

function addTextListeners() {
    stage.on("mousemove", highlighter);
    highlight.on("mousedown", getText);
}

const textBtn = document.querySelector("#text");
const popup = document.querySelector(".inputDiv");

textBtn.addEventListener("click", function() {
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