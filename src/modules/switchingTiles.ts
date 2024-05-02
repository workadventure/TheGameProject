/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../utils'
import {PlayerMessage} from "@workadventure/iframe-api-typings";
import { sounds } from '../modules'

let switchTileAction: PlayerMessage|null = null

const initiateSwitchingTiles = (switchingTiles: Array<string> = ['switchingTiles'], victoryCallBacks: Array<Function> = []) => {
  for (let i = 0; i < switchingTiles.length; i++) {
    setSwitchingTile(switchingTiles[i], victoryCallBacks[i] ?? null)
  }
}

const setSwitchingTile = (switchingTile: string, victoryCallback: Function|null = null, isAction: boolean = false, PlayerMessage:string = '') => {
  const victoryCondition = JSON.parse(WA.state[`${switchingTile}VictoryCondition`] as string)
  const tilesNumber = WA.state[`${switchingTile}TilesNumber`] as number

  if (WA.state[`${switchingTile}IsVictory`]) {
    if (victoryCallback) {
      victoryCallback()
    }
  } else {
    for (let j = 0; j < Object.keys(victoryCondition).length; j++) {
      // Set tile to current state
      switchTile(switchingTile, j)

      // When user enter a layer manage to change tile if not victory
      WA.room.onEnterLayer(`${switchingTile}/${j}_layer/zone`).subscribe(() => {
        if (!WA.state[`${switchingTile}IsVictory`]) {
          if (!isAction) {
            makeTileSwitch(switchingTile, j, tilesNumber, victoryCondition)
          } else {
            setTimeout(() => {
              switchTileAction = WA.ui.displayPlayerMessage({
                message: utils.translations.translate('utils.executeAction', {
                  action: utils.translations.translate(PlayerMessage)
                }),
                callback: () => {
                  makeTileSwitch(switchingTile, j, tilesNumber, victoryCondition)
                }
              })
            }, 100) // Note : this delay is important if the zones are stuck
          }
        }
      })

      if (isAction) {
        WA.room.onLeaveLayer(`${switchingTile}/${j}_layer/zone`).subscribe(() => {
          setTimeout(() => {
            switchTileAction?.remove()
          }, 100) // HERE time out too because if walk on another between both are displayed
        })
      }

      // Change tiles for every user
      WA.state.onVariableChange(`${switchingTile}_${j}_value`).subscribe(() => {
        switchTile(switchingTile, j)
      })
    }
  }

  // Detect victory
  WA.state.onVariableChange(`${switchingTile}IsVictory`).subscribe((value) => {
    if (value && victoryCallback) {
      victoryCallback()
    }
  })
}

const testVictory = (switchingTilesName: string, victoryConditions: Record<string, number>) => {
  for (let i = 0; i < Object.keys(victoryConditions).length; i++ ) {
    if (WA.state[`${switchingTilesName}_${i}_value`] != victoryConditions[i]) {
      return false
    }
  }
  return true
}

const makeTileSwitch = (switchingTile: string, layerNumber: number, tilesNumber: number, victoryCondition: Record<string, number>) => {
  let newValue: number = WA.state[`${switchingTile}_${layerNumber}_value`] ? WA.state[`${switchingTile}_${layerNumber}_value`] as number : 0
  WA.state[`${switchingTile}_${layerNumber}_value`] = (newValue + 1) %  tilesNumber

  // Test if victory condition is fulfilled
  if (testVictory(switchingTile, victoryCondition)) {
    // PLays victory sound
    sounds.playSound('successSound')
    // set victory variable so that every user knows
    WA.state[`${switchingTile}IsVictory`] = true
  }
}

const switchTile = (group: string, layer: number) => {
  WA.room.hideLayer(`${group}/${layer}_layer`)
  WA.room.showLayer(`${group}/${layer}_layer/${WA.state[`${group}_${layer}_value`]}`)

  for (let i = 1; i < 4; i++) {
    WA.room.hideLayer(`${group}/${layer}_layer_${i}`)
    WA.room.showLayer(`${group}/${layer}_layer_${i}/${WA.state[`${group}_${layer}_value`]}`)
  }
}

export {
  initiateSwitchingTiles,
  setSwitchingTile
}