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

// function to disable the whell of the mouse
export const disableMouseWheel = () => {
    window.parent.postMessage({
        type: "disableWheelZoom"
    }, "*");
};

// function to disabled the map editor
export const disableMapEditor = () => {
    window.parent.postMessage({
        type: "disableMapEditor"
    }, "*");
};

// function to disable screen sharing
export const disableScreenSharing = () => {
    window.parent.postMessage({
        type: "disableScreenSharing"
    }, "*");
};
