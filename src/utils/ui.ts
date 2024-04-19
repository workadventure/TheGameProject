/// <reference types="@workadventure/iframe-api-typings" />

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
