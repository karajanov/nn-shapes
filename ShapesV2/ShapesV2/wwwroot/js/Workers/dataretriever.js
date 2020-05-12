if ('function' === typeof (importScripts)) {

    importScripts
        ('../Common/sharedobjects.js', '../Common/asyncfunctions.js');

    addEventListener('message', event => {

        const [baseUrl, dataSize] = event.data;

        getData(baseUrl + 'datasets/triangles' + dataSize + '.bin')
            .then(r => {
                let content = (r.byteLength === 0) ? null : [new Uint8Array(r), 'triangles'];
                postMessage(content);
            })
            .catch(_ => postMessage(null));

        getData(baseUrl + 'datasets/squares' + dataSize + '.bin')
            .then(r => {
                let content = (r.byteLength === 0) ? null : [new Uint8Array(r), 'squares'];
                postMessage(content);
            })
            .catch(_ => postMessage(null));

        getData(baseUrl + 'datasets/circles' + dataSize + '.bin')
            .then(r => {
                let content = (r.byteLength === 0) ? null : [new Uint8Array(r), 'circles'];
                postMessage(content);
            })
            .catch(_ => postMessage(null));

    });
}