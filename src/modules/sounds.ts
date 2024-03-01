/// <reference types="@workadventure/iframe-api-typings" />

import {rootLink} from "../config";
import { actionForAllPlayers } from '../modules'

type soundType = {
  name: string,
  path: string
}

const sounds: Record<string, any> = {
  successSound: WA.sound.loadSound(`${rootLink}/sounds/success.mp3`),
  failureSound: WA.sound.loadSound(`${rootLink}/sounds/failure.mp3`),
}

const soundConfig = {
  volume: 1,
  loop: false,
  rate: 1,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false
}

// initiate player inventory (reset all items)
const initiateSounds = (soundList: Array<soundType> = [], soundsPath: string = `${rootLink}/sounds/`) => {
  for (let i = 0; i < soundList.length; i++) {
    sounds[soundList[i].name] = WA.sound.loadSound(`${soundsPath}${soundList[i].path}`)
  }

  actionForAllPlayers.initializeActionForAllPlayers('playSoundForAllPlayers', (name: string | null) => {
    if (name !== undefined && name !== null) {
      sounds[name].play(soundConfig);
    }
  })
}

const playSound = (name: string) => {
  sounds[name].play(soundConfig);
}

const playSoundForAll = (name: string) => {
  actionForAllPlayers.activateActionForAllPlayer('playSoundForAllPlayers', name)
  setTimeout(()=> {
    actionForAllPlayers.activateActionForAllPlayer('playSoundForAllPlayers', null, true)
  }, 500)
}

export {
  initiateSounds,
  playSound,
  playSoundForAll
}