import { readRunes, inventory, switchingTiles, actionForAllPlayers, discussionv2 as discussion, notifications, sounds } from './modules'
import * as utils from './utils'
// @ts-ignore
import {PlayerMessage, Sound} from "@workadventure/iframe-api-typings";
import {getPlayerJob, initiateJob} from "./modules/job";
import {rootLink} from "./config";
import { onInit } from './utils/init';
import { disableMapEditor, disableMouseWheel, disableScreenSharing } from './utils/ui';
import { getChoiceInFirebase, saveGameStep } from './utils/firebase';
import { titleEnum } from './modules/discussionv2';

const STEP_GAME = "treasureEnigma";

onInit(STEP_GAME).then(async () => {
  // Initiate players jobs
  await initiateJob()

  disableMapEditor();
  disableMouseWheel();
  disableScreenSharing();

  let treasureSound: Sound|undefined;
  getChoiceInFirebase().then((choice) => {
    if(choice?.choice == 'online') return;
    treasureSound = WA.sound.loadSound(`${rootLink}/sounds/treasure.mp3`);
    let soundConfig = {
      volume: 0.1,
      loop: false,
      rate: 1,
      detune: 1,
      delay: 0,
      seek: 0,
      mute: false
    };
    treasureSound.play(soundConfig);
  });

  // Initialize sounds
  sounds.initiateSounds([
    {
      name: 'evilGuySound',
      path: 'evilGuy.mp3'
    }
  ])

  // Inventory initialisation
  inventory.initiateInventory()

  // Runes reading initialisation
  readRunes.initiateRunesReading()
  readRunes.setRunesReadingZone('runesReading', {content : 'treasureEnigma.runes.content'})

  // Satues enigma setup
  let canTakeHammerPlayerMessage: PlayerMessage | null = null
  switchingTiles.setSwitchingTile(
    'rotatingStatues',
    () => {
      // Hammer visible
      notifications.notify('treasureEnigma.hammer.opened', 'utils.success', 'success')
      utils.layers.toggleLayersVisibility('hammerZoneTop', false)
      WA.room.onEnterLayer('hammerZone').subscribe(() => {
        if (!inventory.hasItem('hammer')) {
          // @ts-ignore
          canTakeHammerPlayerMessage = WA.ui.displayPlayerMessage({
            message: utils.translations.translate('utils.executeAction', {
              action: utils.translations.translate('treasureEnigma.hammer.action')
            }),
            callback: () => {
              inventory.addToInventory({
                id: 'hammer',
                name: 'treasureEnigma.hammer.name',
                image: 'hammer.png',
                description: 'treasureEnigma.hammer.description',
              })
              utils.layers.toggleLayersVisibility('hammerZone', false)
            }
          })
        }
      })

      WA.room.onLeaveLayer('hammerZone').subscribe(() => {
        canTakeHammerPlayerMessage?.remove()
        canTakeHammerPlayerMessage = null
      })
    },
    true,
    'treasureEnigma.makeTurn'
  )

  // // HOURGLASSES
  let breakHourglassAction: PlayerMessage|null = null

  actionForAllPlayers.initializeRelativeActionForAllPlayers('openTreasureDoor', ['breakHourglass1', 'breakHourglass2'], () => {
    // Plays success sound
    sounds.playSound('successSound')

    // Show fire on torcher
    utils.layers.toggleLayersVisibility('torchesOnBottom', true)
    utils.layers.toggleLayersVisibility('torchesOnTop', true)

    // Show door open
    utils.layers.toggleLayersVisibility('treasureDoor', false)

    // Remove door collisions
    WA.room.setTiles([
      {x: 14, y: 13, tile: null, layer: 'treasureDoorCollisions'},
      {x: 15, y: 13, tile: null, layer: 'treasureDoorCollisions'},
      {x: 16, y: 13, tile: null, layer: 'treasureDoorCollisions'},
    ]);
  })

  // HOURGLASS 1
  actionForAllPlayers.initializeActionForAllPlayers('breakHourglass1', () => {
    utils.layers.toggleLayersVisibility('hourglass1FullBottom', false)
    utils.layers.toggleLayersVisibility('hourglass1FullTop', false)
    utils.layers.toggleLayersVisibility('hourglass1BrokenTop', true)
    utils.layers.toggleLayersVisibility('hourglass1BrokenBottom', true)
  })

  WA.room.onEnterLayer('breakHourglass1Zone').subscribe(() => {
    if (inventory.hasItem('hammer') && !actionForAllPlayers.hasBeenTriggered('breakHourglass1')) {
      // @ts-ignore
      breakHourglassAction = WA.ui.displayPlayerMessage({
        message: utils.translations.translate('utils.executeAction', {
          action: utils.translations.translate('treasureEnigma.breakHourglass')
        }),
        callback: () => {
          actionForAllPlayers.activateActionForAllPlayer('breakHourglass1')
        }
      })
    }
  })

  WA.room.onLeaveLayer('breakHourglass1Zone').subscribe(() => {
    breakHourglassAction?.remove()
    breakHourglassAction = null
  })

  // HOURGLASS 2
  actionForAllPlayers.initializeActionForAllPlayers('breakHourglass2', () => {
    utils.layers.toggleLayersVisibility('hourglass2FullBottom', false)
    utils.layers.toggleLayersVisibility('hourglass2FullTop', false)
    utils.layers.toggleLayersVisibility('hourglass2BrokenTop', true)
    utils.layers.toggleLayersVisibility('hourglass2BrokenBottom', true)
  })

  WA.room.onEnterLayer('breakHourglass2Zone').subscribe(() => {
    if (inventory.hasItem('hammer') && !actionForAllPlayers.hasBeenTriggered('breakHourglass2')) {
      // @ts-ignore
      breakHourglassAction = WA.ui.displayPlayerMessage({
        message: utils.translations.translate('utils.executeAction', {
          action: utils.translations.translate('treasureEnigma.breakHourglass')
        }),
        callback: () => {
          actionForAllPlayers.activateActionForAllPlayer('breakHourglass2')
        }
      })
    }
  })

  WA.room.onLeaveLayer('breakHourglass2Zone').subscribe(() => {
    breakHourglassAction?.remove()
    breakHourglassAction = null
  })

  // TREASURE ROOM
  actionForAllPlayers.initializeActionForAllPlayers('evilGuyAppears', async () => {
    // Disable player control
    WA.controls.disablePlayerControls()

    WA.camera.set(
      15*32+16,
      4*32+16,
      50,
      50,
      true,
      true,
  )

    // Evil guy sound
    sounds.playSound('evilGuySound')

  // Wait during camera transition
  await utils.main.wait(1000)

  // Bad guy appears
  setTimeout(() => {
    utils.layers.toggleLayersVisibility('badGuy', true)
  }, 300)
  await utils.layers.triggerAnimationWithLayers(['pouf1', 'pouf2', 'pouf3'], 100)
  const myjob = await getPlayerJob()
  setTimeout(() => {
    // Bad guy monologue
    discussion.openDiscussionWebsite(
      titleEnum.badGuy,
      'treasureEnigma.badGuy.monologue',
      'views.choice.close',
      "discussion",
      async () => {
        // Redirect to next map
        treasureSound?.stop()

        await saveGameStep(STEP_GAME);
        WA.nav.goToRoom(`./bomb.tmj#${myjob}-entry`)
      }
    )
  }, 300) // Let time to understand what happen
  })

  let treasurePlayerMessage: PlayerMessage|null = null
  WA.room.onEnterLayer('treasure').subscribe(() => {
    // @ts-ignore
    treasurePlayerMessage =WA.ui.displayPlayerMessage({
      message: utils.translations.translate('utils.executeAction', {
        action: utils.translations.translate('treasureEnigma.takeTheTreasure')
      }),
      callback: () => {
        actionForAllPlayers.activateActionForAllPlayer('evilGuyAppears')
      }
    })
  })

  WA.room.onLeaveLayer('treasure').subscribe(() => {
    treasurePlayerMessage?.remove()
    treasurePlayerMessage = null
  })
});

export{};
