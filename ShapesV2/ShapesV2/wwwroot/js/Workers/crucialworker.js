if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/helperfunctions.js', '../NeuralNetwork/neuralnetwork.js');

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
                    spliceData(dataset[i][0], subsetSize, triangles, nodes.i);
                    break;
                case 'squares':
                    spliceData(dataset[i][0], subsetSize, squares, nodes.i);
                    break;
                case 'circles':
                    spliceData(dataset[i][0], subsetSize, circles, nodes.i);
                    break;
                case 'hexagons':
                    spliceData(dataset[i][0], subsetSize, hexagons, nodes.i);
                    break;
            }
        }
       
        let response = [circles, triangles, squares, hexagons].flat();
        postMessage(response);
    });
}