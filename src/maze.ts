/// <reference types="@workadventure/iframe-api-typings" />

import {hiddenZone, excavations, inventory, switchingTiles, hooking, sounds, workadventureFeatures} from './modules'
import {initiateJob} from "./modules/job";
import * as utils from './utils'
import {ActionMessage, Sound} from "@workadventure/iframe-api-typings";
import {env, rootLink} from "./config"
import { onInit } from './utils/init';
import { getChoiceInFirebase, getGem, saveGameStep, saveGem } from './utils/firebase';
import { disableMapEditor, disableMouseWheel, disableScreenSharing } from './utils/ui';

const STEP_GAME = "maze";

onInit(STEP_GAME).then( async () => {
    disableMapEditor();
    disableMouseWheel();
    disableScreenSharing();

    // Trigger fire
    let triggerBlue: ActionMessage|null = null;
    WA.room.onEnterLayer(`triggerBlue`).subscribe(() => {
        if(!WA.state.blueFire){
            if(WA.player.state.hasFoundBlueSeed) {
                triggerBlue = WA.ui.displayActionMessage({
                    message: utils.translations.translate('maze.triggerBlue'),
                    callback: () => {
                        inventory.removeFromInventory('powder')
                        WA.state.blueFire = true
                    }
                })
            }
            else {
                triggerBlue = WA.ui.displayActionMessage({
                    message: utils.translations.translate('maze.empty'),
                    callback: () => {
                    }
                })
            }
        } else {
            triggerBlue = WA.ui.displayActionMessage({
                message: utils.translations.translate('maze.fireOn'),
                callback: () => {
                }
            })
        }

    });
    WA.room.onLeaveLayer(`triggerBlue`).subscribe(() => {
        triggerBlue?.remove()
    });
    let triggerRed: ActionMessage|null = null;
    WA.room.onEnterLayer(`triggerRed`).subscribe(() => {
        if(!WA.state.redFire){
            if(WA.player.state.hasFoundRedSeed) {
                triggerRed = WA.ui.displayActionMessage({
                    message: utils.translations.translate('maze.triggerRed'),
                    callback: () => {
                        inventory.removeFromInventory('gem')
                        WA.state.redFire = true
                    }
                })
            }
            else {
                triggerRed = WA.ui.displayActionMessage({
                    message: utils.translations.translate('maze.empty'),
                    callback: () => {
                    }
                })
            }
        } else {
            triggerRed = WA.ui.displayActionMessage({
                message: utils.translations.translate('maze.fireOn'),
                callback: () => {
                }
            })
        }

    });
    WA.room.onLeaveLayer(`triggerRed`).subscribe(() => {
        triggerRed?.remove()
    });
    let triggerGreen: ActionMessage|null = null;
    WA.room.onEnterLayer(`triggerGreen`).subscribe(() => {
        if(!WA.state.greenFire){
            if(WA.player.state.hasFoundGreenSeed) {
                triggerGreen = WA.ui.displayActionMessage({
                    message: utils.translations.translate('maze.triggerGreen'),
                    callback: () => {
                        inventory.removeFromInventory('seed')
                        WA.state.greenFire = true;
                    }
                })
            }
            else {
                triggerGreen = WA.ui.displayActionMessage({
                    message: utils.translations.translate('maze.empty'),
                    callback: () => {
                    }
                })
            }
        } else {
            triggerGreen = WA.ui.displayActionMessage({
                message: utils.translations.translate('maze.fireOn'),
                callback: () => {
                    inventory.removeFromInventory('seed');
                    WA.state.greenFire = true;
                }
            })
        }

    });
    WA.room.onLeaveLayer(`triggerGreen`).subscribe(() => {
        triggerGreen?.remove()
    });

    // Init variable change subscription to trigger fire
    WA.state.onVariableChange("blueFire").subscribe((value) => {
        if(!value) return;
        blueFireOn();
        checkIfAllFireIsOn();
    });
    WA.state.onVariableChange("redFire").subscribe((value) => {
        if(!value) return;
        redFireOn();
        checkIfAllFireIsOn();
    });
    WA.state.onVariableChange("greenFire").subscribe((value) => {
        if(!value) return;
        greenFireOn();
        checkIfAllFireIsOn();
    });

    // Init variable change for exit map
    WA.room.onEnterLayer('exit').subscribe(() => {
        forestSound?.stop()
    });

    let forestSound: Sound|undefined;
    getChoiceInFirebase().then((choice) => {
        if(choice?.choice == 'online') return;
        forestSound = WA.sound.loadSound(`${rootLink}/sounds/forest.mp3`)
        let soundConfig = {
            volume: 0.1,
            loop: false,
            rate: 1,
            detune: 1,
            delay: 0,
            seek: 0,
            mute: false
        }
        forestSound.play(soundConfig)
    });

    for (let i = 1; i < 10; i++) {
        hiddenZone.initiateHiddenZones([{stepIn: `fogFloor/fog${[i]}`, hide: `fog/fog${[i]}`}])
    }

    // Initiate inventory
    inventory.initiateInventory();

    // If env game to test
    if(env === 'dev'){
        await hasFoundBlueSeed();
        await hasFoundGreenSeed();
        await hasFoundRedSeed();
    }

    // Init gen of the game
    await initGem();

    // Initiate job
    await initiateJob();

    // Hide pricing button
    workadventureFeatures.hidePricingButton();


    WA.player.state.onVariableChange("hasFoundRedSeed").subscribe(()=> {
    });

    WA.player.state.onVariableChange("hasFoundGreenSeed").subscribe(()=> {
        WA.room.hideLayer('excavations/exca6/found')
    });

    WA.player.state.onVariableChange("hasFoundBlueSeed").subscribe(()=> {
        WA.room.hideLayer('blueSeed')
    });

    // Initiate Hidden Zone
    hiddenZone.initiateHiddenZones([{stepIn: 'hiddenZoneFloor/hiddenZoneFloor', hide: 'hiddenZoneTop'}])

    // Hooking
    hooking.setHooking('hiddenZoneFloor/hooking', async () => {
        await hasFoundRedSeed();
    })

    // excavations initialisation
    excavations.initiateExcavations(
        ['excavations/exca1', 'excavations/exca2', 'excavations/exca3', 'excavations/exca4', 'excavations/exca5'], // List of your excavationGroups names
        [() => {
            console.info('Excavation has been made !')} // List of callbacks for your excavationGroups
    ])

    let findSeed: ActionMessage|null = null

    excavations.initiateExcavations(
        ['excavations/exca6'], // List of your excavationGroups names
        [() => {
            WA.room.onEnterLayer(`excavations/exca6/found`).subscribe(() => {
                if(!WA.player.state.hasFoundGreenSeed){
                    findSeed = WA.ui.displayActionMessage({
                        message: utils.translations.translate('maze.takeSeedMsg'),
                        callback: async () => {
                            await hasFoundGreenSeed();
                        }
                    })
                }
            })

            WA.room.onLeaveLayer(`excavations/exca6/trace`).subscribe(() => {
                findSeed?.remove()
            })
           } // List of callbacks for your excavationGroups
    ]);

    // Switching tiles initiate
    switchingTiles.initiateSwitchingTiles(
        ['switchingTiles'],
        [() => {
            WA.room.hideLayer('blueArtifact')
            WA.room.showLayer('blueSeed')
            WA.room.showLayer('switchTileVictory')
            WA.room.onEnterLayer(`blueSeed`).subscribe(() => {
                if(!WA.player.state.hasFoundBlueSeed) {
                    findSeed = WA.ui.displayActionMessage({
                        message: utils.translations.translate('maze.takePowderMsg'),
                        callback: async () => {
                            await hasFoundBlueSeed();
                        }
                    })
                }
            })

            WA.room.onLeaveLayer(`blueSeed`).subscribe(() => {
                findSeed?.remove()
            })
    }])
})

