/// <reference types="@workadventure/iframe-api-typings" />

import { onInit } from "../utils/init"

export type mapVariableType = Record<string, string|number|boolean> | boolean | number | string | null

let callbacks: Record<string, Function> = {}
let oldValue: Record<string, mapVariableType> = {}
let defaultValues: Record<string, mapVariableType> = {}

const initializeActionForAllPlayers = (id: string, callback: Function, defaultValue: mapVariableType = null) => {
  // Get current value of map action variable
  setTimeout(() => {
    let currentValue = JSON.parse(WA.state.mapActionVariables as string)

    if (!currentValue[id]) {
      oldValue[id] = defaultValue
      currentValue[id] = defaultValue
      WA.state.mapActionVariables = JSON.stringify(currentValue)
    } else if (currentValue[id] !== defaultValue) { // If action has already happened, then we do it at init
      callback(currentValue[id])
    }
    defaultValues[id] = defaultValue
    callbacks[id] = callback
  }, 11) // Timeout here because workadventure will put a time limit in the future
}
const allItemsHaveChanged = (idList: Array<string>) => {
  let currentValue = JSON.parse(WA.state.mapActionVariables as string)
  for (let i = 0; i < idList.length; i++) {
    if (!currentValue[idList[i]] || currentValue[idList[i]] === defaultValues[idList[i]]) {
      return false
    }
  }
  return true
}

// This action will be triggered if all action with idList as ids have been triggered
const initializeRelativeActionForAllPlayers = (id: string, idList: Array<string>, callback: Function) => {
  let currentValue = JSON.parse(WA.state.mapActionVariables as string)
  setTimeout(() => {
    if (!currentValue[id]) {
      oldValue[id] = false
      currentValue[id] = false
      WA.state.mapActionVariables = JSON.stringify(currentValue)
    } else { // If action has already happened, then we do it at init
      callback()
    }
    defaultValues[id] = false
    callbacks[id] = callback
  }, 11)

  WA.state.onVariableChange('mapActionVariables').subscribe(() => {
    currentValue = JSON.parse(WA.state.mapActionVariables as string)
    if (!currentValue[id] && allItemsHaveChanged(idList)) {
      currentValue[id] = true
      WA.state.mapActionVariables = JSON.stringify(currentValue)
    }
  })
}

const activateActionForAllPlayer = (id: string, value: mapVariableType = null, must_be_null: boolean = false) => {
  let currentValue = JSON.parse(WA.state.mapActionVariables as string)
  if (value === null) {
    currentValue[id] = must_be_null ? null : true
  } else {
    currentValue[id] = value
  }
  WA.state.mapActionVariables = JSON.stringify(currentValue)
}

onInit().then(() => {
  oldValue = WA.state.mapActionVariables != undefined ? JSON.parse(WA.state.mapActionVariables as string) : {};
  WA.state.onVariableChange('mapActionVariables').subscribe((value) => {
    let currentValue = JSON.parse(value as string)
    Object.keys(currentValue).forEach((key) => {
       if (oldValue[key] !== currentValue[key]) {
         if (currentValue[key] !== null) {
           callbacks[key](currentValue[key])
         } else {
           callbacks[key]()
         }
         oldValue[key] = currentValue[key]
       }
    })
  })
})

// Know if action has been triggered
const hasBeenTriggered = (id: string) => {
  let currentValue = JSON.parse(WA.state.mapActionVariables as string)
  if (currentValue[id] && currentValue[id] !== defaultValues[id]) {
    return true
  }
  return false
}

// Current value of action
const currentValue = (id: string) => {
  let currentValue = JSON.parse(WA.state.mapActionVariables as string)
  return currentValue[id]
}

export {
  initializeActionForAllPlayers,
  activateActionForAllPlayer,
  hasBeenTriggered,
  initializeRelativeActionForAllPlayers,
  currentValue
}