import { rootLink } from "../config";
import * as utils from "../utils";

let rankingModalIsOpened = false;
export const openRankingModal = async () => {
    WA.ui.modal.openModal({
        allowApi: true,
        position: "center",
        allow: "fullscreen",
        title: "ranking",
        src : `${rootLink}/views/ranking/ranking.html`,
    }, () => {
        rankingModalIsOpened = false;
    });
    rankingModalIsOpened = true;
};
export const closeRankingModal = async () => {
    WA.ui.modal.closeModal();
    rankingModalIsOpened = false;
};

export const addRankingButton = async () => {
    rankingModalIsOpened = false;
    // Add ranking button
    WA.ui.actionBar.addButton({
        id: 'ranking',
        type: 'action',
        imageSrc: `${rootLink}/images/ranking/ranking.svg`,
        toolTip: utils.translations.translate('views.ranking.start.title'),
        callback: async () => {
            if (!rankingModalIsOpened) {
            await openRankingModal()
            } else {
            closeRankingModal()
            }
        }
    });
};