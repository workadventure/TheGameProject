/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
bootstrapExtra();

import {hiddenZone, actionForAllPlayers, secretPassages, readRunes, arrayFilling, sounds} from './modules'
import { Job, initiateJob, setPlayerJob} from "./modules/job";
// @ts-ignore
import {PlayerMessage, Sound } from "@workadventure/iframe-api-typings";
import * as utils from "./utils";
import {
    activateActionForAllPlayer,
    hasBeenTriggered,
    initializeRelativeActionForAllPlayers
} from "./modules/actionForAllPlayers";
import {env, rootLink} from "./config";
import { onInit } from "./utils/init";
import { disableMapEditor, disableScreenSharing } from "./utils/ui";
import { endStartGameTimestamp, getChoiceInFirebase } from "./utils/firebase";
import { addRankingButton } from "./utils/ranking";

const STEP_GAME = "escape";

onInit(STEP_GAME).then(async () => {

    disableMapEditor();
    disableScreenSharing();

    let cave: Sound|undefined;
    getChoiceInFirebase().then((choice) => {
        if(choice?.choice == 'online') return;
        cave = WA.sound.loadSound(`${rootLink}/sounds/cavedark.mp3`)
        cave.play({
            volume: 0.1,
            loop: false,
            rate: 1,
            detune: 1,
            delay: 0,
            seek: 0,
            mute: false
        })
    });
    // Initiate jobs
    await initiateJob()

    // Initiate sounds
    sounds.initiateSounds([
        {
            name: 'finalSound',
            path: 'final.mp3'
        }
    ])

    const openFinalWebsite = async () => {
        cave?.stop()
        await WA.ui.website.open({
            url: `${rootLink}/views/newspaper/newspaper.html`,
            allowApi: true,
            allowPolicy: "",
            position: {
                vertical: "middle",
                horizontal: "middle",
            },
            size: {
                height: "100vh",
                width: "100vw",
            },
        })

        // save timestamp for finish game
        endStartGameTimestamp();

        // Add ranking button
        addRankingButton();
    }

    if(env === 'dev'){
        setPlayerJob(Job.spy)
    }

    // Final exit
    WA.room.onEnterLayer('exitZone').subscribe(() => {
        sounds.playSound('finalSound')
        openFinalWebsite()
    })

    secretPassages.initiateSecretPassages(
        ['secretPassage'],
        [() => {console.info('secret passage discovered !')}],
        [
          [
            {x: 38, y: 6},
            {x: 39, y: 6},
            {x: 40, y: 6},
            {x: 39, y: 7},
            {x: 40, y: 7},
            {x: 39, y: 8},
            {x: 40, y: 8},
            {x: 39, y: 9},
            {x: 40, y: 9},
            {x: 39, y: 10},
            {x: 40, y: 10}
          ]
        ])

    for (let i = 1; i < 11; i++) {
        hiddenZone.initiateHiddenZones([{stepIn: `eyes/eye${[i]}`, hide: `blackFogs/blackFog${[i]}`}])
    }

    hiddenZone.initiateHiddenZones([{stepIn: 'stepMapFog1', hide: 'mapFog1'}])
    hiddenZone.initiateHiddenZones([{stepIn: 'stepMapFog2', hide: 'mapFog2'}])
    // Runes reading initialisation
    readRunes.initiateRunesReading()

    // For each one of your reading zones
    readRunes.setRunesReadingZone('runeZone', {content : 'escape.content', title: 'escape.title'})

    initializeRelativeActionForAllPlayers('victory', ['blue', 'yellow', 'red'], () => {
        WA.room.hideLayer('runes/lightOff')
        WA.room.showLayer('runes/lightOn')
        sounds.playSound('successSound')
        secretPassages.removeBlocksTiles('victoryRunes', [
            {
                x: 30,
                y: 31
            },
            {
                x: 31,
                y: 31
            },
            {
                x: 32,
                y: 31
            }
        ])
        WA.room.hideLayer('victoryRunesWall')
        WA.room.hideLayer('victoryRunes/victoryFog')
        WA.room.showLayer('victoryRunes/openedWall')
        WA.camera.set(34*32, 34*32, undefined, undefined, false, true);
    })

    arrayFilling.setArrayFilling(
        'readRunesEscape',
        [
            ['blue', 'yellow', 'red']
        ],
        () => {
            restartRunes()

        },
        () => {
        }
    )
    actionForAllPlayers.initializeActionForAllPlayers('blue', (activate:boolean) => {
        if(activate) {
            WA.room.hideLayer('runes/angel')
            WA.room.showLayer('runes/angelOn')
        } else {
            WA.room.hideLayer('runes/angelOn')
            WA.room.showLayer('runes/angel')
        }

    }, false)

    let blueOn: PlayerMessage|null = null
    WA.room.onEnterLayer('runes/left').subscribe(() => {
        if (!WA.state.runesVictory && !hasBeenTriggered('blue')) {
            // @ts-ignore
            blueOn = WA.ui.displayPlayerMessage({
                message: utils.translations.translate('escape.active'),
                callback: () => {
                    activateActionForAllPlayer('blue', true)
                    arrayFilling.testArrayFilling('readRunesEscape', 'blue')
                }
            })
        }
    })
    WA.room.onLeaveLayer(`runes/left`).subscribe(() => {
        blueOn?.remove()
    })

    actionForAllPlayers.initializeActionForAllPlayers('red', (activate:boolean) => {
        if(activate) {
            WA.room.hideLayer('runes/demon')
            WA.room.showLayer('runes/demonOn')
        } else {
            WA.room.hideLayer('runes/demonOn')
            WA.room.showLayer('runes/demon')
        }

    }, false)

    let redOn: PlayerMessage|null = null
    WA.room.onEnterLayer('runes/center').subscribe(() => {
        if (!WA.state.runesVictory && !WA.state.demon) {
            // @ts-ignore
            redOn = WA.ui.displayPlayerMessage({
                message: utils.translations.translate('escape.active'),
                callback: () => {
                    activateActionForAllPlayer('red', true)
                    arrayFilling.testArrayFilling('readRunesEscape', 'red')
                }
            })
        }
    })
    WA.room.onLeaveLayer(`runes/center`).subscribe(() => {
        redOn?.remove()
    })

    actionForAllPlayers.initializeActionForAllPlayers('yellow', (activate:boolean) => {
        if(activate) {
            WA.room.hideLayer('runes/knight')
            WA.room.showLayer('runes/knightOn')
        } else {
            WA.room.hideLayer('runes/knightOn')
            WA.room.showLayer('runes/knight')
        }

    }, false)

    let yellowOn: PlayerMessage|null = null
    WA.room.onEnterLayer('runes/right').subscribe(() => {
        if (!WA.state.runesVictory && !WA.state.knight) {
            // @ts-ignore
            yellowOn = WA.ui.displayPlayerMessage({
                message: utils.translations.translate('escape.active'),
                callback: () => {
                    activateActionForAllPlayer('yellow', true)
                    arrayFilling.testArrayFilling('readRunesEscape', 'yellow')
                }
            })
        }
    })
    WA.room.onLeaveLayer(`runes/right`).subscribe(() => {
        yellowOn?.remove()
    })
    const restartRunes = () => {
        setTimeout(()=> {
            activateActionForAllPlayer('red', false)
            activateActionForAllPlayer('blue', false)
            activateActionForAllPlayer('yellow', false)
            sounds.playSound('failureSound')
        }, 300)
    }

    WA.room.onEnterLayer('dalles/dK').subscribe(() => {
        WA.room.showLayer('dalles/dKPush')
    })
    WA.room.onLeaveLayer(`dalles/dK`).subscribe(() => {
        WA.room.hideLayer('dalles/dKPush')
    })
    WA.room.onEnterLayer('dalles/dA').subscribe(() => {
        WA.room.showLayer('dalles/dAPush')
    })
    WA.room.onLeaveLayer(`dalles/dA`).subscribe(() => {
        WA.room.hideLayer('dalles/dAPush')
    })
    WA.room.onEnterLayer('dalles/dD').subscribe(() => {
        WA.room.showLayer('dalles/dDPush')
    })
    WA.room.onLeaveLayer(`dalles/dD`).subscribe(() => {
        WA.room.hideLayer('dalles/dDPush')
    })

    actionForAllPlayers.initializeActionForAllPlayers('artifactBrok', () => {
        activateActionForAllPlayer('artifactBrok', true)
        WA.room.hideLayer('artifact')
        WA.room.showLayer('brokenArtifact')
        WA.room.hideLayer('blackFogs/blackFog6')
        sounds.playSound('successSound')

        secretPassages.removeBlocksTiles('finishedDoor', [
            {
                x: 8,
                y: 2
            },
            {
                x: 8,
                y: 3
            },
            {
                x: 11,
                y: 6
            },
            {
                x: 12,
                y: 6
            },
            {
                x: 13,
                y: 6
            },
            {
                x: 11,
                y: 9
            },
            {
                x: 12,
                y: 9
            },
            {
                x: 13,
                y: 9
            },
            {
                x: 7,
                y: 12
            },
            {
                x: 8,
                y: 12
            },
            {
                x: 9,
                y: 12
            },
            {
                x: 7,
                y: 15
            },
            {
                x: 8,
                y: 15
            },
            {
                x: 9,
                y: 15
            }
        ])
        WA.room.hideLayer('finishedWall1');
        WA.room.hideLayer('finishedWall2');
        WA.room.showLayer('finishedDoor/openedDoor2');
        WA.room.hideLayer('templeDoorEmpty');
        WA.room.showLayer('templeDoorLight');

        WA.room.hideLayer('blackFogs/blackFog1');
        WA.room.hideLayer('blackFogs/blackFog2');
        WA.room.hideLayer('blackFogs/blackFog3');
        WA.room.hideLayer('blackFogs/blackFog4'); 
        WA.room.hideLayer('blackFogs/blackFog5');
        WA.room.hideLayer('blackFogs/blackFog6');
        WA.room.hideLayer('blackFogs/blackFog7');
        WA.room.hideLayer('blackFogs/blackFog8');
        WA.room.hideLayer('blackFogs/blackFog9');
        WA.room.hideLayer('blackFogs/blackFog10');
    })
    let artifact: PlayerMessage|null = null
    WA.room.onEnterLayer('artifactZone').subscribe(() => {
        if(!hasBeenTriggered('artifactBrok')) {
            // @ts-ignore
            artifact = WA.ui.displayPlayerMessage({
                message: utils.translations.translate('escape.artifact'),
                callback: () => {
                    actionForAllPlayers.activateActionForAllPlayer('artifactBrok');
                    WA.camera.set(9*32, 4*32, undefined, undefined, false, true);
                }
            })
        }
    })
    WA.room.onLeaveLayer(`artifactZone`).subscribe(() => {
        if(!hasBeenTriggered('artifactBrok')) {
            artifact?.remove()
        }
    })
})

export {};