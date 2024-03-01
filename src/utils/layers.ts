import { wait } from "./main";

const toggleLayersVisibility = (layers: any, visible = true) => {
    if (typeof layers === 'string') {
        if (visible) {
            WA.room.showLayer(layers)
        } else {
            WA.room.hideLayer(layers)
        }
    } else {
        if (visible) {
            for (let i=0; i<layers.length; i++) {
                WA.room.showLayer(layers[i])
            }
        } else {
            for (let i=0; i<layers.length; i++) {
                WA.room.hideLayer(layers[i])
            }
        }
    }
}

const triggerAnimationWithLayers = async (layers: any, time=300) => {
    toggleLayersVisibility(layers[0])
    for (let i = 1; i<layers.length; i++) {
        await wait(time)
        toggleLayersVisibility(layers[i-1], false)
        toggleLayersVisibility(layers[i])
    }
    toggleLayersVisibility(layers[layers.length-1], false)
    return true
}

const getTileCoordinate = (x: number, y: number)=> {
    console.log('GET TILE COORDINATE', x, y)
    return {
        x: Math.floor(x/32),
        y: Math.floor(y/32),
    }
}

const getPlayerPositionTileCoordinate = async () => {
    const playerPosition = await WA.player.getPosition()
    return getTileCoordinate(playerPosition.x, playerPosition.y)
}

const replaceTileAnimation = async (x: number, y: number, tiles: any, layer: any, time= 300) => {
    WA.room.setTiles([
        {
            x: x,
            y: y,
            tile: tiles[0],
            layer: layer
        },
    ]);

    for (let i = 1; i < tiles.length; i++) {
        await wait(time)
        WA.room.setTiles([
            {
                x: x,
                y: y,
                tile: tiles[i],
                layer: layer
            },
        ]);
    }
}


export {
    toggleLayersVisibility,
    triggerAnimationWithLayers,
    getTileCoordinate,
    getPlayerPositionTileCoordinate,
    replaceTileAnimation
}