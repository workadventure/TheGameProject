/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../utils'
import {UIWebsite} from "@workadventure/iframe-api-typings";
import {rootLink} from "../config";
import { savePlayerJob as savePlayerJobFromFirebase, getPlayerJob as getPlayerJobFromFirebase } from '../utils/firebase';

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

  if(!newJob) return;
  savePlayerJobFromFirebase(newJob);
}

const setSypJob = () => {

  // Reset play archaelogist job if the player has it
  const archaeologistPlayer = WA.state.loadVariable(JobPlayerVaraible.archaeologistPlayer) as JobPlayer
  const spyPlayer = WA.state.loadVariable(JobPlayerVaraible.spyPlayer) as JobPlayer;

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

const getPlayerJob = async () => {
  // If job is already set, return it
  if(WA.player.state.job) return WA.player.state.job;

  // Get job from firebase
  const response = await getPlayerJobFromFirebase();
  if(response == undefined) return false;
  WA.player.state.job = response.job
  return response.job;
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

  await getPlayerJob();

  console.info('initiateJob => My job is: ', WA.player.state.job);
  if (WA.player.state.job) {
    showJobWallet();
  } else {
    hideJobWallet();
    WA.player.state.saveVariable(JOB_VARIABLE, false, PERSIST_OPTION);
  }

  WA.player.state.onVariableChange(JOB_VARIABLE).subscribe((value) => {
    if (value) {
      console.info(utils.translations.translate('modules.job.jobChanged', {
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

// Function to determine if all players already have a job
const checkAllPlayersGotJob = () => {
  WA.state.saveVariable('allPlayersGotJob', false);
  const spyPlayer = WA.state.loadVariable(JobPlayerVaraible.spyPlayer) as {name: string, uuid: string} | false;
  const archaeologistPlayer = WA.state.loadVariable(JobPlayerVaraible.archaeologistPlayer) as {name: string, uuid: string} | false;
  if(spyPlayer != undefined && spyPlayer != false && archaeologistPlayer != undefined && archaeologistPlayer != false) {
      WA.state.saveVariable('allPlayersGotJob', true);
  }
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
  unclaimArchaeologistJob,
  checkAllPlayersGotJob
}