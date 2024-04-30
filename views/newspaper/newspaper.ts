
import * as utils from '../../src/utils/index.js'
import { openRankingModal } from '../../src/utils/ranking';

document.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(async () => {
    const picture = document.getElementById('picture') as HTMLImageElement;
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const date = document.getElementById('date');
    const rankingButton = document.getElementById('ranking') as HTMLButtonElement;
    const linkedInButton = document.getElementById('linkedin') as HTMLButtonElement;

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

    if (rankingButton) {
      rankingButton.innerText = utils.translations.translate('views.newspaper.rankingButton');
      rankingButton?.addEventListener('click', async () => {
        openRankingModal();
      });
    }

    if (linkedInButton) {
      linkedInButton.innerText = utils.translations.translate('views.newspaper.linkedind.button');
        linkedInButton.addEventListener('click', (event) => {
        event.preventDefault();
        const articleUrl = "https://workadventu.re/explore-escape-workadventure-experiences/";
        const articleTitle = utils.translations.translate('views.newspaper.linkedind.title');
        const articleSummary = utils.translations.translate('views.newspaper.linkedind.summary');
        const articleSource = "https://workadventu.re";
        
        window.open(`https://www.linkedin.com/shareArticle?mini=false&url=${articleUrl}&title=${articleTitle}&summary=${articleSummary}&source=${articleSource}`, '_blank');
      });
    }
    
  });
});
