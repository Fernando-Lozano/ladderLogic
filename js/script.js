const dpi = window.devicePixelRatio;

// print workspace
const printBtn = document.querySelector("#print");

printBtn.addEventListener("click", () => {
    // removes grid lines for printing purposes
    gridLayer.hide();

    printJS({ printable: stage.toDataURL({ pixelRatio: dpi }), type: "image" });

    // adds grid lines back in
    gridLayer.show();
});

// clear workspace
const clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", () => {
    drawLayer.destroyChildren();
    // clear other layers here
});

// determine which item in toolbar is selected
const tools = document.querySelectorAll(".tool");

// keeps track of which component was previously selected
let prevSelected = document.querySelector("#pencil");
prevSelected.classList.toggle("selected");

// A stage is used to contain multiple layers
const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

// prints canvas add button to call this
