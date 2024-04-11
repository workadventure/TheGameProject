import * as utils from '../../src/utils/index.js'

document.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(async () => {

    const content = document.getElementById('content')
    const note = document.getElementById('note')
    const closeButton = document.getElementById('close')

    if (content) {
      content.innerText = utils.translations.translate(`views.cheatSheet.content`)
    }

    if (note) {
      note.innerText = utils.translations.translate(`views.cheatSheet.note`)
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        WA.player.state.askForCloseCheatSheet = true
      })
    }
  })
})

export {}