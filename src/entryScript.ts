/// <reference types="@workadventure/iframe-api-typings" />

import {job, excavations, lobby, secretPassages, hiddenZone, switchingTiles, readRunes, inventory, hooking, notifications, arrayFilling} from './modules'
import { onInit } from './utils/init'
import { disableMapEditor, disableMouseWheel, disableScreenSharing } from './utils/ui';

// Waiting for the API to be ready
onInit().then(() => {

    disableMapEditor();
    disableMouseWheel();
    disableScreenSharing();

    console.log('INITIALISATION')
    job.initiateJob()

    console.log('HERE')
    excavations.initiateExcavations(['excavation'], [() => {console.log('test callback after excavation')}])
    secretPassages.initiateSecretPassages(['secretPassage'], [() => {console.log('test callback after finding secret passage')}])
    hiddenZone.initiateHiddenZones([{stepIn: 'hiddenZoneFloor', hide: 'hiddenZoneTop'}])

    console.log('Initiate switching tiles')
    switchingTiles.setSwitchingTile('switchingTiles', () => console.log('OK !'), true, 'test')

    console.log('Initiate runes reading !')
    readRunes.initiateRunesReading()
    readRunes.setRunesReadingZone('runeZone', {content : 'Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. ', title: 'Cendrillon'})

    console.log('Initiate inventory !')
    inventory.initiateInventory()
    inventory.addToInventory({
        id: 'test',
        name: 'test',
        description: 'Ma super description de test'
    })
    inventory.addToInventory({
        id: 'test2',
        name: 'test2',
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        description: 'Ma super description de test2'
    })

    console.log('Initiate Hooking')
    hooking.setHooking('hooking', () => { console.log('Crochetage effectué !')})

    console.log('NOTIFY')
    notifications.notify('Ceci est le contenu de ma notification d\'info', 'Mon super titre', 'info')
    setTimeout(() => {
        notifications.notify('Ceci est le contenu de ma notification d\'erreur', 'Erreur', 'error')
    }, 1000)

    console.log('ARRAY FILLING')
    arrayFilling.setArrayFilling('test', [['test', 'test', 'test']], () => console.log('WRONG'), () => console.log('RIGHT'))
    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test2')

    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test2')

    console.log('HERE')
    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test')

    console.log('JAMBON')
    arrayFilling.testArrayFilling('test', 'jambon')

    console.log('LOBBY INITIALISATION')
    lobby.initiateLobby()
}).catch(e => console.error(e))

export {};
