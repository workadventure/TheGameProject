/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../utils'
import { canUser } from "./job";
import {PlayerMessage} from "@workadventure/iframe-api-typings";
import { sounds } from '../modules'

let findSecretPassageAction: PlayerMessage|null = null

type TilePosition = {
  x: number,
  y: number
}

type Tile = {
  x: number,
  y: number,
  layer: string,
  tile: string|null
}

const removeBlocksTiles = (zone: string, blockTilesToRemove: Array<TilePosition>|null = null) => {
  const mapWidth = WA.state.mapWidth as number
  const mapHeight = WA.state.mapHeight as number

  const tiles: Array<Tile> = []
  if (blockTilesToRemove) {
    for (let i = 1; i < blockTilesToRemove.length; i++) {
      tiles.push({
        x: blockTilesToRemove[i].x,
        y: blockTilesToRemove[i].y,
        tile: null,
        layer: `${zone}/block`
      })
    }
  } else {
    for (let i = 1; i < mapWidth; i++) {
      for (let j = 1; j < mapHeight; j++) {
        tiles.push({ x: i, y: j, tile: null, layer: `${zone}/block` });
      }
    }
  }
  WA.room.setTiles(tiles)
}

const initiateSecretPassages = (
  secretPassagesZones: Array<string> = ['secretPassageZone'],
  callbacks: Array<Function> |null = null,
  blockTilesToRemove: Array<Array<TilePosition>>|null = null
) => {
    // Show all secret passages tiles
    for (let i = 0; i < secretPassagesZones.length; i++) {
      // If the secret passage has been discovered before player arrive,
      // we must not show him the secret passage trace but we must show him what we found
      if (!WA.state[`${secretPassagesZones[i]}Discovered`]) {
        if (canUser('findSecretPassages')) {
          WA.room.showLayer(`${secretPassagesZones[i]}/trace`)

          WA.room.onEnterLayer(`${secretPassagesZones[i]}/trace`).subscribe(() => {
            if (!WA.state[`${secretPassagesZones[i]}Discovered`]) {
              findSecretPassageAction = WA.ui.displayPlayerMessage({
                message: utils.translations.translate('utils.executeAction', {
                  action: utils.translations.translate('modules.secretPassage.findSecretPassage')
                }),
                callback: () => {
                  WA.state[`${secretPassagesZones[i]}Discovered`] = true
                }
              })
            }
          })

          WA.room.onLeaveLayer(`${secretPassagesZones[i]}/trace`).subscribe(() => {
            findSecretPassageAction?.remove()
          })
        } else {
          WA.room.hideLayer(`${secretPassagesZones[i]}/trace`)
        }

        WA.state.onVariableChange(`${secretPassagesZones[i]}Discovered`).subscribe(() => {
          findSecretPassage(secretPassagesZones[i], callbacks ? callbacks[i] : null, blockTilesToRemove? blockTilesToRemove[i] : null)
        })
      } else {
        //This layer should already have been hidden but we hide in case map builder forgot
        WA.room.hideLayer(`${secretPassagesZones[i]}/trace`)

        WA.room.showLayer(`${secretPassagesZones[i]}/found`)
        WA.room.hideLayer(`${secretPassagesZones[i]}/disappear`)

        removeBlocksTiles(secretPassagesZones[i], blockTilesToRemove? blockTilesToRemove[i] : null)
      }
    }
}

const findSecretPassage = (secretPassageZone: string, callback: Function|null = null, blockTilesToRemove: Array<TilePosition>|null = null) => {
  WA.room.hideLayer(`${secretPassageZone}/trace`)
  WA.room.showLayer(`${secretPassageZone}/search`)

  setTimeout(() => {
    WA.room.showLayer(`${secretPassageZone}/found`)
    WA.room.hideLayer(`${secretPassageZone}/disappear`)
    removeBlocksTiles(secretPassageZone, blockTilesToRemove)

    setTimeout(() => {
      WA.room.hideLayer(`${secretPassageZone}/search`)
      sounds.playSound('successSound')
      if (callback) {
        callback()
      }
    }, 1000)
  }, 3000)
}

export {
  initiateSecretPassages,
  findSecretPassage,
  removeBlocksTiles
}