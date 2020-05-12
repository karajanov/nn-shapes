if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/helperfunctions.js',
         '../NeuralNetwork/matrix.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener('message', event => {

        const dataset = event.data;
        const subsetSize = dataset[0][0].length;

        let circles = [];
        let squares = [];
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
            }
        }

        let allShapes = [circles, triangles, squares].flat();
        rearrange(allShapes);
        postMessage(allShapes);
    });
}