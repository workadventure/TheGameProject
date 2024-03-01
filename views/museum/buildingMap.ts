

import { onInit } from "../../src/utils/init"

document.addEventListener("DOMContentLoaded", () => {
  onInit().then(async () => {
    const askForDeactivateCamera = (value: string | null) => {
      WA.player.state.askForDeactivateCamera = value ? 'cameraZones/' + value : null
    }

    const askForSeeRoom = (value: string | null) => {
      WA.player.state.askForSeeRoom = value
    }

    const askForCloseComputerWebsite = () => {
      WA.player.state.askForCloseComputerWebsite = true
    }
    const askForSwitchLights = () => {
      WA.player.state.askForSwitchLights = !WA.player.state.askForSwitchLights
    }

    const cameras = document.getElementsByClassName('camera')
    const rooms = document.getElementsByClassName('room')
    const closeButton = document.getElementById('closeButton')
    const hackingWindow = document.getElementById('hackingWindow')
    const lightSwitch = document.getElementById('lightnings')

    let isHacking = false;
    if (lightSwitch && hackingWindow) {
      lightSwitch.addEventListener('click', () => {
        if (!isHacking) {
          isHacking = true;
          hackingWindow.classList.add('show')
          setTimeout(() => {
            askForSwitchLights()
            hackingWindow.classList.remove('show')
            isHacking = false
          }, 2000)
        }
      })
    }

    if (cameras && hackingWindow) {
      for (let i = 0; i < cameras.length; i++) {
        cameras[i].addEventListener('click', () => {
          if (!isHacking) {
            isHacking = true;
            hackingWindow.classList.add('show')
            setTimeout(() => {
              for (let i = 0; i < cameras.length; i++) {
                cameras[i].classList.remove('deactivated')
              }
              cameras[i].classList.add('deactivated')
              askForDeactivateCamera(cameras[i].getAttribute('id'))
              hackingWindow.classList.remove('show')
              isHacking = false
            }, 2000)
          }
        })
      }
    }

    if (rooms && hackingWindow) {
      for (let i = 0; i < rooms.length; i++) {
        rooms[i].addEventListener('click', () => {
          if (!isHacking) {
            isHacking = true;
            hackingWindow.classList.add('show')
            setTimeout(() => {
              const roomId = rooms[i].getAttribute('id');
              console.log('room', roomId?.replace('room', ''))
              if (roomId) {
                askForSeeRoom(roomId.replace('room', ''))
              }
              hackingWindow.classList.remove('show')
              isHacking = false
            }, 2000)
          }
        })
      }
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        askForCloseComputerWebsite()
      })
    }

    let wokaCircle = document.getElementById('WokaCircle') as SVGCircleElement | null;
    WA.state.onVariableChange('currentCameraPosition').subscribe((value) => {
      const {x, y} = value as {x: number, y: number};
      if(!wokaCircle){
        wokaCircle = document.getElementById('WokaCircle') as SVGCircleElement | null;
      }
      if(wokaCircle){
        console.log('wokaCircle', wokaCircle, x, y);
        wokaCircle.setAttribute('cx', `${x + 100}`);
        wokaCircle.setAttribute('cy', `${y + 200}`);
      }
    });
  })
})