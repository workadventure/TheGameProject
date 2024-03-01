/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../utils'
import {UIWebsite} from "@workadventure/iframe-api-typings";
import {rootLink} from "../config";

export enum Job {
  archaeologist = 'archaeologist',
  spy = 'spy'
}
export type JobPlayer = {name: string, uuid: string} | false
export enum JobPlayerVaraible {
  archaeologistPlayer = 'archaeologistPlayer',
  spyPlayer = 'spyPlayer'
}
export type Permissions =
  'useComputers'
  | 'speakAncienLanguages'
  | 'readRunes'
  | 'makeExcavation'
  | 'findSecretPassages'
  | 'makeHooking'

export const JOB_VARIABLE = 'job'
export type presistOption = {public?: boolean, persist?: boolean, scope: "world" | "room", ttl?: number}
export const PERSIST_OPTION: presistOption  = { public: true, persist: true, scope: "world"}

const permissionsByJob: Record<Job, Record<Permissions, boolean>> = {
  archaeologist: {
    useComputers: false,
    speakAncienLanguages: true,
    readRunes: true,
    makeExcavation: true,
    findSecretPassages: false,
    makeHooking: false
  },
  spy: {
    useComputers: true,
    speakAncienLanguages: false,
    readRunes: false,
    makeExcavation: false,
    findSecretPassages: true,
    makeHooking: true
  },
}

// Name of the menubarbutton
const buttonName = 'jobWalletButton'
let jobWalletWebsite: UIWebsite|null = null

// Choose player job
const setPlayerJob = (newJob: Job|undefined) => {
  WA.player.state.saveVariable(JOB_VARIABLE, newJob, PERSIST_OPTION);

  WA.player.removeOutlineColor();
  if(newJob === 'spy'){
    WA.player.setOutlineColor(0, 0, 0);
  }
  if(newJob === 'archaeologist'){
    WA.player.setOutlineColor(85, 53, 42);
  }
  
  /*let playerId = WA.player.uuid
  let slug = playerId?.replaceAll('.', '').replaceAll('@', '')

  fetch(`https://weasley-project-default-rtdb.europe-west1.firebasedatabase.app/userRole/${slug}.json`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "playerId": playerId, "job": newJob })
  })
      .then(response => response.json())
      .then(response => console.log('response', JSON.stringify(response)))*/
}

const setSypJob = () => {

  // Reset play archaelogist job if the player has it
  const archaeologistPlayer = WA.state.loadVariable(JobPlayerVaraible.archaeologistPlayer) as JobPlayer
  console.log('archaeologistPlayer', archaeologistPlayer);
  const spyPlayer = WA.state.loadVariable(JobPlayerVaraible.spyPlayer) as JobPlayer;
  console.log('spyPlayer', spyPlayer);

  if(archaeologistPlayer == undefined || (archaeologistPlayer !== false && archaeologistPlayer.uuid === WA.player.uuid))
    WA.state.saveVariable(JobPlayerVaraible.archaeologistPlayer, false);

  // Set player spy job
  if(!spyPlayer || spyPlayer == undefined)
    WA.state.saveVariable(JobPlayerVaraible.spyPlayer, {
      uuid: WA.player.uuid,
      name: WA.player.name
    });

  setPlayerJob(Job.spy);
}

const setArchaeologistJob = () => {

  // Reset play archaelogist job if the player has it
  const archaeologistPlayer = WA.state.loadVariable(JobPlayerVaraible.archaeologistPlayer) as JobPlayer;
  const spyPlayer = WA.state.loadVariable(JobPlayerVaraible.spyPlayer) as JobPlayer

  if(!archaeologistPlayer || archaeologistPlayer == undefined)
    WA.state.saveVariable(JobPlayerVaraible.archaeologistPlayer, {
      uuid: WA.player.uuid,
      name: WA.player.name
    });

  // Set player spy job
  if(archaeologistPlayer == undefined || (spyPlayer !== false && spyPlayer.uuid === WA.player.uuid))
    WA.state.saveVariable(JobPlayerVaraible.spyPlayer, false);

  setPlayerJob(Job.archaeologist);
}

const unclaimSpyJob = () => {
  const spyPlayer = WA.state.loadVariable(JobPlayerVaraible.spyPlayer) as {name: string, uuid: string} | false;
  if(spyPlayer && spyPlayer.uuid !== WA.player.uuid) return;
  
  WA.state.saveVariable(JobPlayerVaraible.spyPlayer, false);
  setPlayerJob(undefined);
}

