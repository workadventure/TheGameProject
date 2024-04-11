/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {ActionMessage} from "@workadventure/iframe-api-typings";
bootstrapExtra();

import * as utils from "./utils";
import { discussion } from './modules'
import {rootLink} from "./config";
import { onInit } from "./utils/init";

const shuffle: (array: Array<unknown>) => Array<unknown> = (array: Array<unknown>) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const hash = (message: string) => {
  return window.btoa(message)
}

const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

WA.onInit().then(() => {

  // Get Room id and redirect user to choice map
  const roomId = WA.room.id;
  WA.nav.goToRoom(roomId.replace('starter', 'choice'));
  return;

  WA.player.state.isInSelectionZone = false
  const starterSound = WA.sound.loadSound(`${rootLink}/sounds/starter.mp3`)
  let soundConfig = {
    volume: 0.1,
    loop: true,
    rate: 1,
    detune: 1,
    delay: 0,
    seek: 0,
    mute: false
  }

  starterSound.play(soundConfig)
  // Random launch
  const randomTeams = () => {
    WA.state.playersInSelectionZone = ''
    WA.state.randomDuos = null
    WA.state.askForRandomDuos = true

    let players: Array<string> = []
    WA.state.onVariableChange('playersInSelectionZone').subscribe((value) => {
      if (value) {
        console.info('NEW PLAYER', value)
        players.push(value as string)
      }
    })

    setTimeout( () => {
      let randomDuos: Record<string, string> = {}

      players = players.filter((str) => str !== '' && str.match(emailRegex))
      if (players.length % 2 === 0 && players.length > 0) {
        players = shuffle(players) as Array<string>

        for (let i = 0; i < players.length; i += 2) {
          const urlInstance = hash(players[i]) + '-' + hash(players[i+1])
          randomDuos[players[i]] = urlInstance
          randomDuos[players[i+1]] = urlInstance
        }

        WA.state.randomDuos = JSON.stringify(randomDuos)
      } else {
        // @ts-ignore
        WA.ui.banner.openBanner({
          id: "banner-players-not-even",
          text: utils.translations.translate('lobby.notValid'),
          bgColor: "#ff0000",
          textColor: "#ffffff",
          closable: true,
        })
      }

      WA.state.askForRandomDuos = false
    }, 1000)
  }

  // Random launch activation
  let randomMessage: ActionMessage | null = null
  WA.room.onEnterLayer('random_zone').subscribe(() => {
    randomMessage = WA.ui.displayActionMessage({
      message: utils.translations.translate('utils.executeAction', {
        action: utils.translations.translate('lobby.activateRandom')
      }),
      callback: () => {
        randomTeams()
      }
    })
  })

  WA.room.onLeaveLayer('random_zone').subscribe(() => {
    randomMessage?.remove()
    randomMessage = null
  })

  // On enter selection zone
  WA.room.onEnterLayer('selection_zone').subscribe(async () => {
    if (!(WA.player.uuid as string).match(emailRegex)) {
      WA.controls.disablePlayerControls()
      await WA.player.moveTo(5*32, 15*32)
      WA.controls.restorePlayerControls()
      discussion.openDiscussionWebsite('lobby.admin', 'lobby.connectToParticipate')
    } else {
      // Set variable to detect player is in selection zone
      WA.player.state.isInSelectionZone = true

      // Add collisions to prevent from going outside during random
      WA.room.setTiles([
        {
          x: 4,
          y: 14,
          tile: 'block',
          layer: 'collisions'
        },
        {
          x: 5,
          y: 14,
          tile: 'block',
          layer: 'collisions'
        },
        {
          x: 6,
          y: 14,
          tile: 'block',
          layer: 'collisions'
        }
      ])
    }
  })

  WA.state.onVariableChange('askForRandomDuos').subscribe((value) => {
    if (value) {
      if (WA.player.state.isInSelectionZone) {
        WA.state.playersInSelectionZone = WA.player.uuid
      }
    }
  })

  WA.state.onVariableChange('randomDuos').subscribe((value) => {
    if (value) {
      const randomDuos = JSON.parse(value as string)
      const urlInstance = randomDuos[WA.player.uuid as string]

      if (urlInstance) {
        starterSound.stop()
        WA.nav.goToPage(`http://play.workadventure.localhost/_/${urlInstance}/morganehuebra.github.io/WeasleyProject/maps/choice.tmj`)
      }
    }
  })

  // INFOS
  let infosMessage: ActionMessage | null = null
  WA.room.onEnterLayer('infos_zone').subscribe(() => {
    infosMessage = WA.ui.displayActionMessage({
      message: utils.translations.translate('utils.executeAction', {
        action: utils.translations.translate('lobby.displayInfos')
      }),
      callback: () => {
        discussion.openDiscussionWebsite('lobby.infoPanel', 'lobby.whatIsThat')
      }
    })
  })

  WA.room.onLeaveLayer('infos_zone').subscribe(() => {
    infosMessage?.remove()
    infosMessage = null
  })
})