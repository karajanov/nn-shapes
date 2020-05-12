
const indexForm = document.getElementById('form_index');

if (indexForm) {

    //DOM Elements
    const divOfCanvas = document.getElementById('div_canvas');
    const clearBtn = document.getElementById('btn_clear');
    const guessBtn = document.getElementById('btn_guess');
    const trainBtn = document.getElementById('btn_train');
    const testBtn = document.getElementById('btn_test');
    const predictionLabel = document.getElementById('label_prediction');
    const progressBar = document.getElementById('progressbar_execution');
    const slider = document.getElementById('slider_train_net');
    const sliderLabel = document.getElementById('label_slider');
    const testLabel = document.getElementById('label_test');
    const testProgressBar = document.getElementById('progressbar_test');
    
    //Web Workers
    const dataRetriever = new Worker('./js/Workers/dataretriever.js');
    const dataSplitter = new Worker('./js/Workers/datasplitter.js');
    const pixelFilter = new Worker('./js/Workers/pixelfilter.js');
   
    //Utility
    const baseUrl = getBaseUrl();
    const trainingDataSize = 500;
    const testingDataSize = 1000;
    const imgRes = 784;
    const nn = new NeuralNetwork(nodes.i, nodes.h, nodes.o);
    const trainingDataArr = [];
    const testingDataArr = [];
   
    //Event handlers
    dataRetriever.addEventListener('message', event => {
        const retrievedData = event.data;
        if (retrievedData != null) {
            const arrSize = retrievedData[0].length;
            if (arrSize === trainingDataSize * imgRes) {
                trainingDataArr.push(retrievedData);
            } else {
                testingDataArr.push(retrievedData);
            }
        }
    });

    dataSplitter.addEventListener('message', event => {
        const allShapes = event.data;
        if (allShapes.length === trainingDataSize * nodes.o) {
            nn.train(slider.value, allShapes);
            alert('Training complete');
        } else {
            let testResult = nn.getTestResults(allShapes);
            let percentageValue = testResult / (testingDataSize * nodes.o);
            setProgressBarWidth(testProgressBar, percentageValue, true);
            let roundedPercentage = Math.round(percentageValue * 100);
            testLabel.textContent = 'Test Execution: ' + roundedPercentage + '%'; 
        }
    });

    pixelFilter.addEventListener('message', event => {
        const answer = event.data;
        if (answer === 'EMPTY') {
            alert('Drawing not created');
        } else {
            const normalizedInput = NeuralNetwork.normalize(answer, 255);
            const result = nn.getStructuredOutput(normalizedInput);
            const shapeId = getArgMax(result);
            setProgressBarWidth(progressBar, getMax(result), true);
            setPredictionLabel(predictionLabel, listOfShapes[shapeId], result[shapeId] * 100);
            console.log(result, listOfShapes[shapeId]);
        }
    });

    clearBtn.addEventListener('click', clearCanvas);

    guessBtn.addEventListener('click', () => {
        let drawing = get();
        postImagePixels(drawing, pixelFilter);
    });

    trainBtn.addEventListener('click', () => postUnprocessedData(trainingDataArr, dataSplitter));

    testBtn.addEventListener('click', () => postUnprocessedData(testingDataArr, dataSplitter));

    slider.addEventListener('click', () => {
        sliderLabel.textContent = 'Number of iterations: '.concat(slider.value);
    });

    function preload() {
        dataRetriever.postMessage([baseUrl, trainingDataSize]);
        dataRetriever.postMessage([baseUrl, testingDataSize]);
        testLabel.textContent = 'Test Execution: ' + testingDataSize * nodes.o + ' Samples';
    }

    //p5.js - executed once when the dom content is loaded
    function setup() {
        //p5.js - create a canvas with specific width and height
        const cnv = createCanvas(canvasRes.w, canvasRes.h);

        //p5.js - set the background color of the canvas (r, g ,b)
        background(bg.r, bg.g, bg.b);

        //centering the canvas
        setCanvasPosition(cnv.canvas, divOfCanvas);

        //p5.js - set the outline color of drawn objects (r, g, b)
        //if only one parameter is used then (r = g = b)
        stroke(strokeAttributes.colour);

        //p5.js - set the inner color of all drawn objects
        fill(bg.r, bg.g, bg.b);

        //p5.js - set the weight of the outline
        strokeWeight(strokeAttributes.weight);   
    }

    //p5.js - continuously executes until the program is stopped or noLoop() is called
    function draw() {
        //draw on the canvas
        paint();
    }

}

