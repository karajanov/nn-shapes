if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/asyncfunctions.js', '../NeuralNetwork/neuralnetwork.js');

    addEventListener('message', event => {

        const baseUrl = event.data;
        
        
    });
}