const unclaimArchaeologistJob = () => {
  const archaeologistPlayer = WA.state.loadVariable(JobPlayerVaraible.archaeologistPlayer) as {name: string, uuid: string} | false;
  
  if(archaeologistPlayer && archaeologistPlayer.uuid !== WA.player.uuid)
  WA.state.saveVariable(JobPlayerVaraible.archaeologistPlayer, false, );
  setPlayerJob(undefined);
}

const getPlayerJob = () => {
  return WA.player.state.job
}

// Open job wallet website
const openJobWalletWebsite = async () => {
  // Disable controls while card is open
  WA.controls.disablePlayerControls()

  // Open card
  jobWalletWebsite = await WA.ui.website.open({
    url: `${rootLink}/views/jobWallet/jobWallet.html`,
    allowApi: true,
    allowPolicy: "",
    position: {
      vertical: "middle",
      horizontal: "middle",
    },
    size: {
      height: "50vh",
      width: "50vw",
    },
  })

  WA.player.state.saveVariable('askForJobWalletWebsiteClose', false, PERSIST_OPTION)
}

const askForJobWalletWebsiteClose = () => {
  WA.player.state.saveVariable('askForJobWalletWebsiteClose', true, PERSIST_OPTION)
}

// Close job wallet website
const closeJobWalletWebsite = () => {
  jobWalletWebsite?.close()
  jobWalletWebsite = null

  // Restore player controle after closing card
  WA.controls.restorePlayerControls()
}

// Show menu bar button for job wallet
const showJobWallet = () => {
  WA.ui.actionBar.addButton({
    id: buttonName,
    label: utils.translations.translate('modules.job.myJobWallet.label'),
    callback: async () => {
      if (!jobWalletWebsite) {
        await openJobWalletWebsite()
      } else {
        closeJobWalletWebsite()
      }
    }
  });
}

// Hide menu bar button for job wallet
const hideJobWallet = () => {
  WA.ui.actionBar.removeButton(buttonName);
}

const initiateJob = async () => {
  // block users while initiating jobs
  WA.controls.disablePlayerControls();

  /*let playerId = WA.player.uuid
  let slug = playerId?.replaceAll('.', '').replaceAll('@', '')

  let response = await fetch(`https://weasley-project-default-rtdb.europe-west1.firebasedatabase.app/userRole/${slug}.json`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const responseJson = await response.json()*/

  //WA.player.state.job = responseJson?.job
  console.info('initiateJob => My job is', WA.player.state.job);
  if (WA.player.state.job) {
    showJobWallet();
  } else {
    hideJobWallet();
    WA.player.state.saveVariable(JOB_VARIABLE, false, PERSIST_OPTION);
  }

  WA.player.state.onVariableChange(JOB_VARIABLE).subscribe((value) => {
    if (value) {
      console.log(utils.translations.translate('modules.job.jobChanged', {
        job: utils.translations.translate(`modules.job.jobs.${value}`)
      }))
      showJobWallet();
    } else {
      hideJobWallet();
    }
  });

  WA.player.state.onVariableChange('askForJobWalletWebsiteClose').subscribe((value) => {
    if (value) {
      closeJobWalletWebsite();
    }
  })

  // block users while initiating jobs
  WA.controls.restorePlayerControls();
  return;
}

// See if user has the permission passed as parameter
const canUser = (permissionName: Permissions) => {
  return WA.player.state.job && permissionsByJob[WA.player.state.job as Job][permissionName]
}

// Get a list of user permissions
const getUserPermissions = () => {
  if (WA.player.state.job && permissionsByJob[WA.player.state.job as Job]) {
    return Object.keys(permissionsByJob[WA.player.state.job as Job]).filter((item) => {
      return permissionsByJob[WA.player.state.job as Job][item as Permissions]
    })
  }
  return null
}

export {
  initiateJob,
  setPlayerJob,
  getPlayerJob,
  canUser,
  getUserPermissions,
  closeJobWalletWebsite,
  askForJobWalletWebsiteClose,
  setSypJob,
  setArchaeologistJob,
  unclaimSpyJob,
  unclaimArchaeologistJob
}