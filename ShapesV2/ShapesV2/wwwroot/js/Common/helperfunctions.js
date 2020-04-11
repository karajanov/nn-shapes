function paint() {

    if (mouseIsPressed) {

        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function clearCanvas() {

    background(bg.r, bg.g, bg.b, bg.a);
}

function setCanvasPosition(cnv, divOfCanvas) {

    if (!cnv || !divOfCanvas) {
        console.error('Canvas position: canvas or div undefined');
        return undefined;
    }

    cnv.style.display = "flex";
    cnv.style.margin = "0 auto";
    divOfCanvas.appendChild(cnv);
}

function containsClass(element, name) {

    if (!element) {
        console.error('Contains class func: element with provided id not found');
        return undefined;
    }

    if (typeof name !== 'string') {
        console.error('Contains class func: parameter name must be of type string');
        return undefined;
    }

    return element.classList.contains(name);
}

function addClass(element, name) {

    if (!element) {
        console.error('Add class func: element with provided id not found');
        return undefined;
    }

    if (typeof name !== 'string') {
        console.error('Add class func: parameter name must be of type string');
        return undefined;
    }

    element.classList.add(name);
}

function removeClass(element, name) {

    if (!element) {
        console.error('Remove class func: element with provided id not found');
        return undefined;
    }

    if (typeof name !== 'string') {
        console.error('Remove class func: parameter name must be of type string');
        return undefined;
    }

    element.classList.remove(name);
}

function addOptionToList(list, option) {

    if (!list) {
        console.error('Add option to list: invalid list');
        return undefined;
    }

    let opt = document.createElement('option');
    opt.textContent = option;
    list.appendChild(opt);
}

function hideContainer(obj) {

    if (!obj) {
        console.error('Hide container func: parameter null or undefined');
        return undefined;
    }

    if (!containsClass(obj, 'ghost')) {
        addClass(obj, 'ghost');
    }
}

function revealContainer(obj) {

    if (!obj) {
        console.error('Reveal container func: parameter null or undefined');
        return undefined;
    }

    if (containsClass(obj, 'ghost')) {
        removeClass(obj, 'ghost');
    }
}

function getBaseUrl() {

    let urlChunks = window.location.href.split('/');

    let baseUrl = urlChunks
        .map((v, i) => { return (i == 0) ? v.concat('//') : v; })
        .splice(0, 3)
        .join('')
        .concat('/');

    return baseUrl;
}

function appendDataSetToForm(form, dataset, cols, setIdentifier, location, extension) {

    const rows = (dataset.length <= cols) ? 1 : Math.ceil(dataset.length / cols);

    for (let i = 0, setIndex = 1; i < rows; ++i) {
        let rowDiv = createContainer('div', 'row');
        for (let j = 0; j < cols; ++j) {
            if (dataset[setIndex]) {
                let colDiv = createContainer('div', 'col-lg-3');
                let img = createContainer('img', 'img-thumbnail');
                img.src = location.concat(setIdentifier) + setIndex + extension;
                colDiv.appendChild(img);
                rowDiv.appendChild(colDiv);
            }
            setIndex++;
        }
        form.appendChild(rowDiv);
    }
}

function createContainer(tagName, cssClass) {
    if (!tagName || !cssClass) {
        console.error('Create container: invalid parameters');
        return undefined;
    }
    let container = document.createElement(tagName);
    container.classList.add(cssClass);
    return container;
}

function scrollToBottom() {
    scroll(0, document.body.clientHeight);
}

function scrollToTop() {
    scroll(0, 0);
}

function removeAllChildren(element) {
    if (!element) {
        console.error('Remove all children: invalid parameter');
        return undefined;
    }
    element.querySelectorAll('*').forEach(c => c.remove());
}

function printLocalStorageSizeInfo() {
    let total = 0;
    for (let prop in localStorage) {
        if (!localStorage.hasOwnProperty(prop)) {
            continue;
        }
        let propLen = ((localStorage[prop].length + prop.length) * 2);
        total += propLen;
        console.log(prop.substr(0, 50), "=", (propLen / 1024).toFixed(2), "KB");
    }
    console.log("Total =", (total / 1024).toFixed(2), "KB");
}
