if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/asyncfunctions.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener('message', event => {
        const pixelsArr = Array.from(event.data);
        const allNonBackgroundPixels = pixelsArr.filter((v, i) => (i % 4 == 0) && (v != 0));
        if (allNonBackgroundPixels.length == 0) {
            postMessage('EMPTY');
        } else {
            const filteredPixels = pixelsArr.filter((_, i) => i % 4 == 0);
            postMessage(filteredPixels);
        }
    });
}