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

function addOptionToList(list, option) {

    if (!list) {
        console.error('Add option to list: invalid list');
        return undefined;
    }

    let opt = document.createElement('option');
    opt.textContent = option;
    list.appendChild(opt);
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

function spliceData(dataset, totalSize, outputset, offset, label) {
    let convertedset = Array.from(dataset);
    for (let i = 0; i < totalSize; i += offset) {
        let subset = convertedset.splice(0, offset);
        subset.label = label;
        outputset.push(subset);
    }
}

function rearrange(arr) {
    for (let i = arr.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * i);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

function postImagePixels(drawing, worker) {
    drawing.resize(28, 28);
    drawing.loadPixels();
    let pixelsArr = drawing.pixels;
    worker.postMessage(pixelsArr);
}

function getMax(arr) {
    return Math.max(...arr);
}

function getArgMax(arr) {
    return arr.indexOf(getMax(arr));
}

function setProgressBarWidth(progressbar, v, isNorm = false) {
    let r = isNorm ? (v * 100) : v;
    progressbar.style.width = String(r).concat('%');
}

function setPredictionLabel(lbl, shape, percentage) {
    lbl.textContent = shape + ' ' + Math.floor(percentage) + ' %';
}

function displayImages(data, imgW, imgH, perRow) {
    const imgRes = imgW * imgH;
    const size = data.length / imgRes;
    for (let n = 0; n < size; ++n) {
        let img = createImage(imgW, imgH);
        let offset = n * imgRes;
        img.loadPixels();
        for (let i = 0; i < imgRes; ++i) {
            let val = data[i + offset];
            //red
            img.pixels[i * 4 + 0] = val;
            //green
            img.pixels[i * 4 + 1] = val;
            //blue
            img.pixels[i * 4 + 2] = val;
            //alpha (transparency)
            img.pixels[i * 4 + 3] = 255;
        }
        img.updatePixels();
        let x = (n % perRow) * imgW;
        let y = Math.floor(n / perRow) * imgH;
        image(img, x, y);
    }
}