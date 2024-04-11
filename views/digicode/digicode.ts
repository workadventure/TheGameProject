
import * as modules from '../../src/modules/index.js'

document.addEventListener("DOMContentLoaded", () => {
  let currentCode = ''
  WA.onInit().then(async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')

    const codeButtons = document.getElementsByClassName('code-button')
    const cancelButton = document.getElementById('cancel')
    const validateButton = document.getElementById('validate')
    const codeDisplay = document.getElementById('codeDisplay')
    const closeButton = document.getElementById('close')

    if (codeButtons) {
      for (let i = 0; i < codeButtons.length; i++) {
        codeButtons[i].addEventListener('click', (event) => {
          if (event.target instanceof Element) {
            currentCode += event.target.id.replace('button', '') || ''
            if (codeDisplay) {
              codeDisplay.innerHTML = currentCode
            }
          }
        })
      }
    }

    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        currentCode = ''
        if (codeDisplay) {
          codeDisplay.innerHTML = currentCode
        }
      })
    }

    if (validateButton) {
      validateButton.addEventListener('click', () => {
        modules.digicode.askForCode(id as string, currentCode)
      })
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        modules.digicode.askForDigicodeWebsiteClose()
      })
    }
  })
})