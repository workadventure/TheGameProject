/// <reference types="@workadventure/iframe-api-typings" />

import {rootLink} from "../config";
import {UIWebsite} from "@workadventure/iframe-api-typings";
import * as utils from '../utils/index'
import { inventory, notifications, sounds } from '../modules/index'

export type InventoryItem = {
  id: string,
  name: string,
  image?: string,
  description: string,
}

// We will limit inventory size to 3 items
const INVENTORY_MAX_SIZE = 3

// initiate player inventory (reset all items)
const initiateInventory = () => {
  if(!WA.player.state.inventory){
    WA.player.state.inventory = '[]' // Initiate to empty array
  }

  WA.ui.actionBar.addButton({
    id: 'inventory',
    type: 'action',
    imageSrc: `${rootLink}/images/inventory/school-bag.svg`,
    toolTip: utils.translations.translate('modules.inventory.inventory'),
    callback: async () => {
      if (!inventoryWebsite) {
        await openInventory()
      } else {
        closeInventory()
      }
    }
  });

  WA.player.state.onVariableChange('askForInventoryWebsiteClose').subscribe((value) => {
    if (value) {
      closeInventory()
    }
  })
}

// add item to user inventory
  // Return true if item was added
  // False either
const addToInventory = (item: InventoryItem) => {
  try{
    const currentInventory = JSON.parse(WA.player.state.inventory as string)
    
    // If the user has not already an item with the same id and inventory is not full
    if (!hasItem(item.id) && currentInventory.length < INVENTORY_MAX_SIZE) {
      sounds.playSound('successSound')
      currentInventory.push(item)

      WA.player.state.inventory = JSON.stringify(currentInventory)
      notifications.notify(utils.translations.translate(
        'modules.inventory.objectTaken',
        {
          object: utils.translations.translate(item.name)
        }), null, 'success');
        setTimeout(() => {
          // open inventory
          inventory.openInventory()
        }, 500);
      return true
    } else {
      notifications.notify('modules.inventory.cannotTakeThis', null, 'error')
    }
    return false
  }catch(e){
    return false;
  }
}

// Return true if user has item with id parameter in his/her inventory
const hasItem = (id: string) => {
  try{
    const currentInventory = JSON.parse(WA.player.state.inventory as string)

    for (let i = 0; i < currentInventory.length; i++) {
      if (currentInventory[i].id === id) {
        return true
      }
    }
    return false
  }catch(e){
    return false;
  }
}

// remove item by id from user inventory
const removeFromInventory = (id: string) => {
  const currentInventory = getInventory()

  for (let i = 0; i < currentInventory.length; i++) {
    if (currentInventory[i].id === id) {
      currentInventory.splice(i,1)
    }
  }
  WA.player.state.inventory = JSON.stringify(currentInventory)
  return true
}

let inventoryWebsite: UIWebsite|null = null
const openInventory = async () => {
  // Disable controls while inventory is open
  WA.controls.disablePlayerControls()

  // Open card
  inventoryWebsite = await WA.ui.website.open({
    url: `${rootLink}/views/inventory/inventory.html`,
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

  WA.player.state.askForInventoryWebsiteClose = false
}

const closeInventory = () => {
  inventoryWebsite?.close()
  inventoryWebsite = null

  // Restore player controle after closing inventory
  WA.controls.restorePlayerControls()
}

const askForCloseInventory = () => {
  WA.player.state.askForInventoryWebsiteClose = true
}

// Return inventory content
const getInventory = () => {
  return JSON.parse(WA.player.state.inventory as string)
}

// Return inventory max size
const getMaxSize = () => {
  return INVENTORY_MAX_SIZE
}

// Return the inventory default image
const getDefaultImage = () => {
  return 'default.png'
}

export {
  initiateInventory,
  addToInventory,
  hasItem,
  removeFromInventory,
  openInventory,
  closeInventory,
  askForCloseInventory,
  getInventory,
  getMaxSize,
  getDefaultImage
}