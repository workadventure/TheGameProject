
import * as utils from '../../src/utils/index.js'
import * as modules from '../../src/modules/index.js'
import { titleEnum } from '../../src/modules/discussionv2.js'

const getTitle = (params:string|null) => {
  return utils.translations.translate(params)
}

const getText = (params:string|null) => {
  return utils.translations.translate(params)
}

const getCloseDiscussionButtonText = (params:string|null) => {
  return utils.translations.translate(params)
}

const closeDiscussionWebsite = () => {
  modules.discussion.askForDiscussionWebsiteClose()
}

document.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const title = document.getElementById('title')
    const textElement = document.getElementById('text') as HTMLParagraphElement;
    const closeDiscussionButton = document.getElementById('closeButton')

    // Discussion title
    if (title) {
      const titleParam = urlParams.get('title');
      title.innerText = getTitle(titleParam);

      const pictureElement = document.getElementById('avatar') as HTMLImageElement|undefined;
      if(pictureElement != undefined){
        switch(titleParam){
          case titleEnum.mySelf:
            pictureElement.src = await WA.player.getWokaPicture();
          break;
          case titleEnum.museumGuest:
            pictureElement.src = "/images/discussions/museumGuest.png";
          break;
          case titleEnum.keeperName:
            pictureElement.src = "/images/discussions/museumGay.png";
          break;
          case titleEnum.bombFailure:
            pictureElement.src = "/images/discussions/bomb.png";
          break;
          case titleEnum.annuaryTitle:
            pictureElement.src = "/images/discussions/secretBook.png";
          break;
          case titleEnum.badGuy:
            pictureElement.src = "/images/discussions/badGuy.png";
          break;

          case titleEnum.mapRetrieved:
          case titleEnum.voiceOver:
          default:
            pictureElement.src = "/images/discussions/content.png";
        }
      }
    }

    // Discussion text
    if (textElement) {
      textElement.innerText = getText(urlParams.get('text'))
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