if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/asyncfunctions.js');

    addEventListener('message', event => {

        const baseUrl = event.data;

        for (let i = 0; i < listOfShapes.length; ++i) {
            getData(baseUrl + 'datasets/' + listOfShapes[i] + '2000.bin')
                .then(r => postMessage([new Uint8Array(r), listOfShapes[i]]))
                .catch(err => postMessage(err));
        }

    });
}