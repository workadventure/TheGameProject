/// <reference types="@workadventure/iframe-api-typings" />

import { setArchaeologistJob, unclaimArchaeologistJob } from "../../src/modules/job";
import { checkAllPlayersGotJob } from "../../src/choice";
import * as utils from '../../src/utils/index.js'

const translate = async () => {
  const title = document.getElementById('title');
  const text1 = document.getElementById('text1');
  const text2 = document.getElementById('text2');
  const text3 = document.getElementById('text3');
  const startGameButton = document.getElementById('startGameButton');
  const closeButton = document.getElementById('closeButton');
  const cancelButton = document.getElementById('cancelButton');
  const validateTitle = document.getElementById('validateTitle');
  const validateText1 = document.getElementById('validateText1');
  const validateText2 = document.getElementById('validateText2');

  if(title) title.innerText = await utils.translations.translate('choice.archaeologist.title');
  if(text1) text1.innerText = await utils.translations.translate('choice.archaeologist.text1');
  if(text2) text2.innerText = await utils.translations.translate('choice.archaeologist.text2');
  if(text3) text3.innerText = await utils.translations.translate('choice.archaeologist.text3');
  if(startGameButton) startGameButton.innerText = await utils.translations.translate('choice.archaeologist.startGameButton');
  if(closeButton) closeButton.innerText = await utils.translations.translate('choice.archaeologist.closeButton');
  if(cancelButton) cancelButton.innerText = await utils.translations.translate('choice.archaeologist.cancelButton');
  if(validateTitle) validateTitle.innerText = await utils.translations.translate('choice.archaeologist.validateTitle');
  if(validateText1) validateText1.innerText = await utils.translations.translate('choice.archaeologist.validateText1');
  if(validateText2) validateText2.innerText = await utils.translations.translate('choice.archaeologist.validateText2');
};

document.addEventListener("DOMContentLoaded", async () => {
  await WA.onInit();

  translate();

  const acceptedSection = document.getElementById('accepted');
  const askSection = document.getElementById('ask');
  const closeButton = document.getElementById('closeButton');
  const startGameButton = document.getElementById('startGameButton');
  const cancelButton = document.getElementById('cancelButton');

  const close = () => {
    WA.ui.modal.closeModal();
    WA.controls.restorePlayerControls();
  }

  const letsgo = () => {
    console.log('Let\'s go !');
    // Set the player job
    setArchaeologistJob();

    // Show the accepted section
    acceptedSection?.style.setProperty('display', 'flex');
    askSection?.style.setProperty('display', 'none');

    // Check if all players have a job
    checkAllPlayersGotJob();
  }

  const cancel = () => {
    // Reset player job to choice in this room
    unclaimArchaeologistJob();
    close();
  }

  closeButton?.addEventListener('click', close);
  startGameButton?.addEventListener('click', letsgo);
  cancelButton?.addEventListener('click', cancel);

  if(WA.player.state.job && WA.player.state.job === 'archaeologist'){
    letsgo();
  }
});