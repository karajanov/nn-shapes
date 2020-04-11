
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
    });

    scrollToBottomBtn.addEventListener('click', scrollToBottom);
    scrollToTopBtn.addEventListener('click', scrollToTop);
}
