
import * as utils from '../../src/utils/index.js'
import * as modules from '../../src/modules/index.js'
import { onInit } from '../../src/utils/init.ts'

const getTitle = (params:string|null) => {
  console.log(params)
  return utils.translations.translate(params)
}

const getText = (params:string|null) => {
  console.log(params)
  return utils.translations.translate(params)
}

const getCloseDiscussionButtonText = (params:string|null) => {
  return utils.translations.translate(params)
}

const closeDiscussionWebsite = () => {
  modules.discussion.askForDiscussionWebsiteClose()
}

document.addEventListener("DOMContentLoaded", () => {
  onInit().then(async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const title = document.getElementById('title')
    const text = document.getElementById('text')
    const closeDiscussionButton = document.getElementById('closeButton')

    // Discussion title
    if (title) {
      title.innerText = getTitle(urlParams.get('title'))
    }

    // Discussion text
    if (text) {
      text.innerText = getText(urlParams.get('text'))
    }

    // Close button event
    if (closeDiscussionButton) {
      closeDiscussionButton.innerText = getCloseDiscussionButtonText(urlParams.get('close'))
      closeDiscussionButton.addEventListener("click", () => {
        closeDiscussionWebsite()
      })
    }
  }).catch(e => console.error(e))
})

export {
  getTitle,
  getText,
  getCloseDiscussionButtonText
}