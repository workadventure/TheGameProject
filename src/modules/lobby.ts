// Lobby initialisation : must be called in main.ts only
import { rootLink } from "../config";

import {RemotePlayerInterface} from "@workadventure/iframe-api-typings";
import {UIWebsite} from "@workadventure/iframe-api-typings";

const initiateLobby = async () => {
  await WA.player.state.saveVariable('isInviting', null, {public: true})
  await WA.player.state.saveVariable('hasBeenInvited', null, {public: true})
  await WA.player.state.saveVariable('hasAcceptedInvitation', null, {public: true})

  // Players tracking
  await WA.players.configureTracking()

  // Receive invitations from other players
  WA.players.onVariableChange('isInviting').subscribe((event: any) => {
    if (event.value === WA.player.uuid) { // Works better than player id, but player MUST be logged
      console.info('vous avez été invité par :' + event.player.name)
      WA.player.state.hasBeenInvited = event.value
      openInvitationWebsite()
    }
  })

  // Receive invitation refuse from other players
  WA.players.onVariableChange('hasBeenInvited').subscribe((event: any) => {
    if (!event.value && WA.player.state.isInviting === event.player.uuid) { // Works better than player id, but player MUST be logged
      console.info(event.player.name + 'a refusé votre invitation')
      WA.player.state.isInviting = null // Reset is inviting so that other users can invite current
      // TODO : Close waiting for answer website
    }
  })

  // Receive invitation cancel from invitor
  WA.players.onVariableChange('isInviting').subscribe((event: any) => {
    if (!event.value && WA.player.state.hasBeenInvited === event.player.uuid) { // Works better than player id, but player MUST be logged
      console.info(event.player.name + 'a annulé son invitation') // TODO : visual notification module
      WA.player.state.hasBeenInvited = null // Reset so that other users can invite current
      closeInvitationWebsite() // Close website because user cannot accept or refuse anymore
      resetInvitor()
    }
  })

  // Receive invitation acceptation
  WA.players.onVariableChange('hasAcceptedInvitation').subscribe((event: any) => {
    console.info('Someone accepted en invitation', event.player.uuid)
    if (event.value === WA.player.uuid) { // Works better than player id, but player MUST be logged
      openYouAreGoingToBeRedirectedWebsite()
      console.info('REDIRECTION VERS LE JEU ! pour :' + WA.player.name + ' et ' + event.player.name)
      // TODO : display modal with message : "Vous allez être ridirigé vers le jeu" with a button "C'est parti !"
    }
  })

  // Save user image in variable so other users can get it
  await WA.player.state.saveVariable(
    'playerImage',
    await WA.player.getWokaPicture(),
    {
      public: true
  })

  // Know if user authenticated to prevent others users to invite him
  await WA.player.state.saveVariable(
    'isAuthenticated',
    WA.player.isLogged,
    {
      public: true
  })

  // Watch variables to close website
  WA.player.state.onVariableChange('askForPlayersListWebsiteClose').subscribe((value) => {
    if (value) {
      closePlayersListWebsite()
    }
  })

  WA.player.state.onVariableChange('askForPlayersInvitationWebsiteClose').subscribe((value) => {
    if (value) {
      closeInvitationWebsite()
      resetInvitor()
    }
  })

  WA.player.state.onVariableChange('askForCancelInvitation').subscribe((value) => {
    console.info('askForCancelInvitation changed', value)
    if (value) {
      console.info('value')
      closeWaitingForAnswerWebsite()
      resetInvited()
    }
  })

  WA.player.state.onVariableChange('isInviting').subscribe((value) => {
    if (value) {
      // Close players list
      closePlayersListWebsite()

      // Open waiting modal
      openWaitingForAnswerWebsite()
    }
  })

  // Add button to open players list
  WA.ui.actionBar.addButton({
    id: 'playerListButton',
    label: 'Joueurs', // TODO  :translations
    callback: () => {
      if (!waitingForAnswerWebsite) {
        if (!playerListWebsiteInstance) {
          openPlayersListWebsite()
        } else {
          closePlayersListWebsite()
        }
      }
    }
  })
}

