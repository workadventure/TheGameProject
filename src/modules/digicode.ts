/// <reference types="@workadventure/iframe-api-typings" />

import {UIWebsite} from "@workadventure/iframe-api-typings";
import {rootLink} from "../config";
import { sounds } from '../modules'

type codesCallbackType = {
  code: `${number}`,
  callback: Function
}

const digicodes: Record<string, Record<string, Function>> = {}

const initiateDigicodes = () => {
  WA.player.state.askForCode = null

  // If user want to close the digicode
  WA.player.state.onVariableChange('askForDigicodeWebsiteClose').subscribe((value) => {
    if (value) {
      closeDigicode()
    }
  })

  // If user is trying a code
  WA.player.state.onVariableChange('askForCode').subscribe((value) => {
    if (value) {
      const [id, code] = (value as string).split('-')
      if (digicodes[id] && digicodes[id][code]) {
        digicodes[id][code]()
      } else {
        sounds.playSound('failureSound')
        closeDigicode()
      }
    }
  })
}

const createDigicode = (id: string, codes: Array<codesCallbackType>) => {
  for (let i = 0; i < codes.length; i++) {
    if (!digicodes[id]) {
      digicodes[id] = {}
    }
    digicodes[id][codes[i].code] = codes[i].callback
  }
}

let digicodeWebsite: UIWebsite|null = null
const openDigicode = async (id: string) => {
  // Disable controls while digicode is open
  WA.controls.disablePlayerControls()

  digicodeWebsite = await WA.ui.website.open({
    url: `${rootLink}/views/digicode/digicode.html?id=${id}`,
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

  WA.player.state.askForDigicodeWebsiteClose = false
}

const closeDigicode = () => {
  digicodeWebsite?.close()
  digicodeWebsite = null

  // Restore player controle after closing card
  WA.controls.restorePlayerControls()
}

const askForDigicodeWebsiteClose = () => {
  WA.player.state.askForDigicodeWebsiteClose = true
}

const askForCode = (id: string, code: string) => {
  WA.player.state.askForCode = `${id}-${code}`
}

export {
  initiateDigicodes,
  createDigicode,
  openDigicode,
  askForDigicodeWebsiteClose,
  closeDigicode,
  askForCode
}