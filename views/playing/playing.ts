/// <reference types="@workadventure/iframe-api-typings" />

import { CoWebsite } from '@workadventure/iframe-api-typings';
import * as utils from '../../src/utils/index.js';

document.addEventListener("DOMContentLoaded", async () => {
    await translatePage();

    // Get the playing choice of the user
    const playingChoice = await utils.firebase.getChoiceInFirebase();
    if(playingChoice != undefined && playingChoice.choice != undefined){
        // Show the online playing
        WA.ui.modal.closeModal();
    }

    WA.onInit().then(async () => {
        const onlineElement = document.getElementById('online');
        const notonlineElement = document.getElementById('notonline');

        onlineElement?.addEventListener('click', () => {
            // Save choice in the firebase
            utils.firebase.saveChoiceInFirebase('online');
            WA.player.state.playingModeSelected = true;
            // Show the online playing
            WA.ui.modal.closeModal();
        });

        notonlineElement?.addEventListener('click', async () => {
            // Save choice in the firebase
            utils.firebase.saveChoiceInFirebase('onlive');
            WA.player.state.playingModeSelected = true;
            // Show the online playing
            WA.ui.modal.closeModal();
            // Close cowebiste
            (await WA.nav.getCoWebSites()).forEach((cowebsite: CoWebsite) => {
                cowebsite.close();
            });
        });
    });
});

// Translate the title page
const translatePage = async () => {
    const titleElement = document.getElementById('title');
    if(titleElement) titleElement.innerText = await utils.translations.translate('views.playing.title');

    const onlineTitleElement = document.getElementById('onlineTitle');
    if(onlineTitleElement) onlineTitleElement.innerText = await utils.translations.translate('views.playing.onlineTitle');
    const onlineElement = document.getElementById('onlineContent');
    if(onlineElement) onlineElement.innerText = await utils.translations.translate('views.playing.online');

    const onliveTitleElement = document.getElementById('onliveTitle');
    if(onliveTitleElement) onliveTitleElement.innerText = await utils.translations.translate('views.playing.onliveTitle');
    const onliveElement = document.getElementById('onliveContent');
    if(onliveElement) onliveElement.innerText = await utils.translations.translate('views.playing.onlive');
};

