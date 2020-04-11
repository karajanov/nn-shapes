if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../NeuralNetwork/matrix.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener("message", event => {

        let [pixelsArr, label] = event.data;

        const filteredPixels = Array.from(pixelsArr)
            .filter((_, i) => (i + 1) % 4 !== 0)
            .map(v => (v == 201 || v == 191) ? (v - 1 ) : v);

        let response = [filteredPixels, label];

        postMessage(response);
    });
}