let playerListWebsiteInstance: UIWebsite|null = null
const openPlayersListWebsite = async () => {
  playerListWebsiteInstance =  await WA.ui.website.open({
    url: `${rootLink}/views/lobby/playerList.html`,
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

  WA.player.state.askForPlayersListWebsiteClose = false
}

const closePlayersListWebsite = () => {
  console.info('close player list', playerListWebsiteInstance)
    playerListWebsiteInstance?.close()
    playerListWebsiteInstance = null
}

const askForPlayersListWebsiteClose = () => {
  WA.player.state.askForPlayersListWebsiteClose = true
}

// Retrieve a list of all other users
const getPlayersList = async () => {
  await WA.players.configureTracking()
  return WA.players.list()
}

// Know if user can invite player passed in parameter
const canInvitePLayer = (player: RemotePlayerInterface) => {
  // If player has invited someone
  // If player has been invited by someone
  if (!!player.state.isInviting || !!player.state.hasBeenInvited) {
    return false
  }
  return true
}

const invitePlayer = (player: RemotePlayerInterface) => {
  WA.player.state.saveVariable("isInviting", player.uuid, {
    public: true,
    persist: true,
    ttl: 24 * 3600,
    scope: "world",
  });
}

let invitationWebsiteInstance:UIWebsite|null = null
// Open invitation modal so that user can accept or refuse
const openInvitationWebsite = async () => {
  invitationWebsiteInstance =  await WA.ui.website.open({
    url: `${rootLink}/views/lobby/invitationReceived.html`,
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

  WA.player.state.askForPlayersInvitationWebsiteClose = false
}

// Close invitation modal
const closeInvitationWebsite = () => {
  console.info('close invitation')
  invitationWebsiteInstance?.close()
  invitationWebsiteInstance = null
}

const resetInvitor = () => {
  WA.player.state.hasBeenInvited = null // Set has been invited to false so that other players can invite current user
}

// User ask for closing in the modal
const askForCloseInvitationWebsite = () => {
  console.info('ask for close invitation')
  WA.player.state.askForPlayersInvitationWebsiteClose = true
}

// Accept invitation
const acceptInvitation = () => {
  console.info('has been invited', WA.player.state.hasBeenInvited)
  if (WA.player.state.hasBeenInvited) {
    WA.player.state.saveVariable(
      'hasAcceptedInvitation',
      WA.player.state.hasBeenInvited, {
      public: true
    })
    openYouAreGoingToBeRedirectedWebsite()
    console.info('accepted invitation', WA.player.state.hasAcceptedInvitation)
  } else {
    console.info('Oups, une erreur est survenue (no invitor)')
  }
  closeInvitationWebsite()
}

let waitingForAnswerWebsite: UIWebsite|null = null
const openWaitingForAnswerWebsite = async () => {
  console.info('open waiting for answer website')
  waitingForAnswerWebsite =  await WA.ui.website.open({
    url: `${rootLink}/views/lobby/waitingForAnswer.html`,
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
  WA.player.state.askForCancelInvitation = false
  console.info(waitingForAnswerWebsite)
}

const closeWaitingForAnswerWebsite = () => {
  console.info('close waiting for answer website')
  waitingForAnswerWebsite?.close()
  waitingForAnswerWebsite = null
}

const resetInvited = () => {
  console.info('RESET INVITED')
  console.info('waitingForAnswerWebsite', waitingForAnswerWebsite)
  WA.player.state.isInviting = null
}

const cancelInvitation = () => {
  console.info('cancel invitation')
  resetInvited()
}

const askForCancelInvitation = () => {
  WA.player.state.askForCancelInvitation = true
}

const openYouAreGoingToBeRedirectedWebsite = async () => {
  await WA.ui.website.open({
    url: `${rootLink}/views/lobby/youAreGoingToBeRedirected.html`,
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
}

export {
  initiateLobby,
  getPlayersList,
  invitePlayer,
  canInvitePLayer,
  closePlayersListWebsite,
  askForPlayersListWebsiteClose,
  openInvitationWebsite,
  closeInvitationWebsite,
  askForCloseInvitationWebsite,
  acceptInvitation,
  openWaitingForAnswerWebsite,
  closeWaitingForAnswerWebsite,
  cancelInvitation,
  askForCancelInvitation
}