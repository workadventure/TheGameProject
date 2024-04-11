/// <reference types="@workadventure/iframe-api-typings" />

import { ActionMessage } from '@workadventure/iframe-api-typings';
import { discussion, inventory, workadventureFeatures } from './modules'
import { JobPlayerVaraible, initiateJob } from "./modules/job";
import * as utils from "./utils";
import { rootLink } from "./config";
import { RemotePlayerInterface } from '@workadventure/iframe-api-typings';
import { onInit } from './utils/init';
import { saveGameStep } from './utils/firebase';

const bannerInviteUser = () => {
    WA.ui.banner.closeBanner();
    WA.ui.banner.openBanner({
        id: "banner-players-not-even",
        text: "You need to be at least 2 players to play this game 🙏",
        closable: false,
        timeToClose: 0
    });
};

const jobSpy = () => {
    const player = [...WA.players.list()].find(player => player.state.job == "spy");
    return player?.name;
}

const jobArcheo = () => {
    const player = [...WA.players.list()].find(player => player.state.job == "archaeologist");
    return player?.name;
}

const bannerTheTeamIsComplete = () => {
    const spyPlayer = WA.state.loadVariable(JobPlayerVaraible.spyPlayer) as {name: string, uuid: string} | false;
    const archaeologistPlayer = WA.state.loadVariable(JobPlayerVaraible.archaeologistPlayer) as {name: string, uuid: string} | false;
    WA.ui.banner.closeBanner();
    WA.ui.banner.openBanner({
        id: "banner-players-not-even",
        text: `${spyPlayer ? spyPlayer.name : "----"} 👀   ${archaeologistPlayer ? archaeologistPlayer.name : "----"} 👨‍🌾`,
        closable: false,
        timeToClose: 0
    });
};

// Function to determine if all players already have a job
export const checkAllPlayersGotJob = () => {
    WA.state.saveVariable('allPlayersGotJob', false);
    const spyPlayer = WA.state.loadVariable(JobPlayerVaraible.spyPlayer) as {name: string, uuid: string} | false;
    const archaeologistPlayer = WA.state.loadVariable(JobPlayerVaraible.archaeologistPlayer) as {name: string, uuid: string} | false;
    if(spyPlayer != undefined && archaeologistPlayer != undefined) {
        WA.state.saveVariable('allPlayersGotJob', true);
    }
}

const STEP_GAME = "choice";

