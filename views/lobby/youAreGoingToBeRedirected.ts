import * as utils from '../../src/utils/index.js'
import { onInit } from '../../src/utils/init.ts'

window.addEventListener("DOMContentLoaded", () => {
  onInit().then(async () => {

    const redirectionButton = document.getElementById('redirectionButton')
    const explanation = document.getElementById('explanation')

    if (explanation) {
      explanation.innerHTML = utils.translations.translate('modules.lobby.youAreGoingToBeRedirected')
    }

    if (redirectionButton) {
      redirectionButton.innerText = utils.translations.translate('modules.lobby.letSGo')
      redirectionButton.addEventListener("click", () => {
        // Go to page instead of go to room
        // --> The lobby can be used for many rooms
        // --> Pass the right url to this view --> variable ? link in get url ?
        WA.nav.goToRoom('./choice.tmj')
        //WA.nav.goToPage('https://workadventu.re/map-building/entry-exit.md') // TODO : true url
      })
    }
  })
})

export {}