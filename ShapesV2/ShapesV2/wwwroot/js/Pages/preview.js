
const previewForm = document.getElementById('form_preview');

if (previewForm) {

    const displayList = document.getElementById('select_shapes_display');
    const displayDataSetBtn = document.getElementById('btn_display_dataset');
    const divOfCanvasTwo = document.getElementById('div_canvas_two');
    const baseUrl = getBaseUrl();

    document.addEventListener('DOMContentLoaded', () => {
        listOfShapes.forEach(v => addOptionToList(displayList, v.concat('s')));
    });

    displayDataSetBtn.addEventListener('click', () => {

        let selectedShape = (displayList.value).toLowerCase().concat('500.bin');

        getData(baseUrl.concat('datasets/').concat(selectedShape))
            .then(r => {
                let data = Array.from(new Uint8Array(r));
                displayImages(data, 28, 28, 28);
            })
            .catch(err => console.error(err));
    });

    function setup() {
        const cnv = createCanvas(850, 500);
        background(255);
        setCanvasPosition(cnv.canvas, divOfCanvasTwo);
    }
}
