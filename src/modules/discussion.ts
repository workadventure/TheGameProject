import {rootLink} from "../config";

// Name of the menubarbutton
const buttonName = 'discussionButton'

// Open job wallet website
const openDiscussionWebsite = async (
    title:string,
    text:string,
    close:string = 'views.choice.close',
    view = "discussion",
    callbackWhenClosed: Function|null = null) => {
  // Disable controls while card is open
  WA.controls.disablePlayerControls()

  // Open popup
  WA.ui.modal.openModal({
    title: title,
    src: `${rootLink}/views/discussions/${view}.html?title=${title}&text=${text}&close=${close}`,
    allowApi: true,
    allow: "fullscreen;camera;microphone",
    position: "center",
  })

  WA.player.state.askForDiscussionWebsiteClose = false

  WA.player.state.onVariableChange('askForDiscussionWebsiteClose').subscribe((value) => {
    if (value) {
      closeDiscussionWebsite(callbackWhenClosed)
      callbackWhenClosed = null
    }
  })
}

const askForDiscussionWebsiteClose = () => {
  WA.player.state.askForDiscussionWebsiteClose = true
}

// Close discussion website
const closeDiscussionWebsite = (callback: Function|null = null) => {
  WA.ui.modal.closeModal();

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
}