
import * as utils from '../../src/utils/index.js'
import { onInit } from '../../src/utils/init.ts'

document.addEventListener("DOMContentLoaded", () => {
  onInit().then(async () => {
    const picture = document.getElementById('picture') as HTMLImageElement;
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const date = document.getElementById('date');

    console.log('WA.player', utils.translations);

    if (content) {
      content.innerText = utils.translations.translate('views.newspaper.text');
    }

    if (title) {
      title.innerText = utils.translations.translate('views.newspaper.title', {
        name: WA.player.name
      })
    }

    if (picture) {
        picture.src = await WA.player.getWokaPicture()
    }

    if (date) {
      date.innerText = new Date().toDateString()
    }
  })
})