async function initGem(){
    await getGem("hasFoundBlueSeed").then((value) => {
        if(value == undefined || value.find == false) {
            WA.player.state.hasFoundBlueSeed = false;
            WA.state.blueFire = false;
        }else{
            WA.player.state.hasFoundBlueSeed = true;
            WA.state.blueFire = true;
        }
    }).catch((error) => {
        console.warn("Error getting document:", error);
        WA.player.state.hasFoundBlueSeed = false;
        WA.state.blueFire = false;
    });

    await getGem("hasFoundGreenSeed").then((value) => {
        if(value == undefined || value.find == false) {
            WA.player.state.hasFoundGreenSeed = false;
            WA.state.greenFire = false;
        }else{
            WA.player.state.hasFoundGreenSeed = true;
            WA.state.greenFire = true;
        }
    }).catch((error) => {
        console.warn("Error getting document:", error);
        WA.player.state.hasFoundGreenSeed = false;
        WA.state.greenFire = false;
    });

    await getGem("hasFoundRedSeed").then((value) => {
        if(value == undefined || value.find == false) {
            WA.player.state.hasFoundRedSeed = false;
            WA.state.redFire = false;
        }else{
            WA.player.state.hasFoundRedSeed = true;
            WA.state.redFire = true;
        }
    }).catch((error) => {
        console.warn("Error getting document:", error);
        WA.player.state.hasFoundRedSeed = false;
        WA.state.redFire = false;
    });

    if(WA.player.state.hasFoundBlueSeed){
        inventory.addToInventory({
            id: 'powder',
            name: utils.translations.translate('maze.powder'),
            image: 'shard.png', // here, the path from root is public/images/inventory/myItem.png
            description: utils.translations.translate('maze.powderDescription')
        });
    }
    if(WA.player.state.hasFoundGreenSeed){
        inventory.addToInventory({
            id: 'seed',
            name: utils.translations.translate('maze.seed'),
            image: 'seed.png', // here, the path from root is public/images/inventory/myItem.png
            description: utils.translations.translate('maze.seedDescription')
        })
    }
    if(WA.player.state.hasFoundRedSeed){
        inventory.addToInventory({
            id: 'gem',
            name: utils.translations.translate('maze.gem'),
            image: 'gem.png', // here, the path from root is public/images/inventory/myItem.png
            description: utils.translations.translate('maze.gemDescription')
        })
    }

    greenFireOn();
    redFireOn();
    blueFireOn();
    checkIfAllFireIsOn();

    console.info('Has found blue seed: ', WA.player.state.hasFoundBlueSeed);
    console.info('Has found green seed: ', WA.player.state.hasFoundGreenSeed);
    console.info('Has found red seed: ', WA.player.state.hasFoundRedSeed);

    console.info('Blue fire: ', WA.state.blueFire);
    console.info('Green fire: ', WA.state.greenFire);
    console.info('Red fire: ', WA.state.redFire);
}

