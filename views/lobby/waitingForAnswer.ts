
import * as modules from '../../src/modules/index.js'
import { onInit } from '../../src/utils/init.ts'

const cancelInvitation = () => {
  console.log('modules.lobby.askforcancelinvitation')
  modules.lobby.askForCancelInvitation()
}

window.addEventListener("DOMContentLoaded", () => {
  onInit().then(async () => {
    const utils = await import('../../src/utils/index.js')

    const cancelButton     = document.getElementById('cancelButton')
    const waitingForAnswer = document.getElementById('waitingForAnswer')

    if (cancelButton) {
      cancelButton.innerText = utils.translations.translate('modules.lobby.cancel')
      cancelButton.addEventListener("click", () => {
        cancelInvitation()
      })
    }

    if (waitingForAnswer) {
      waitingForAnswer.innerHTML = utils.translations.translate('modules.lobby.waitingForAnswer')
    }
  })
})

export {
  cancelInvitation
}