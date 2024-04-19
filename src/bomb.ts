import {ActionMessage, UIWebsite} from "@workadventure/iframe-api-typings";
import {rootLink} from "./config";
import {initiateJob, getPlayerJob, setPlayerJob, Job} from "./modules/job";
import { actionForAllPlayers, discussionv2 as discussion, notifications, secretPassages, sounds, workadventureFeatures } from './modules'
import * as utils from './utils'
import {env} from "./config"
import { onInit } from "./utils/init";
import { disableMapEditor, disableMouseWheel, disableScreenSharing } from "./utils/ui";
import { titleEnum } from "./modules/discussionv2";

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

const STEP_GAME = "bomb";

onInit(STEP_GAME).then(async () => {

  disableMapEditor();
  disableMouseWheel();
  disableScreenSharing();

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
    volume: 0.1,
    loop: false,
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

  const myJob = await getPlayerJob();
  // Speech at arriving
  discussion.openDiscussionWebsite(
    titleEnum.mySelf,
    `bomb.story.${myJob}`,
    'views.choice.close',
    "discussion",
    () => {
      if (!actionForAllPlayers.hasBeenTriggered('freeSpy')) {
        if (myJob === 'spy') {
          // Is blocked under a rock
          if(WA.state.difused == false) {
            WA.controls.disablePlayerControls()
          }
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
  WA.state.onVariableChange('difused').subscribe((value) => {
    if(!value) return;
    closeBombWebsite();
  });

  // secret passages initialisation
  secretPassages.initiateSecretPassages(
    ['secretPassage'],
    [() => {console.info('secret passage discovered !')}
  ]);

  // FREE SPY ACTION
  actionForAllPlayers.initializeActionForAllPlayers('freeSpy', () => {
    // Remove rock layers and collisions
    utils.layers.toggleLayersVisibility('rock', false)
    WA.room.setTiles([
      {x: 15, y: 7, tile: null, layer: 'rockCollisions'},
      {x: 15, y: 8, tile: null, layer: 'rockCollisions'},
    ]);

    if (myJob === 'spy') {
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
        titleEnum.bombFailure,
        'bomb.bomb.failure.message',
        'views.choice.close',
        "discussion",
        async () => {
          if (myJob === 'spy') {
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
    sounds.playSound('successSound');
    notifications.notify(
      utils.translations.translate('bomb.bomb.success'),
      utils.translations.translate('utils.success'),
      'success'
    );
    WA.state.difused = true;
  })

  if (myJob === 'spy') {
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
        titleEnum.mySelf,
        'bomb.freeSpy.noTime',
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
          if(WA.state.difused == false) {
            WA.controls.disablePlayerControls();
          }

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
  }
  WA.controls.restorePlayerControls();
}

export {};
