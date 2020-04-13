
const previewForm = document.getElementById('form_preview');

if (previewForm) {

    const previewFieldset = document.getElementById('fieldset_preview');
    const displayList = document.getElementById('select_shapes_display');
    const displayDataSetBtn = document.getElementById('btn_display_dataset');
    const scrollToBottomBtn = document.getElementById('btn_scroll_bottom');
    const scrollToTopBtn = document.getElementById('btn_scroll_top');
    const baseUrl = getBaseUrl();

    document.addEventListener('DOMContentLoaded', () => {

        
    });

    displayDataSetBtn.addEventListener('click', () => {

        //let shape = displayList.value;

        //getImageDataByShape(baseUrl.concat('api/ImageData/Title'), '?shape=', shape)
        //    .then(result => {

        //        revealContainer(scrollToBottomBtn);
        //        removeAllChildren(previewFieldset);
        //        let setIdentifier = shape.toLowerCase().concat('_');
        //        let loc = imgLocation.concat(shape.toLowerCase().concat('s/'));
        //        appendDataSetToForm(previewFieldset, result, cols, setIdentifier, loc, ext);
        //        revealContainer(scrollToTopBtn);

        //    })
        //    .catch(err => console.error(err));

         //fetch(getBaseUrl().concat('datasets/circles1000.bin'))
        //    .then(r => r.arrayBuffer())
        //    .then(r => {
        //        let all = new Uint8Array(r);
        //        for (let n = 0; n < 1; ++n) {
        //            let img = createImage(28, 28);
        //            let offset = n * 784;
        //            img.loadPixels();
        //            for (let i = 0; i < 784; ++i) {
        //                let val = all[i + offset];
        //                img.pixels[i * 4 + 0] = val;
        //                img.pixels[i * 4 + 1] = val;
        //                img.pixels[i * 4 + 2] = val;
        //                img.pixels[i * 4 + 3] = 255;
        //            }
        //            console.log(img.pixels.length);
        //            img.updatePixels();
        //            save(img, 'test.jpg');
        //            let x = (n % 10) * 28;
        //            let y = floor(n / 10) * 28;
        //            image(img, x, y);
        //        }
        //    })
        //    .catch(err => console.error(err));
    });

    scrollToBottomBtn.addEventListener('click', scrollToBottom);
    scrollToTopBtn.addEventListener('click', scrollToTop);
}
