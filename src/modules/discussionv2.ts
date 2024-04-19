import { CreateUIWebsiteEvent, UIWebsite } from "@workadventure/iframe-api-typings";
import {rootLink} from "../config";

// Name of the menubarbutton
const buttonName = 'discussionButton'

// The current website opened
let currentwebsiteOpened: UIWebsite|undefined;

enum titleEnum {
  voiceOver = "utils.voiceOver",
  mapRetrieved = "museum.mapRetrieved",
  museumGuest = "museum.guest",
  keeperName = "museum.keeperName",
  mySelf = "utils.mySelf",
  bombFailure = "bomb.bomb.failure.name",
  annuaryTitle = "views.museum.annuaryTitle",
  badGuy = "treasureEnigma.badGuy.name"
}

// Open job wallet website
const openDiscussionWebsite = async (
    title: titleEnum,
    text: string,
    close: string = 'views.choice.close',
    view = "discussion",
    callbackWhenClosed: Function|null = null
  ) => {
    // Disable controls while card is open
    WA.controls.disablePlayerControls()

    const website: CreateUIWebsiteEvent = {
      url: `${rootLink}/views/discussionsv2/${view}.html?title=${title}&text=${text}&close=${close}`,
      visible: true,
      position: {
        vertical: "bottom",
        horizontal: "middle"
      },
      allowApi: true,
      size: {
        height: "120px",
        width: "100%"
      },
      margin: {
        bottom: "80px",
        left: "10px",
        right: "10px"
      }
    }

    // Open iframe
    currentwebsiteOpened = await WA.ui.website.open(website);

    WA.player.state.askForDiscussionWebsiteClose = false

    WA.player.state.onVariableChange('askForDiscussionWebsiteClose').subscribe((value) => {
      if (value) {
        closeDiscussionWebsite(callbackWhenClosed)
        callbackWhenClosed = null
      }
    });
}

const askForDiscussionWebsiteClose = () => {
  WA.player.state.askForDiscussionWebsiteClose = true
}

// Close discussion website
const closeDiscussionWebsite = (callback: Function|null = null) => {
  // Close the current website opened
  currentwebsiteOpened?.close();
  currentwebsiteOpened = undefined;

  // Restore player controle after closing card
  WA.controls.restorePlayerControls()

  if (callback !== null) {
    callback()
  }
}

export {
  closeDiscussionWebsite,
  askForDiscussionWebsiteClose,
  openDiscussionWebsite,
  buttonName,
  titleEnum
}