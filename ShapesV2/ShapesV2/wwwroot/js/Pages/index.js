
const indexForm = document.getElementById('form_index');

if (indexForm) {

    const divOfCanvas = document.getElementById('div_canvas');
    const clearBtn = document.getElementById('btn_clear');
    const guessBtn = document.getElementById('btn_guess');
    const trainBtn = document.getElementById('btn_train');
    const testBtn = document.getElementById('btn_test');
    const predictionInput = document.getElementById('input_prediction');

    const worker = new Worker('./js/Workers/indexworker.js');
    const trainingWorker = new Worker('./js/Workers/trainingworker.js');
    const crucialWorker = new Worker('./js/Workers/crucialworker.js');
    const dataArr = [];

    const nn = new NeuralNetwork(nodes.i, nodes.h, nodes.o);

    trainingWorker.addEventListener('message', event => {
        dataArr.push(event.data);
    });

    crucialWorker.addEventListener('message', event => {
        const allShapes = event.data;
        console.log(allShapes);
        //nn.train(1, allShapes);
        //alert('Training complete');
    });

    worker.addEventListener('message', event => {
        const answer = event.data;
        console.log(answer);
        //const normalizedInput = NeuralNetwork.normalize(answer, 255);
        //const result = nn.getStructuredOutput(normalizedInput);
        //const shapeId = result.indexOf(Math.max(...result));
        //console.log(result, listOfShapes[shapeId]);
    });

    clearBtn.addEventListener('click', clearCanvas);

    trainBtn.addEventListener('click', () => {
        if (dataArr.length === nodes.o) {
            if (dataArr.includes(null)) {
                alert('Data wasn\'t loaded successfully');
            } else {
                crucialWorker.postMessage(dataArr);
            }
        } else {
            alert('Loading data, please wait.');
        }  
    });

    guessBtn.addEventListener('click', () => {
        let drawing = get();
        postImagePixels(drawing, worker);
    });

    testBtn.addEventListener('click', () => {

        getData(getBaseUrl() + 'datasets/circles400.bin')
            .then(r => {
                let x = Array.from(new Uint8Array(r));
                let counter = 0;
                for (let i = 0; i < 100 * 784; i += 784) {
                    let a = x.splice(0, 784);
                    let n = NeuralNetwork.normalize(a, 255);
                    let m = nn.getStructuredOutput(n);
                    if (m.indexOf(Math.max(...m)) === 2) {
                        counter++;
                    }
                }
                console.log(counter);
            })
            .catch(e => console.error(e));
    });

    function preload() {
        trainingWorker.postMessage(getBaseUrl());
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

