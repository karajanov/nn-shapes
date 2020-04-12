if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/helperfunctions.js',
         '../NeuralNetwork/matrix.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener('message', event => {

        const dataset = event.data;
        const subsetSize = dataset[0][0].length;

        let circles = [];
        let squares = [];
        let hexagons = [];
        let triangles = [];

        for (let i = 0; i < dataset.length; ++i) {
            switch (dataset[i][1]) {
                case 'triangles':
                    spliceData(dataset[i][0], subsetSize, triangles, nodes.i, 'triangle');
                    break;
                case 'squares':
                    spliceData(dataset[i][0], subsetSize, squares, nodes.i, 'square');
                    break;
                case 'circles':
                    spliceData(dataset[i][0], subsetSize, circles, nodes.i, 'circle');
                    break;
                case 'hexagons':
                    spliceData(dataset[i][0], subsetSize, hexagons, nodes.i, 'hexagon');
                    break;
            }
        }

        let allShapes = [circles, triangles, squares, hexagons].flat();
        rearrange(allShapes);

        //t, s, c, h
        const nn = new NeuralNetwork(nodes.i, nodes.h, nodes.o);

        for (let i = 0; i < 60; ++i) {
            for (let j = 0; j < allShapes; ++j) {
                let desiredArr = null;
                switch (allShapes[j].label) {
                    case 'triangle':
                        desiredArr = [1, 0, 0, 0];
                        break;
                    case 'square':
                        desiredArr = [0, 1, 0, 0];
                        break;
                    case 'circle':
                        desiredArr = [0, 0, 1, 0];
                        break;
                    case 'hexagon':
                        desiredArr = [0, 0, 0, 1];
                        break;
                }
                let normalizedInput = NeuralNetwork.normalize(allShapes[j], 255.0);
                nn.feedforward(normalizedInput, desiredArr);
            }
        }

        let response = nn;
        postMessage(response);
    });
}