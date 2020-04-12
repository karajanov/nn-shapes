async function getData(location) {
    const response = await fetch(location);
    const promise = await response.arrayBuffer();
    return promise;
}