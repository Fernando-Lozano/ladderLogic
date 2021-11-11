const canvas = document.querySelector(".draw");
const ctx = canvas.getContext("2d");
const dpi = window.devicePixelRatio;

// fixed canvas blur from: https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
(function fix_dpi() {
    // create a style object that returns width and height
    let style = {
        height() {
            return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
        },
        width() {
            return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
        }
    }
    //set the correct attributes for a crystal clear image!
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
})();

// temp
ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

// prints canvas add button to call this
// printJS({ printable: canvas.toDataURL(), type: "image" });
