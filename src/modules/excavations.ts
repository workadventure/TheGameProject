/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../utils'
import { canUser } from "./job";
// @ts-ignore
import {PlayerMessage} from "@workadventure/iframe-api-typings";
import { sounds } from '../modules'

let makeExcavationAction: PlayerMessage|null = null

// initiateExcavationZones
const initiateExcavations = (excavationZones: Array<string> = ['excavationZone'], callbacks : Array<Function>|null = null) => {
    // Show all excavation tiles
    for (let i = 0; i < excavationZones.length; i++) {
      // If the excavation has been made before player arrive,
      // we must not show him the excavation trace but we must show him what we found
      if (!WA.state[`${excavationZones[i]}Discovered`]) {
        if (canUser('makeExcavation')) {
          WA.room.showLayer(`${excavationZones[i]}/trace`)

          WA.room.onEnterLayer(`${excavationZones[i]}/trace`).subscribe(() => {
            if (!WA.state[`${excavationZones[i]}Discovered`]) {
              // @ts-ignore
              makeExcavationAction = WA.ui.displayPlayerMessage({
                message: utils.translations.translate('utils.executeAction', {
                  action: utils.translations.translate('modules.excavation.makeExcavations')
                }),
                callback: () => {
                  WA.state[`${excavationZones[i]}Discovered`] = true
                }
              })
            }
          })

          WA.room.onLeaveLayer(`${excavationZones[i]}/trace`).subscribe(() => {
            makeExcavationAction?.remove()
          })
        } else {
          // These layers should already have been hidden from the map, but we hide them anyway (in case map builder forgot)
          WA.room.hideLayer(`${excavationZones[i]}/trace`)
          WA.room.hideLayer(`${excavationZones[i]}/search`)
          WA.room.hideLayer(`${excavationZones[i]}/found`)
        }

        WA.state.onVariableChange(`${excavationZones[i]}Discovered`).subscribe(() => {
          makeExcavations(excavationZones[i], callbacks ? callbacks[i] : null)
        })
      } else {
        // These layers should already have been hidden from the map, but we hide them anyway (in case map builder forgot)
        WA.room.hideLayer(`${excavationZones[i]}/trace`)
        WA.room.hideLayer(`${excavationZones[i]}/search`)

        WA.room.showLayer(`${excavationZones[i]}/found`)

        if (callbacks && callbacks[i]) {
          callbacks[i]()
        }
      }
    }
  }

// Make excavation
const makeExcavations = (excavationZone: string, callback: Function|null = null) => {
  WA.room.hideLayer(`${excavationZone}/trace`)
  WA.room.showLayer(`${excavationZone}/search`)

  setTimeout(() => {
    WA.room.showLayer(`${excavationZone}/found`)
    setTimeout(() => {
      WA.room.hideLayer(`${excavationZone}/search`)
      sounds.playSound('successSound')
      if (callback) {
        callback()
      }
    }, 1000)
  }, 3000)
}

export {
  initiateExcavations,
  makeExcavations
}