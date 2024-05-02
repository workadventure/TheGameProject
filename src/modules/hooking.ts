/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../utils'
import { canUser } from "./job";
import {PlayerMessage} from "@workadventure/iframe-api-typings";
import { sounds } from '../modules'

let makeHookingAction: PlayerMessage|null = null

// initiateExcavationZones
const setHooking = (hookingZone: string, callback: Function|null = null) => {
  // If the hooking has been made before player arrive,
  // we must not show him the hooking trace but we must show him what we found
  if (!WA.state[`${hookingZone}Discovered`]) {
    if (canUser('makeHooking')) {
      WA.room.showLayer(`${hookingZone}/trace`) // Show the trace for users whom are abble to hook lock

      // When user enters the trace
      WA.room.onEnterLayer(`${hookingZone}/trace`).subscribe(() => {
        if (!WA.state[`${hookingZone}Discovered`]) {

          // Shoow hooking message
          makeHookingAction = WA.ui.displayPlayerMessage({
            message: utils.translations.translate('utils.executeAction', {
              action: utils.translations.translate('modules.hooking.hook') // TODO : translation in files
            }),
            callback: () => {
              WA.state[`${hookingZone}Discovered`] = true
            }
          })
        }
      })

      // When user leave the trace
      WA.room.onLeaveLayer(`${hookingZone}/trace`).subscribe(() => {
        makeHookingAction?.remove()
      })
    } else {
      // These layers should already have been hidden from the map, but we hide them anyway (in case map builder forgot)
      WA.room.hideLayer(`${hookingZone}/trace`)
      WA.room.hideLayer(`${hookingZone}/search`)
      WA.room.hideLayer(`${hookingZone}/found`)

      WA.room.showLayer(`${hookingZone}/disappear`)
    }

    // Hooking action triggered
    WA.state.onVariableChange(`${hookingZone}Discovered`).subscribe(() => {
      makeHooking(hookingZone, callback)
    })

  } else { // If has already been hooked
    // These layers should already have been hidden from the map, but we hide them anyway (in case map builder forgot)
    WA.room.hideLayer(`${hookingZone}/trace`)
    WA.room.hideLayer(`${hookingZone}/search`)
    WA.room.hideLayer(`${hookingZone}/disappear`)

    WA.room.showLayer(`${hookingZone}/found`)

    if (callback) {
      callback()
    }
  }
}

// Hooking action (for all users)
const makeHooking = (hookingZone: string, callback: Function|null = null) => {
  WA.room.hideLayer(`${hookingZone}/trace`)
  WA.room.showLayer(`${hookingZone}/search`)

  setTimeout(() => {
    WA.room.showLayer(`${hookingZone}/found`)
    WA.room.hideLayer(`${hookingZone}/disappear`)
    setTimeout(() => {
      WA.room.hideLayer(`${hookingZone}/search`)
      sounds.playSound('successSound')
      if (callback) {
        callback()
      }
    }, 1000)
  }, 3000)
}

export {
  setHooking,
  makeHooking
}