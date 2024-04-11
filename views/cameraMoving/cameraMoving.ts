
import * as modules from '../../src/modules/index.js'
import * as utils from '../../src/utils/index.js'

document.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(async () => {
    const rightButton = document.getElementById('cameraMoveRight')
    const leftButton = document.getElementById('cameraMoveLeft')
    const upButton = document.getElementById('cameraMoveUp')
    const downButton = document.getElementById('cameraMoveDown')
    const closeButton = document.getElementById('close')
    const cameraMoveTitle = document.getElementById('cameraMoveTitle')

    if (rightButton) {
      rightButton.addEventListener('click', () => {
        modules.cameraMovingMode.move('right')
      })
    }

    if (leftButton) {
      leftButton.addEventListener('click', () => {
        modules.cameraMovingMode.move('left')
      })
    }

    if (downButton) {
      downButton.addEventListener('click', () => {
        modules.cameraMovingMode.move('down')
      })
    }

    if (upButton) {
      upButton.addEventListener('click', () => {
        modules.cameraMovingMode.move('up')
      })
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        WA.player.state.askForCloseCameraMovingWebsite = true
      })
    }

    if (cameraMoveTitle) {
      cameraMoveTitle.innerText = utils.translations.translate('views.cameraMoving.mobileCamera').toUpperCase()
    }
  })
})