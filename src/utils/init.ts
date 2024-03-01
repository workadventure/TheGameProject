/// <reference types="@workadventure/iframe-api-typings" />

export const onInit = async () => {
    await WA.onInit();

    // Initialise the game control for the experience
    // @ts-ignore
    WA.controls.disableInviteButton();
    console.info('During this game, the invite button is disabled');
    // @ts-ignore
    WA.controls.disableRightClick();
    console.info('During this game, the right click button is disabled');
    // @ts-ignore
    WA.controls.disableScreenSharing();
    console.info('During this game, the screen sharing is disabled');
    // @ts-ignore
    WA.controls.disableMapEditor();
    console.info('During this game, the map editor is disabled');
}