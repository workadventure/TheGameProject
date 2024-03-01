
import * as utils from '../../src/utils/index.js'
import * as modules from '../../src/modules/index.js'
import { onInit } from '../../src/utils/init.ts'

const getTitle = () => {
  return utils.translations.translate(`views.jobWallet.title`, {
    job: utils.translations.translate(`views.jobWallet.jobs.${modules.job.getPlayerJob()}.name`)
  })
}

const getAttributes = () => {
  return utils.translations.translate(`views.jobWallet.jobs.${modules.job.getPlayerJob()}.attributes`, {
    name: WA.player.name
  })
}

const getDescription = () => {
  return utils.translations.translate(`views.jobWallet.jobs.${modules.job.getPlayerJob()}.description`)
}

const getPermissions = () => {
  const ul = document.createElement('ul')
  const permissions = modules.job.getUserPermissions()
  
  if(!permissions) return ul;
  for (let i = 0; i < permissions.length; i++) {
    const li = document.createElement('li')
    li.innerHTML = utils.translations.translate(
      `views.jobWallet.jobs.${modules.job.getPlayerJob()}.permissions.${permissions[i]}`
    )
    ul.appendChild(li)
  }
  return ul
}

const getCloseJobWalletWebsiteButtonText = () => {
  return utils.translations.translate(`views.jobWallet.close`)
}

const closeJobWalletWebsite = () => {
  modules.job.askForJobWalletWebsiteClose()
}

document.addEventListener("DOMContentLoaded", () => {
  onInit().then(async () => {
    // Get html parts
    const photo = document.getElementById('photo')
    const title = document.getElementById('title')
    const attributes = document.getElementById('attributes')
    const description = document.getElementById('description')
    const permissions = document.getElementById('permissions')
    const closeWebsiteWalletButton = document.getElementById('closeWalletWebsiteButton')

    // User picture
    const woka = await WA.player.getWokaPicture()
    if (photo) {
      photo.setAttribute('src', woka)
    }

    // Card title
    if (title) {
      title.innerText = getTitle()
    }

    // User attributes
    if (attributes) {
      attributes.innerHTML = getAttributes()
    }

    // User job description
    if (description) {
      description.innerText = getDescription()
    }

    // User job permissions
    if (permissions) {
      permissions.appendChild(getPermissions())
    }

    // Close button event
    if (closeWebsiteWalletButton) {
      closeWebsiteWalletButton.innerText = getCloseJobWalletWebsiteButtonText()
      closeWebsiteWalletButton.addEventListener("click", () => {
        closeJobWalletWebsite()
      })
    }
  }).catch(e => console.error(e))
})

export {
  getTitle,
  getAttributes,
  getDescription,
  getPermissions,
  closeJobWalletWebsite,
  getCloseJobWalletWebsiteButtonText
}