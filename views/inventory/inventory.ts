
import * as utils from '../../src/utils/index.js'
import * as modules from '../../src/modules/index.js'

document.addEventListener("DOMContentLoaded", () => {
  WA.onInit().then(async () => {
    // Get html parts
    const inventoryTitle = document.getElementById('title')
    const inventoryContent = document.getElementById('inventoryContent')
    const closeWebsiteInventoryButton = document.getElementById('closeButton')

    // Title
    if (inventoryTitle) {
      inventoryTitle.innerText = utils.translations.translate('modules.inventory.inventory')
    }

    // Inventory content
    if (inventoryContent) {
      const inventory = modules.inventory.getInventory()
      const maxSize = modules.inventory.getMaxSize()

      for (let i = 0; i < maxSize; i++) {
        const item = document.createElement('div')
        item.classList.add('inventory-item')
        item.classList.add('bg-dark')

        if (i !== maxSize - 1) {
          item.classList.add('mr-2')
        }

        if (inventory[i]) {
          item.setAttribute(
            'data-description',
            utils.translations.translate(inventory[i].description)
          )

          const itemName = document.createElement('div')
          itemName.classList.add('inventory-item-name')
          itemName.classList.add('bg-main')
          itemName.innerText = utils.translations.translate(inventory[i].name)

          const itemImageContainer = document.createElement('div')
          const itemImage = document.createElement('object')
          itemImage.setAttribute('type', 'image/png')
          itemImage.setAttribute('data', `../../images/inventory/${inventory[i].image ? inventory[i].image  : 'undefined.png'}`)

          const itemDefaultImage = document.createElement('img')
          itemDefaultImage.setAttribute('src', `../../images/inventory/${modules.inventory.getDefaultImage()}`)
          itemDefaultImage.setAttribute(
            'alt',
            utils.translations.translate('modules.inventory.inventoryItem', {itemNo: i + 1})
          )
          itemImage.appendChild(itemDefaultImage)

          itemImageContainer.classList.add('inventory-item-image')

          itemImageContainer.appendChild(itemImage)
          item.appendChild(itemImageContainer)
          item.appendChild(itemName)
        } else {
          const emptyDiv = document.createElement('div')
          emptyDiv.classList.add('position-absolute')
          emptyDiv.classList.add('w-100')
          emptyDiv.classList.add('h-100')
          emptyDiv.classList.add('d-flex')
          emptyDiv.classList.add('align-items-center')
          emptyDiv.classList.add('justify-content-center')
          emptyDiv.innerText = utils.translations.translate('modules.inventory.empty')
          item.appendChild(emptyDiv)
          item.classList.add('empty')
          item.classList.add('text-black')
        }
        inventoryContent.appendChild(item)
      }
    }

    if (closeWebsiteInventoryButton) {
      closeWebsiteInventoryButton.innerText = utils.translations.translate('modules.inventory.close')
      closeWebsiteInventoryButton.addEventListener('click', () => {
        modules.inventory.askForCloseInventory()
      })
    }
  }).catch(e => console.error(e))
})

export {}