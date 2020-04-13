if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/asyncfunctions.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener('message', event => {

        const pixelsArr = Array.from(event.data);

        const filteredPixels = pixelsArr.filter((_, i) => i % 4 == 0);

        postMessage(filteredPixels);

    });
}