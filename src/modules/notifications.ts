/// <reference types="@workadventure/iframe-api-typings" />

import {UIWebsite} from "@workadventure/iframe-api-typings";
import {rootLink} from "../config";

type notificationType = 'info'|'error'|'success'|'warning'


let notificationWebsite: Record<string, {index: number, website: UIWebsite}> = {}

const getAvailableIndex = () => {
  const keys = Object.keys(notificationWebsite)
  const takenIndexes = []
  for (let i = 0; i < keys.length; i++) {
    // @ts-ignore
    takenIndexes.push(notificationWebsite[keys[i]].index)
  }

  for (let i = 0; i < takenIndexes.length; i++) {
    if (!takenIndexes.includes(i)) {
      return i
    }
  }
  return takenIndexes.length
}

// This function will display a notification message to the user :
// - content : the translation key of the content of the notification
// - title : the translation key of the title of the notification
// - type : the type of the notification (error, info, success, warning)
const notify = async (content: string, title: string|null = null, type: notificationType = 'info') => {
  const timestamp = Date.now()
  const token: string = Math.random().toString(36).substring(2) + timestamp
  const newIndex = getAvailableIndex()
  notificationWebsite[token] = {
    index: newIndex,
    website: await openNotification(newIndex, content, title, type)
  }

  setTimeout(() => {
    if (notificationWebsite[token]) {
      notificationWebsite[token].website.close()
      delete notificationWebsite[token]
    }
  }, 8000) // Stay four seconds on screen
}

const openNotification = async (index:number, content: string, title: string|null, type: notificationType) => {
  return await WA.ui.website.open({
    url: `${rootLink}/views/notifications/notification.html?content=${content}&title=${title}&type=${type}&index=${index}`,
    allowApi: true,
    allowPolicy: "",
    position: {
      vertical: "top",
      horizontal: "right",
    },
    size: {
      height: "100vh",
      width: "20vw",
    },
  })
}

export {
  notify
}