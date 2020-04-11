if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../NeuralNetwork/matrix.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener("message", event => {
        
        let dataset = event.data;

        const nn = new NeuralNetwork(nodes.i, nodes.h, nodes.o);
        let desiredArr = null;

        for (let i = 0; i < 1; ++i) {

            dataset.forEach(subset => {

                let normalizedPixels = NeuralNetwork.normalize(subset[0], 255.0);

                //C, S, E, T, R
                 desiredArr = [1, 0, 0, 0, 0];

                if (subset[1].startsWith('s')) {
                    desiredArr = [0, 1, 0, 0, 0];
                } else if (subset[1].startsWith('e')) {
                    desiredArr = [0, 0, 1, 0, 0];
                } else if (subset[1].startsWith('t')) {
                    desiredArr = [0, 0, 0, 1, 0];
                } else if (subset[1].startsWith('r')) {
                    desiredArr = [0, 0, 0, 0, 1];
                }

                nn.feedforward(normalizedPixels, desiredArr);
            });
        }

        let response = nn;
        postMessage(response);
    });
}