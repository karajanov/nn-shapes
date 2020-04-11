
const trainingForm = document.getElementById('form_training');

if (trainingForm) {

    const storageList = document.getElementById('select_storage');
    const slider = document.getElementById('slider_train_net');
    const sliderLabel = document.getElementById('label_slider');
    const progressBar = document.getElementById('progressbar_execution');
    const trainBtn = document.getElementById('btn_train');
    const testBtn = document.getElementById('btn_test');
    const worker = new Worker('../js/Workers/trainingworker.js');
    const crucialWorker = new Worker('../js/Workers/crucialworker.js');
    const baseUrl = getBaseUrl();
    const imgLocation = baseUrl.concat('datasets/');
    const imgArr = [];

    worker.addEventListener('message', event => {
        imgArr.push(event.data);
    });

    crucialWorker.addEventListener('message', event => {
        let answer = event.data;
        NeuralNetwork.updateGlobalNetwork('brain', answer);
        alert('DONE');
    });

    slider.addEventListener('click', () => {
        sliderLabel.textContent = 'Number of iterations: '.concat(slider.value);
    });

    trainBtn.addEventListener('click', () => {
        if (imgArr.length < 1500) {
            alert('Data is still being loaded. Please wait.');
        } else {
            alert('G2G');
            crucialWorker.postMessage(imgArr);
        }
    });

    function preload() {

        getAllImageTitles(baseUrl.concat('api/ImageData/Title/All?shuffled='), true)
            .then(result => {

                result.forEach(v => {

                    let shapeDir = 'ellipses/';

                    if (v.startsWith('t')) {
                        shapeDir = 'triangles/';
                    } else if (v.startsWith('s')) {
                        shapeDir = 'squares/';
                    } else if (v.startsWith('c')) {
                        shapeDir = 'circles/';
                    } else if (v.startsWith('r')) {
                        shapeDir = 'rectangles/';
                    }

                    let img = loadImage(imgLocation.concat(shapeDir).concat(v),
                        () => {
                            img.resize(canvasRes.w / 10, canvasRes.h / 10);
                            img.loadPixels();
                            let msg = [img.pixels, v];
                            worker.postMessage(msg);
                        },
                        () => console.error('An error occured while loading the image'));

                });

            })
            .catch(err => console.error(err));
    }

    function setup() {
        createCanvas(canvasRes.w, canvasRes.h);
    }

    function draw() {

    }
}