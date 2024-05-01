/// <reference types="@workadventure/iframe-api-typings" />

import { CoWebsite } from "@workadventure/iframe-api-typings";
import { rootLink } from "../config";
import { getChoiceInFirebase, getGameStep, saveGameStep } from "./firebase";

const GAME_STEPS = ["choice", "museum", "maze", "music", "treasureEnigma", "bomb", "escape"];

export const onInit = async (step: "choice" | "museum" | "escape" | "treasureEnigma" | "bomb" | "maze" | "music") => {
    await WA.onInit();

    // Disable the webcam
    WA.controls.disableWebcam();
    // Disable the microphone
    WA.controls.disableMicrophone();
    // Initialise the game control for the experience
    // @ts-ignore
    WA.controls.disableInviteButton();
    console.info('During this game, the invite button is disabled');
    // @ts-ignore
    WA.controls.disableRightClick();
    console.info('During this game, the right click button is disabled');
    // @ts-ignore
    WA.controls.disableScreenSharing();
    console.info('During this game, the screen sharing is disabled');
    // @ts-ignore
    WA.controls.disableMapEditor();
    console.info('During this game, the map editor is disabled');

    // @ts-ignore
    WA.controls.disableRoomList();
    console.info('During this game, the room list is disabled');

    const positionCurentPlayer = await WA.player.getPosition();
    WA.camera.set(positionCurentPlayer.x, positionCurentPlayer.y, 400, 400);

    // Check the last finish game by user
    const currentStepGameRes = await getGameStep();
    console.info('Your current step in the game is: ', currentStepGameRes?.step);

    // Check playing choice for the game
    const playingChoice = await getChoiceInFirebase();
    const cowebsites = await WA.nav.getCoWebSites();

    if(playingChoice == undefined || playingChoice.choice == undefined){
        // Open the modal for the playing choice
        WA.ui.modal.openModal({
            allowApi: true,
            position: "center",
            allow: "fullscreen",
            title: "become spy",
            src : `${rootLink}/views/playing/playing.html`,
        });
    }
    if(playingChoice?.choice == 'onlive'){
        // Close the jitsi cowebsite
        closeJitsiCoWebSite(cowebsites);
    }
    
    // Check if the user is already in the step
    if(currentStepGameRes?.step == step) return;

    // Check if the user is in the choice step
    if((!currentStepGameRes || !currentStepGameRes.step) && step == "choice") {
        // Save choice step
        await saveGameStep(step);
        return;
    }

    // Check if the user is in the first step
    if(currentStepGameRes == undefined){
        // Redirect user to the step
        WA.nav.goToRoom(`./${GAME_STEPS[0]}.tmj`);
        return;
    }

    // Check if the user is in the last step
    const indexCurrentGame = GAME_STEPS.findIndex(gameStep => gameStep === step);
    const indexSavedGame =  GAME_STEPS.findIndex(gameStep => gameStep === currentStepGameRes.step);

    if(indexCurrentGame !== (indexSavedGame +1)) {
        // Redirect user to the step
        WA.nav.goToRoom(`./${GAME_STEPS[indexSavedGame]}.tmj`);
        return;
    }else{
        // Save choice step
        await saveGameStep(step);
    }
}

const closeJitsiCoWebSite = (cowebsites: CoWebsite[]) => {
    // Close the jitsi layer
    cowebsites.forEach((cowebsite: CoWebsite) => {
        cowebsite.close();
    });
};