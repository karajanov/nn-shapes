
const trainingForm = document.getElementById('form_training');

if (trainingForm) {

    const slider = document.getElementById('slider_train_net');
    const sliderLabel = document.getElementById('label_slider');
    const progressBar = document.getElementById('progressbar_execution');
    const trainBtn = document.getElementById('btn_train');
    const testBtn = document.getElementById('btn_test');
    const trainingWorker = new Worker('../js/Workers/trainingworker.js');
    const crucialWorker = new Worker('../js/Workers/crucialworker.js');
    const imgArr = [];

    trainingWorker.addEventListener('message', event => {
        imgArr.push(event.data);
    });

    crucialWorker.addEventListener('message', event => {
        let answer = event.data;
        console.log(answer);
    });

    trainBtn.addEventListener('click', () => {
        if (imgArr.length < 4) {
            alert('Loading Data. Please Wait.');
        } else {
            crucialWorker.postMessage(imgArr);
        }
    });

    slider.addEventListener('click', () => {
        sliderLabel.textContent = 'Number of iterations: '.concat(slider.value);
    });

    function preload() {
        trainingWorker.postMessage(getBaseUrl());
    }

    function setup() {
       // createCanvas(canvasRes.w, canvasRes.h);
    }

    function draw() {

    }
}