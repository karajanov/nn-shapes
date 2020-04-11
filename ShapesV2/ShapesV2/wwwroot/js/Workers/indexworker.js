if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../NeuralNetwork/matrix.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener("message", event => {

        const baseUrl = event.data;
        //const pixelsArr = Array.from(event.data);

        //const filteredPixels = pixelsArr.filter(v => (v !== bg.r && v !== bg.g && v !== bg.b && v !== bg.a));

        //if (filteredPixels.length === 0) {
        //    postMessage('undetermined');
        //} else {
        //    const response = pixelsArr.filter((_, i) => (i + 1) % 4 !== 0);
        //    postMessage(response);
        //}

        fetch(baseUrl.concat('circles1000.bin'))
            .then(r => r.arrayBuffer())
            .then(r => postMessage(new Uint8Array(r)))
            .catch(err => postMessage(err));

        
    });
}