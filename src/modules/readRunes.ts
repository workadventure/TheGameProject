/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../utils'
import { canUser } from "./job";
import {rootLink} from "../config";
import {PlayerMessage, UIWebsite} from "@workadventure/iframe-api-typings";

let runeWebsite: UIWebsite|null = null
let readRunesAction: PlayerMessage|null = null

const initiateRunesReading = () => {
  WA.onInit().then(() => {
    // Detect when user want to close website
    WA.player.state.onVariableChange('askForRuneWebsiteClose').subscribe((value) => {
      if (value) {
        closeRuneWebsite()
      }
    })
  })
}

// Initiate a rune reading zone
  // Layer : the layer on wich the player must enter to see read message
  // params : a record containing all the params you want to pass to your view
  // customPlayerMessage : custom message displayed for read action (translation key)
  // view : the name of the view to call (by default base wich take "content" and "title" (optional) as parameter. You must put translation key in both)
const setRunesReadingZone = (layer: string, params: Record<string, string> = {}, customPlayerMessage: string ='modules.runes.see', view: string = 'base') => {
  WA.room.onEnterLayer(layer).subscribe(() => {
    readRunesAction = WA.ui.displayPlayerMessage({
      message: utils.translations.translate('utils.executeAction', {
        action: utils.translations.translate(customPlayerMessage)
      }),
      callback: () => {
        openRunesWebsite(params, view)
      }
    })
  })

  WA.room.onLeaveLayer(layer).subscribe(() => {
    readRunesAction?.remove()
  })
}

// Open the website
const openRunesWebsite = async (params: Record<string, string>, view: string) => {
  if (!canUser('readRunes')) {
    params.canRead = "0"
  }

  // Disable controls while website is open
  WA.controls.disablePlayerControls()

  // view parameters as query string
  let paramsString = ''
  for (let i = 0; i < Object.keys(params).length; i++) {
    if (i !== 0) {
      paramsString += '&'
    }
    paramsString += Object.keys(params)[i] + '=' + Object.values(params)[i]
  }

  // Open runes website
  runeWebsite = await WA.ui.website.open({
    url: `${rootLink}/views/runes/${view}.html${ paramsString ? '?' + paramsString : ''}`,
    allowApi: true,
    allowPolicy: "",
    position: {
      vertical: "middle",
      horizontal: "middle",
    },
    size: {
      height: "50vh",
      width: "50vw",
    },
  })

  WA.player.state.askForRuneWebsiteClose = false
}

const closeRuneWebsite = () => {
  runeWebsite?.close()
  runeWebsite = null

  // Restore player controle after closing website
  WA.controls.restorePlayerControls()
}

const askForRuneWebsiteClosing = () => {
  WA.player.state.askForRuneWebsiteClose = true
}

export {
  initiateRunesReading,
  setRunesReadingZone,
  askForRuneWebsiteClosing
}