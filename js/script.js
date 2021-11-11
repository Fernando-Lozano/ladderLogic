const dpi = window.devicePixelRatio;

// Attention: might not need this if using konva
// fixes canvas blur from: https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
function fix_dpi() {
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
}

// A stage is used to contain multiple layers
const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

// prints canvas add button to call this
// printJS({ printable: stage.toDataURL({ pixelRatio: dpi }), type: "image" });