// Waiting for the API to be ready
onInit(STEP_GAME).then(async () => {

    // Load and play sound of the room
    const choiceSound = WA.sound.loadSound(`${rootLink}/sounds/choice.mp3`)
    let soundConfig = {
        volume: 0.1,
        loop: true,
        rate: 1,
        detune: 1,
        delay: 0,
        seek: 0,
        mute: false
    }
    choiceSound.play(soundConfig)

    // Initiate inventory
    inventory.initiateInventory()

    // Initiate job
    await initiateJob()

    // Hide pricing
    workadventureFeatures.hidePricingButton();

    // Display scenario
    discussion.openDiscussionWebsite(
      'utils.voiceOver',
      'choice.scenario'
    )

    // Talk to the NPC
    let messageSent = false;
    WA.room.onEnterLayer('talk').subscribe(() => {
        if(messageSent) {
            WA.chat.open();
            return;
        }
        WA.chat.sendChatMessage(utils.translations.translate('views.choice.text'), `${utils.translations.translate('views.choice.title')} 🕵️‍♂️`);
        messageSent = true;
    });

    // Choose spy job
    WA.room.onEnterLayer('spy').subscribe(async () => {
        // Check if the Spy job is already taken
        if(jobSpy() != undefined) {
            WA.chat.sendChatMessage('Sorry, the spy job is already taken 😱', `${utils.translations.translate('views.choice.title')} 🕵️‍♂️`);
            return;
        }

        // Open the modal to choose the Spy job
        WA.ui.modal.openModal({
            allowApi: true,
            position: "center",
            allow: "fullscreen",
            title: "become spy",
            src : `${rootLink}/views/choice/becomeSpy.html`,
        }, () => {
            WA.controls.restorePlayerControls();
            checkAllPlayersGotJob();
        });
    })

    // Choose acheologist job
    WA.room.onEnterLayer('archeo').subscribe(async() => {
        // Check if the Archeo job is already taken
        if(jobArcheo() != undefined) {
            WA.chat.sendChatMessage('Sorry, the spy job is already taken 😱', `${utils.translations.translate('views.choice.title')} 🕵️‍♂️`);
            return;
        };

        // Open the modal to choose the Archeo job
        WA.ui.modal.openModal({
            allowApi: true,
            position: "center",
            allow: "fullscreen",
            title: "become spy",
            src : `${rootLink}/views/choice/becomeArchaeologist.html`,
        }, () => {
            WA.controls.restorePlayerControls();
            checkAllPlayersGotJob();
        });
    });

    // Take a croissant (useless, but funny)
    let takeCroissant: ActionMessage
    WA.room.onEnterLayer('croissants').subscribe(() => {
        takeCroissant = WA.ui.displayActionMessage({
            message: utils.translations.translate('utils.executeAction', {action : utils.translations.translate('choice.takeCroissantMessage')}),
            callback: () => {
                const inventorySize = inventory.getInventory().length
                inventory.addToInventory({
                    id: `croissant${inventorySize}`,
                    name: 'Croissant',
                    description: 'choice.looksDelicious',
                    image: 'croissant.png'
                })
            }
        });
    });

    WA.room.onLeaveLayer('croissants').subscribe(() => {
        takeCroissant.remove()
    });

    // Door left on choice room
    WA.room.onEnterLayer('door_left_zone').subscribe(() => {
        WA.room.hideLayer('closedoor_left');
        WA.room.showLayer('opendoor_left');
    });
    WA.room.onLeaveLayer('door_left_zone').subscribe(() => {
        WA.room.showLayer('closedoor_left');
        WA.room.hideLayer('opendoor_left');
    });

    WA.room.onEnterLayer('door_right_zone').subscribe(() => {
        WA.room.hideLayer('closedoor_right');
        WA.room.showLayer('opendoor_right');
    });
    WA.room.onLeaveLayer('door_right_zone').subscribe(() => {
        WA.room.showLayer('closedoor_right');
        WA.room.hideLayer('opendoor_right');
    });

    // Get players
    await WA.players.configureTracking()
    WA.players.onPlayerEnters.subscribe(async (player: RemotePlayerInterface) => {
        console.log(`Player ${player.name} entered your nearby zone`);
        if([...WA.players.list()].length === 1) {
            bannerTheTeamIsComplete();
        }else{
            bannerInviteUser();   
        }
    });

    WA.players.onPlayerLeaves.subscribe(async (player: RemotePlayerInterface) => {
        console.log(`Player ${player.name} leave your nearby zone`);
        if([...WA.players.list()].length === 1) {
            bannerTheTeamIsComplete();
        }else{
            bannerInviteUser();   
        }
    });

    const list = WA.players.list()
    if([...list].length === 1) {
        bannerTheTeamIsComplete();
    }else{
        bannerInviteUser();   
    }

    // When all players have a job, send them to next map
    WA.state.onVariableChange('allPlayersGotJob').subscribe(async (value) => {
        bannerTheTeamIsComplete();
        if(value) {
            choiceSound.stop();
            await saveGameStep(STEP_GAME);
            WA.nav.goToRoom('./museum.tmj');
        }
    });

    WA.state.onVariableChange(JobPlayerVaraible.spyPlayer).subscribe((value) => {
        console.info('onVariableChange => spyPlayer', value);
        bannerTheTeamIsComplete();
    });

    WA.state.onVariableChange(JobPlayerVaraible.archaeologistPlayer).subscribe((value) => {
        console.info('onVariableChange => archaeologistPlayer', value);
        bannerTheTeamIsComplete();
    });

}).catch(e => console.error(e))

export {};
