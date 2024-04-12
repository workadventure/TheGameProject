const wait = (time: number | undefined) => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

const selectRandomItemInArray = (array: Array<unknown>) => {
    const random = Math.floor(Math.random() * array.length)
    return array[random]
}

const myGameName = () : string => {
    return WA.room.id.split('/')[4];
};

export {
    wait,
    selectRandomItemInArray,
    myGameName
}