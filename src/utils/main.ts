const wait = (time: number | undefined) => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

const selectRandomItemInArray = (array: Array<unknown>) => {
    const random = Math.floor(Math.random() * array.length)
    return array[random]
}

export {
    wait,
    selectRandomItemInArray
}