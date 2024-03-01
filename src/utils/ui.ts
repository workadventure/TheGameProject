/// <reference types="@workadventure/iframe-api-typings" />

const BG_COLOR = "#ff0000";
const TEXT_COLOR = "#ffffff";

export const openBanner = (id: string, text: string, timeToClose: number = 0) => {
    WA.ui.banner.openBanner({
        id,
        text,
        bgColor: BG_COLOR,
        textColor: TEXT_COLOR,
        closable: true,
        timeToClose
    });
    return id;
}
