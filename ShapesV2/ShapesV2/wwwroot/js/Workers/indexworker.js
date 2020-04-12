if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/asyncfunctions.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener('message', event => {

        const baseUrl = event.data;
        //const pixelsArr = Array.from(event.data);

        //const filteredPixels = pixelsArr.filter(v => (v !== bg.r && v !== bg.g && v !== bg.b && v !== bg.a));

        //if (filteredPixels.length === 0) {
        //    postMessage('undetermined');
        //} else {
        //    const response = pixelsArr.filter((_, i) => (i + 1) % 4 !== 0);
        //    postMessage(response);
        //}

        
    });
}