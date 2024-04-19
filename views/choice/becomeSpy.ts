/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../../src/utils/index.js'
import * as modules from '../../src/modules/index.js'
import { onInit } from "../../src/utils/init";
import { checkAllPlayersGotJob, setSypJob, unclaimSpyJob } from "../../src/modules/job";

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

  if(title) title.innerText = await utils.translations.translate('choice.spy.title');
  if(text1) text1.innerText = await utils.translations.translate('choice.spy.text1');
  if(text2) text2.innerText = await utils.translations.translate('choice.spy.text2');
  if(text3) text3.innerText = await utils.translations.translate('choice.spy.text3');
  if(startGameButton) startGameButton.innerText = await utils.translations.translate('choice.spy.startGameButton');
  if(closeButton) closeButton.innerText = await utils.translations.translate('choice.spy.closeButton');
  if(cancelButton) cancelButton.innerText = await utils.translations.translate('choice.spy.cancelButton');
  if(validateTitle) validateTitle.innerText = await utils.translations.translate('choice.spy.validateTitle');
  if(validateText1) validateText1.innerText = await utils.translations.translate('choice.spy.validateText1');
  if(validateText2) validateText2.innerText = await utils.translations.translate('choice.spy.validateText2');
};

document.addEventListener("DOMContentLoaded", async () => {
  await WA.onInit();

  await translate();

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
    setSypJob();

    // Show the accepted section
    acceptedSection?.style.setProperty('display', 'flex');
    askSection?.style.setProperty('display', 'none');

    // Check if all players have a job
    checkAllPlayersGotJob();
  }

  const cancel = () => {
    // Reset player job to choice in this room
    unclaimSpyJob();
    close();
  }

  closeButton?.addEventListener('click', close);
  startGameButton?.addEventListener('click', letsgo);
  cancelButton?.addEventListener('click', cancel);

  if(WA.player.state.job && WA.player.state.job === 'spy'){
    letsgo();
  }
});