/// <reference types="@workadventure/iframe-api-typings" />

import { onInit } from "../../src/utils/init";
import { setArchaeologistJob, unclaimArchaeologistJob } from "../../src/modules/job";
import { checkAllPlayersGotJob } from "../../src/choice";

document.addEventListener("DOMContentLoaded", async () => {
  await WA.onInit();

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