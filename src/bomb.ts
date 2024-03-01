import {ActionMessage, UIWebsite} from "@workadventure/iframe-api-typings";
import {rootLink} from "./config";
import {initiateJob, getPlayerJob, setPlayerJob, Job} from "./modules/job";
import { actionForAllPlayers, discussion, notifications, secretPassages, sounds, workadventureFeatures } from './modules'
import * as utils from './utils'
import {env} from "./config"
import { onInit } from "./utils/init";

let bombWebsite:UIWebsite|null = null
let cheatSheetWebsite:UIWebsite|null = null

const resetCamera = async () => {
  const playerPosition = await WA.player.getPosition()
  WA.camera.set(
    playerPosition.x,
    playerPosition.y,
    100,
    100,
  )
}

onInit().then(async () => {

  // Reset camera Zoom
  WA.camera.followPlayer(true)
  WA.camera.set(665, 838)

  // Initiate jobs
  await initiateJob()

  // Hide pricing button
  workadventureFeatures.hidePricingButton()

  // Initialize sounds
  sounds.initiateSounds([
    {
      name: 'evilGuySound',
      path: 'evilGuy.mp3'
    }
  ])

  const bombSound = WA.sound.loadSound(`${rootLink}/sounds/bomb.mp3`)
  bombSound.play({
    volume: 0.3,
    loop: true,
    rate: 1,
    detune: 1,
    delay: 0,
    seek: 0,
    mute: false
  })

  // Reset zoom
  resetCamera()

  // FOR DEVELOPMENT PURPOSE ONLY
  if(env === 'dev'){
    setPlayerJob(Job.spy)
  }

  // Speech at arriving
  discussion.openDiscussionWebsite(
    utils.translations.translate('utils.mySelf'),
    utils.translations.translate(`bomb.story.${getPlayerJob()}`),
    'views.choice.close',
    "discussion",
    () => {
      if (!actionForAllPlayers.hasBeenTriggered('freeSpy')) {
        if (getPlayerJob() === 'spy') {
          // Is blocked under a rock
          WA.controls.disablePlayerControls()
          WA.player.setOutlineColor(255, 0, 0)
        }
      } else {
        utils.layers.toggleLayersVisibility('rock', false)
        WA.room.setTiles([
          {x: 15, y: 7, tile: null, layer: 'rockCollisions'},
          {x: 15, y: 8, tile: null, layer: 'rockCollisions'},
        ]);
      }
    }
  )


    WA.player.state.askForDefuseBomb = false
    WA.player.state.askForBoom = false

    // secret passages initialisation
    secretPassages.initiateSecretPassages(
      ['secretPassage'],
      [() => {console.log('secret passage discovered !')}
      ])

  // FREE SPY ACTION
  actionForAllPlayers.initializeActionForAllPlayers('freeSpy', () => {
    // Remove rock layers and collisions
    utils.layers.toggleLayersVisibility('rock', false)
    WA.room.setTiles([
      {x: 15, y: 7, tile: null, layer: 'rockCollisions'},
      {x: 15, y: 8, tile: null, layer: 'rockCollisions'},
    ]);

    if (getPlayerJob() === 'spy') {
      WA.player.removeOutlineColor()
      WA.controls.restorePlayerControls()
    }
  })

  // BOMB EXPLODES ACTION
  actionForAllPlayers.initializeActionForAllPlayers('boom', () => {
      // Play evil guy sound
      bombSound.stop()
      WA.ui.actionBar.removeButton('cheatSheetButton');
      sounds.playSound('evilGuySound');
      discussion.openDiscussionWebsite(
        utils.translations.translate('bomb.bomb.failure.name'),
        utils.translations.translate('bomb.bomb.failure.message'),
        'views.choice.close',
        "discussion",
        () => {
          if (getPlayerJob() === 'spy') {
            // Is blocked under a rock
            WA.controls.disablePlayerControls()
          }
        }
      )
    })

  // DEFUSE BOMB ACTION
  actionForAllPlayers.initializeActionForAllPlayers('defuseBomb', () => {
    // Hide bomb layer
    utils.layers.toggleLayersVisibility('bomb', false)

    closeBombWebsite()

    // Success sound
    bombSound.stop()
    WA.ui.actionBar.removeButton('cheatSheetButton');
    sounds.playSound('successSound')
    notifications.notify(
      utils.translations.translate('bomb.bomb.success'),
      utils.translations.translate('utils.success'),
      'success'
    )
  })

  if (getPlayerJob() === 'spy') {
    WA.player.state.askForCloseCheatSheet = false
    // Can see cheatSheet
    WA.ui.actionBar.addButton({
      id: 'cheatSheetButton',
      label: utils.translations.translate('bomb.cheatSheet'),
      callback: async () => {
        if (!cheatSheetWebsite) {
          await openCheatSheetWebsite()
        } else {
          closeCheatSheetWebsite()
        }
      }
    });

    WA.player.state.onVariableChange('askForCloseCheatSheet').subscribe((value) => {
      if (value) {
        closeCheatSheetWebsite()
      }
    })
  }

  // On enter free spy layer
  let displayFreeSpyActionMessage: ActionMessage | null = null
  WA.room.onEnterLayer('saveSpyZone').subscribe(() => {
    // If bomb has not been defused, cannot free spy
    if (!actionForAllPlayers.hasBeenTriggered('boom') && !actionForAllPlayers.hasBeenTriggered('defuseBomb')) {
      discussion.openDiscussionWebsite(
        utils.translations.translate('utils.mySelf'),
        utils.translations.translate('bomb.freeSpy.noTime'),
        'views.choice.close',
        "discussion",
      )
    } else if(!actionForAllPlayers.hasBeenTriggered('freeSpy')) {
      displayFreeSpyActionMessage = WA.ui.displayActionMessage({
        message: utils.translations.translate('utils.executeAction', {
          action: utils.translations.translate('bomb.freeSpy.free')
        }),
        callback: () => {
          actionForAllPlayers.activateActionForAllPlayer('freeSpy')
        }
      })

      WA.room.onLeaveLayer('saveSpyZone').subscribe(() => {
        displayFreeSpyActionMessage?.remove()
        displayFreeSpyActionMessage = null
      })
    }
  })

  // On enter bomb layer
  let displayDefuseBombActionMessage: ActionMessage | null = null
  WA.room.onEnterLayer('bombZone').subscribe( () => {
    if (!actionForAllPlayers.hasBeenTriggered('boom') && !actionForAllPlayers.hasBeenTriggered('defuseBomb')) {
      displayDefuseBombActionMessage = WA.ui.displayActionMessage({
        message: utils.translations.translate('utils.executeAction', {
          action: utils.translations.translate('bomb.bomb.defuse')
        }),
        callback: async () => {
          WA.controls.disablePlayerControls();

          // Open card
          bombWebsite = await WA.ui.website.open({
            url: `${rootLink}/views/bomb/bomb.html`,
            allowApi: true,
            allowPolicy: "",
            position: {
              vertical: "middle",
              horizontal: "middle",
            },
            size: {
              height: "50vh",
              width: "50vw",
            },
          })
        }
      })
    }

    WA.room.onLeaveLayer('bombZone').subscribe(() => {
      displayDefuseBombActionMessage?.remove()
      displayDefuseBombActionMessage = null
    })
  })

  // Make bomb explosion
  WA.player.state.onVariableChange('askForBoom').subscribe((value) => {
    if (value) {
      closeBombWebsite()
      actionForAllPlayers.activateActionForAllPlayer('boom')
    }
  })

  // Make bomb defusion
  WA.player.state.onVariableChange('askForDefuseBomb').subscribe((value) => {
    if (value) {
      actionForAllPlayers.activateActionForAllPlayer('defuseBomb')
    }
  })


})

const openCheatSheetWebsite = async () => {
  cheatSheetWebsite = await WA.ui.website.open({
    url: `${rootLink}/views/bomb/cheatSheet.html`,
    allowApi: true,
    allowPolicy: "",
    position: {
      vertical: "middle",
      horizontal: "middle",
    },
    size: {
      height: "50vh",
      width: "50vw",
    },
  })
}

const closeCheatSheetWebsite = () => {
  cheatSheetWebsite?.close()
  cheatSheetWebsite = null
  WA.player.state.askForCloseCheatSheet = false
}

const closeBombWebsite = () => {
  if (bombWebsite) {
    bombWebsite.close()
    bombWebsite = null
    WA.controls.restorePlayerControls()
  }
}
