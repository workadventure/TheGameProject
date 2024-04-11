
import * as utils from '../../src/utils/index.js'
import * as modules from '../../src/modules/index.js'

const WRONG_TIME = 30

document.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(() => {
    const askForDefuseBomb = () => {
      modules.sounds.playSound('successSound')
      WA.player.state.askForDefuseBomb = true
    }

    const askForBoom = () => {
      WA.player.state.askForBoom = true
    }

    const clickableParts = document.getElementsByClassName('clickable')

    const patterns = [
      ['pave1', 'pave5', 'pave3', 'cableRed', 'cableWhite', 'boum'],
      ['pave5', 'pave6', 'pave9', 'cableBlue', 'cableYellow', 'cableBlack', 'press'],
      ['cableRed', 'cableYellow', 'pave9', 'pave6', 'pave4', 'pave0', 'boum'],
      ['pave1', 'cableGreen', 'pave9', 'pave7', 'cableOrange', 'pave2', 'boum'],
      ['cableYellow', 'cableRed', 'pave8', 'pave6', 'cableWhite', 'press'],
      ['cableOrange', 'cableBlue', 'pave4', 'pave3', 'cableRed', 'pave0', 'press'],
    ]

    const resetBomb = () => {
      if (clickableParts) {
        for (let i = 0; i < clickableParts.length; i++) {
          clickableParts[i].classList.remove('clicked')
        }
      }
    }

    const whenWrong = () => {
      modules.sounds.playSound('failureSound')
      const losesInfosElement = document.getElementById('losesInfos')

      if (losesInfosElement) {
        const div = document.createElement('div')
        div.innerText = utils.translations.translate('bomb.bomb.wrong', {
          number: WRONG_TIME
        })

        losesInfosElement.appendChild(div)
      }

      counter = (counter - WRONG_TIME < 0) ? 0 : counter -WRONG_TIME
      resetBomb()
    }

    const whenResolved = () => {
      askForDefuseBomb()
    }

    modules.arrayFilling.setArrayFilling('bomb', patterns, whenWrong, whenResolved)

    if (clickableParts) {
      for (let i = 0; i < clickableParts.length; i++) {
        clickableParts[i].addEventListener('click', () => {
          console.log(clickableParts[i].getAttribute('id'))
          console.log('COUCOUCOUCOUC')
          clickableParts[i].classList.add('clicked')
          modules.arrayFilling.testArrayFilling('bomb', clickableParts[i].getAttribute('id') as string)
        })
      }
    }

    // Countdown
    let counter = 60 * 5 // 5 minutes
    const displayTimer = document.getElementById('counter')

    let bombInterval: NodeJS.Timer|null = null
    if (displayTimer) {
      bombInterval = setInterval(() => {
        let minutes = 0
        let seconds = 0

        if (counter > 0) {
          --counter
          minutes = Math.floor(counter / 60)
          seconds = Math.floor(counter % 60)
        } else {
          askForBoom()
          counter = 0;
        }


        displayTimer.textContent = minutes + ":" + (seconds < 10 ? '0'+seconds.toString() : seconds)

        if (counter <= 0) {
          if (bombInterval) {
              clearInterval(bombInterval)
          }
          askForBoom()
          counter = 0;
        }
      }, 1000)
    }
  })
})

export {}