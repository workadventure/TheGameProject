/// <reference types="@workadventure/iframe-api-typings" />

import {job, excavations, lobby, secretPassages, hiddenZone, switchingTiles, readRunes, inventory, hooking, notifications, arrayFilling} from './modules'
import { disableMapEditor, disableMouseWheel, disableScreenSharing } from './utils/ui';

// Waiting for the API to be ready
WA.onInit().then(() => {

    disableMapEditor();
    disableMouseWheel();
    disableScreenSharing();

    console.info('INITIALISATION')
    job.initiateJob()

    excavations.initiateExcavations(['excavation'], [() => {console.info('test callback after excavation')}])
    secretPassages.initiateSecretPassages(['secretPassage'], [() => {console.info('test callback after finding secret passage')}])
    hiddenZone.initiateHiddenZones([{stepIn: 'hiddenZoneFloor', hide: 'hiddenZoneTop'}])

    console.info('Initiate switching tiles')
    switchingTiles.setSwitchingTile('switchingTiles', () => console.info('OK !'), true, 'test')

    console.info('Initiate runes reading !')
    readRunes.initiateRunesReading()
    readRunes.setRunesReadingZone('runeZone', {content : 'Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. Il était une fois, dans une royaume lointain, une magnifique princesse. ', title: 'Cendrillon'})

    console.info('Initiate inventory !')
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

    console.info('Initiate Hooking')
    hooking.setHooking('hooking', () => { console.info('Crochetage effectué !')})

    console.info('NOTIFY')
    notifications.notify('Ceci est le contenu de ma notification d\'info', 'Mon super titre', 'info')
    setTimeout(() => {
        notifications.notify('Ceci est le contenu de ma notification d\'erreur', 'Erreur', 'error')
    }, 1000)

    console.info('ARRAY FILLING')
    arrayFilling.setArrayFilling('test', [['test', 'test', 'test']], () => console.info('WRONG'), () => console.info('RIGHT'))
    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test2')

    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test2')

    console.info('HERE')
    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test')
    arrayFilling.testArrayFilling('test', 'test')

    console.info('JAMBON')
    arrayFilling.testArrayFilling('test', 'jambon')

    console.info('LOBBY INITIALISATION')
    lobby.initiateLobby()
}).catch(e => console.error(e))

export {};
