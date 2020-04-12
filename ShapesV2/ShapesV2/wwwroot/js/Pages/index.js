
const indexForm = document.getElementById('form_index');

if (indexForm) {

    const divOfCanvas = document.getElementById('div_canvas');
    const clearBtn = document.getElementById('btn_clear');
    const guessBtn = document.getElementById('btn_guess');
    const predictionInput = document.getElementById('input_prediction');
    const worker = new Worker('./js/Workers/indexworker.js');
    const dataArr = [];
  //  NeuralNetwork.createGlobalNetwork('brain', nodes.i, nodes.h, nodes.o);
  //  const predictor = NeuralNetwork.getGlobalNetwork('brain');

    worker.addEventListener('message', event => {
        const answer = event.data;
        dataArr.push(answer);
   

        //for (let n = 0; n < total; ++n) {
        //    let img = createImage(28, 28);
        //    let offset = n * 784;
        //    img.loadPixels();
        //    for (let i = 0; i < 784; ++i) {
        //        let val = 255 - answer[i + offset];
        //        img.pixels[i * 4 + 0] = val;
        //        img.pixels[i * 4 + 1] = val;
        //        img.pixels[i * 4 + 2] = val;
        //        img.pixels[i * 4 + 3] = 255;
        //    }
        //    img.updatePixels();
        //    let x = (n % 10) * 28;
        //    let y = floor(n / 10) * 28;
        //    image(img, x, y);
        //}
        //if (answer === 'undetermined') {
        //    predictionInput.value = 'Undetermined';
        //} else {         
        //    const normalizedInput = NeuralNetwork.normalize(answer, 255.0);
        //    const result = predictor.getStructuredOutput(normalizedInput);
        //    const shapeId = result.indexOf(Math.max(...result)) + 1;
        //    console.log(result);
        //    getShapeById(getBaseUrl().concat('api/Shape/'), shapeId)
        //        .then(r => {
        //            predictionInput.value = r;
        //            console.log(r);
        //        })
        //        .catch(err => console.error(err));
        //}
    });

    clearBtn.addEventListener('click', clearCanvas);

    guessBtn.addEventListener('click', () => {

        //let drawing = get();

        //drawing.resize(24, 16);

        
        //save(drawing, 'test.jpg');

        //drawing.loadPixels();

        //console.log(drawing.pixels.length);

        //let pixelsArr = drawing.pixels;

        //worker.postMessage(pixelsArr);
        console.log(dataArr);
    });

    function preload() {

        worker.postMessage(getBaseUrl());


    }
    //p5.js - executed once when the dom content is loaded
    function setup() {

        //p5.js - create a canvas with specific width and height
        const cnv = createCanvas(500, 350);

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
       // strokeWeight(strokeAttributes.weight);
        strokeWeight(18.8);
    }

    //p5.js - continuously executes until the program is stopped or noLoop() is called
    function draw() {

        //draw on the canvas
        paint();
    }

}

