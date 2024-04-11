/// <reference types="@workadventure/iframe-api-typings" />

import {Position} from "@workadventure/iframe-api-typings/front/Api/Iframe/player";
import {UIWebsite} from "@workadventure/iframe-api-typings";

type directionType = 'right' | 'left' | 'down' | 'up'

const initializeCameraMovingMode = async () => {
  // Initiate needed player variables
  WA.player.state.currentCameraZoom = 500
  WA.player.state.currentCameraPosition = await getCameraPosition()
  WA.player.state.askForCloseCameraMovingWebsite = false

  WA.player.state.onVariableChange('currentCameraPosition').subscribe( (value) => {
      const position = value as Position
      WA.camera.set(position.x, position.y, undefined, undefined, false, true)
  })

  WA.player.state.onVariableChange('askForCloseCameraMovingWebsite').subscribe((value) => {
    if (value) {
      closeCameraMovingWebsite()
    }
  })
}

const getCameraPosition: () => Promise<Position> = async () => {
  if (WA.player.state.currentCameraPosition) {
    return WA.player.state.currentCameraPosition as Position
  }
  const position = await WA.player.getPosition()
  return {
    x: position.x,
    y: position.y
  }
}

const move = async (direction: directionType) => {
  let position = await getCameraPosition()

  let maxPosX = WA.state.mapWidth ? (WA.state.mapWidth as number)*32 - (WA.player.state.currentCameraZoom as number)/2 : null
  let maxPosY = WA.state.maxHeight ? (WA.state.maxHeight as number)*32 - (WA.player.state.currentCameraZoom as number)/2 : null

  let minPosX = (WA.player.state.currentCameraZoom as number)/2
  let minPosY = (WA.player.state.currentCameraZoom as number)/2

  switch (direction) {
    case 'left':
      if (position.x - 100 <= minPosX) {
        position.x = minPosX
      } else {
        position.x -= 100
      }
      break;
    case 'right':
      if (maxPosX) {
        if (position.x + 100 >= maxPosX) {
          position.x = maxPosX
        } else {
          position.x += 100
        }
      } else {
        position.x += 100
      }
      break;
    case 'up':
      if (position.y - 100 <= minPosY) {
        position.y = minPosY
      } else {
        position.y -= 100
      }
      break;
    case 'down':
      if (maxPosY) {
        if (position.y + 100 >= maxPosY) {
          position.y = maxPosY
        } else {
          position.y += 100
        }
      } else {
        position.y += 100
      }
      break;
  }

  WA.player.state.currentCameraPosition = position
}

const moveTo = (x: number, y: number) => {
  WA.player.state.currentCameraPosition = {
    x: x,
    y: y
  }
}


let cameraMovingWebsite: UIWebsite|null = null
const openCameraMovingWebsite = async () => {
  /*cameraMovingWebsite = await WA.ui.website.open({
    url: `${rootLink}/views/cameraMoving/cameraMoving.html`,
    allowApi: true,
    allowPolicy: "",
    position: {
      vertical: "top",
      horizontal: "left",
    },
    size: {
      height: "100vh",
      width: "50vw",
    },
  })*/
  WA.player.state.askForCloseComputerWebsite = false
}

const closeCameraMovingWebsite = () => {
  cameraMovingWebsite?.close()
  cameraMovingWebsite = null
  WA.camera.followPlayer(true)
}

const setCameraPositionToPlayerPosition = async () => {
  WA.player.state.currentCameraPosition = await WA.player.getPosition()
}

const setZoom = (value: number) => {
  WA.player.state.currentCameraZoom = value
}

const getZoom = () => {
  return  WA.player.state.currentCameraZoom
}

export {
  initializeCameraMovingMode,
  getCameraPosition,
  move,
  openCameraMovingWebsite,
  closeCameraMovingWebsite,
  setCameraPositionToPlayerPosition,
  setZoom,
  getZoom,
  moveTo
}