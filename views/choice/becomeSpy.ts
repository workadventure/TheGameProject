import * as utils from '../../src/utils/index.js'
import * as modules from '../../src/modules/index.js'
import { onInit } from "../../src/utils/init";
import { setSypJob, unclaimSpyJob } from "../../src/modules/job";
import { checkAllPlayersGotJob } from "../../src/choice";

const getTitle = () => {
  return utils.translations.translate(`views.jobWallet.title`, {
    job: utils.translations.translate(`views.jobWallet.jobs.${modules.job.getPlayerJob()}.name`)
  })
}

const getAttributes = () => {
  return utils.translations.translate(`views.jobWallet.jobs.${modules.job.getPlayerJob()}.attributes`, {
    name: WA.player.name
  })
}

const getDescription = () => {
  return utils.translations.translate(`views.jobWallet.jobs.${modules.job.getPlayerJob()}.description`)
}

document.addEventListener("DOMContentLoaded", async () => {
  await onInit();

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