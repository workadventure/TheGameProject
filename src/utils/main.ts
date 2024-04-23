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

const myPlayerId = () : string => {
    if(!WA.player.uuid) throw new Error('Player UUID not found');
    return window.btoa(WA.player.uuid);
};

export {
    wait,
    selectRandomItemInArray,
    myGameName,
    myPlayerId
}