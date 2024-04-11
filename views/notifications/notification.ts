

import * as utils from '../../src/utils/index.js'

document.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const container = document.getElementById('notificationContainer')
    const status = document.getElementById('status')
    const content = document.getElementById('content')
    const title = document.getElementById('title')

    const notificationIndex = urlParams.get('index') as unknown as  number
    if (container) {
      container.style.setProperty('margin-top', (notificationIndex * 100) + 'px')
    }

    if (status) {
      status.classList.add(`bg-${urlParams.get('type')}`)
    }

    if (content) {
      content.innerText = utils.translations.translate(urlParams.get('content'))
    }

    const titleParam = urlParams.get('title')
    if (title) {
      if (!titleParam || titleParam === 'null') {
        title.remove()
      } else {
        title.innerText = utils.translations.translate(titleParam)
      }
    }

    if (container) {
      container.classList.remove('hidden')
      setTimeout(() => {
        container.classList.add('hidden')
      }, 4000);
    }
  })
})

export {}