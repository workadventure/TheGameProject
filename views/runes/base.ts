
import * as utils from '../../src/utils/index.js'
import * as modules from '../../src/modules/index.js'

document.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const title = document.getElementById('title')
    const content = document.getElementById('content')
    const closeButton = document.getElementById('closeButton')

    const canNotReadRunes = urlParams.get('canRead') === "0"

    const titleParam = urlParams.get('title')
    if (title) {
      if (!titleParam) {
        title.remove()
      } else {
        title.innerText = utils.translations.translate(titleParam)

        if (canNotReadRunes) {
          title.classList.add('runes-font')
        }
      }
    }

    if (content) {
      content.innerText = utils.translations.translate(urlParams.get('content'))

      if (canNotReadRunes) {
        content.classList.add('runes-font')
      }
    }

    if (closeButton) {
      closeButton.innerText = utils.translations.translate('modules.runes.close')
      closeButton.addEventListener('click', () => {
        modules.readRunes.askForRuneWebsiteClosing()
      })
    }
  })
})

export {}