
import * as modules from '../../src/modules/index.js'
import * as utils from '../../src/utils/index.js'
import { onInit } from '../../src/utils/init.ts'

const getInvitorName = () => {
  return 'TEST' // TODO
}

const refuseInvitation = () => {
  modules.lobby.askForCloseInvitationWebsite()
}

const acceptInvitation = () => {
  modules.lobby.acceptInvitation()
}

window.addEventListener("DOMContentLoaded", () => {
  console.log('DOM content loaded')
  onInit().then(async () => {
    const spanInvitation = document.getElementById('youHaveBeenInvited')
    const spanName       = document.getElementById('name')
    const acceptButton   = document.getElementById('accept')
    const refuseButton   = document.getElementById('refuse')

    if (spanInvitation) {
      spanInvitation.innerHTML = utils.translations.translate('modules.lobby.youHaveBeenInvitedBy')
    }

    if (spanName) {
      spanName.innerHTML = getInvitorName()
    }

    if (acceptButton) {
      acceptButton.innerText = utils.translations.translate('modules.lobby.accept')
      acceptButton.addEventListener("click", () => {
        acceptInvitation()
      })
    }

    if (refuseButton) {
      refuseButton.innerText = utils.translations.translate('modules.lobby.refuse')
      refuseButton.addEventListener("click", () => {
        refuseInvitation()
      })
    }
  })
})

export {
  refuseInvitation,
  acceptInvitation,
  getInvitorName
}