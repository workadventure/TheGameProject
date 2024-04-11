
import * as modules from '../../src/modules/index.js'
import * as utils from '../../src/utils/index.js'
import {RemotePlayerInterface} from "@workadventure/iframe-api-typings/front/Api/Iframe/Players/RemotePlayer";

// Generate players list
const generatePlayersListButtons = async (element: HTMLElement) => {
    // user is not authenticated
    if (!WA.player.isLogged) {
      const div = document.createElement('div')
      div.innerText = utils.translations.translate('modules.lobby.connectToInvite')
      div.classList.add('alert')
      div.classList.add('error')
      div.classList.add('mb-2')
      element.prepend(div)
    }

    // set player list
    const players = await modules.lobby.getPlayersList()

    for (let player of players) {
      element.appendChild(getPlayerButton(player))
    }
}

// One item in players list
const getPlayerButton = (player: RemotePlayerInterface) => {
  let child = document.createElement('div')
  child.classList.add('player-line')

  let image = document.createElement('img')
  image.setAttribute('src', player.state.playerImage as string)

  let name = document.createElement('span')
  name.innerText = player.name

  let button:HTMLElement

  // User cannot invite unAuthenticated users
  if (player.state.isAuthenticated) {
    button = document.createElement('button')
    button.innerText = utils.translations.translate('modules.lobby.invite')
    button.classList.add('btn')
    button.classList.add('bg-info')

    // Cannot invite players if is not authenticated
    if (!WA.player.isLogged) {
      button.classList.add('bg-error')
      button.setAttribute('disabled', '1')
    } else {
      button.classList.add('bg-info')
    }
  } else {
    button = document.createElement('div')
    button.innerText = utils.translations.translate('modules.lobby.notAuthenticated')
    button.classList.add('error')
  }

  button.addEventListener("click", () => {
    console.log("Tentative d'inviter " + player.name + ' : ' + player.playerId)
    if (modules.lobby.canInvitePLayer(player)) {
      modules.lobby.invitePlayer(player)
    } else {
      // TODO : Toast website open ? or WOKA BANNER ? or notification module ?
      console.log(utils.translations.translate('modules.lobby.playerIsNotAvailable'))
    }
  })

  // Cannot invite player if he has already been invited or has already invited someone
  if (!modules.lobby.canInvitePLayer(player)) {
    button.setAttribute('disabled', 'disabled')
  }

  child.appendChild(image)
  child.appendChild(name)
  child.appendChild(button)

  return child
}

// Close website
const closePlayersListWebsite = () => {
  modules.lobby.askForPlayersListWebsiteClose()
}

window.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(async () => {
    // Get HTML elements
    const playerList = document.getElementById('playerList')
    const closeButton = document.getElementById('close')

    // Générer la liste des joueurs à proximité
    if (playerList) {
      playerList.innerText = utils.translations.translate('modules.lobby.playersList')
      await generatePlayersListButtons(playerList)
    }

    // Bouton de fermeture
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        closePlayersListWebsite()
      })
      closeButton.innerText = utils.translations.translate('modules.lobby.close')
    }
  })
})

export {
  generatePlayersListButtons,
  getPlayerButton,
  closePlayersListWebsite,
}