async function hasFoundBlueSeed(){
    WA.player.state.hasFoundBlueSeed = true;
    inventory.addToInventory({
        id: 'powder',
        name: utils.translations.translate('maze.powder'),
        image: 'shard.png', // here, the path from root is public/images/inventory/myItem.png
        description: utils.translations.translate('maze.powderDescription')
    });
    await saveGem("hasFoundBlueSeed");
}

async function hasFoundGreenSeed(){
    WA.player.state.hasFoundGreenSeed = true;
    inventory.addToInventory({
        id: 'seed',
        name: utils.translations.translate('maze.seed'),
        image: 'seed.png', // here, the path from root is public/images/inventory/myItem.png
        description: utils.translations.translate('maze.seedDescription')
    })
    await saveGem("hasFoundGreenSeed");
}

async function hasFoundRedSeed(){
    WA.player.state.hasFoundRedSeed = true;
    inventory.addToInventory({
        id: 'gem',
        name: utils.translations.translate('maze.gem'),
        image: 'gem.png', // here, the path from root is public/images/inventory/myItem.png
        description: utils.translations.translate('maze.gemDescription')
    })
    await saveGem("hasFoundRedSeed");
}

const blueFireOn = () => {
    if(WA.state.blueFire) {
        WA.room.hideLayer('torchesTop/offTop/torcheBlueOffTop')
        WA.room.hideLayer('torchesBot/offBot/torcheBlueOffBot')
        WA.room.showLayer('torchesTop/onTop/torcheBlueOnTop')
        WA.room.showLayer('torchesBot/onBot/torcheBlueOnBot')
    }
}

const greenFireOn = () => {
    if(WA.state.greenFire) {
        WA.room.hideLayer('torchesTop/offTop/torcheGreenOffTop')
        WA.room.hideLayer('torchesBot/offBot/torcheGreenOffBot')
        WA.room.showLayer('torchesTop/onTop/torcheGreenOnTop')
        WA.room.showLayer('torchesBot/onBot/torcheGreenOnBot')
    }
}

const redFireOn = () => {
    if(WA.state.redFire) {
        WA.room.hideLayer('torchesTop/offTop/torcheRedOffTop')
        WA.room.hideLayer('torchesBot/offBot/torcheRedOffBot')
        WA.room.showLayer('torchesTop/onTop/torcheRedOnTop')
        WA.room.showLayer('torchesBot/onBot/torcheRedOnBot')
    }
}

const checkIfAllFireIsOn = () => {
    if(WA.state.blueFire && WA.state.redFire && WA.state.greenFire) {
        saveGameStep(STEP_GAME);
        sounds.playSound('successSound')
        WA.room.showLayer('dragonTopLight')
        WA.room.showLayer('dragonLight')
        WA.room.showLayer('mountainDoorAnimate')
        WA.room.setTiles([{ x: 16, y: 4, tile: null, layer: `collisions` }])
        blueFireOn()
        greenFireOn()
        redFireOn()
    }
}


export {};