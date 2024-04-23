/// <reference types="@workadventure/iframe-api-typings" />

import * as translationFR from '../translations/fr-FR/index'
import * as translationEN from '../translations/en-US/index'

const acceptedPlayerLanguages = {
    'fr-FR': translationFR,
    'en-US': translationEN
}

// Get the player language
let playerLanguage = 'fr-FR'

// NOTE : Here playerLanguage is set at the begining but we should perhaps calculate it every time translate function is called in order to manage user changing language on the map ?
WA.onInit().then(() => {
    playerLanguage = WA.player.language

    // Default playerLanguage if not in accepted
    if (!Object.keys(acceptedPlayerLanguages).includes(playerLanguage)) {
        playerLanguage = 'en-US'
    }
})

const getSentenceWithVariables = (message: any, variables: { [key: string]: any } = {}) => {
    let newMessage = message
    const variablesKeys = Object.keys(variables)
    for (let i = 0; i < variablesKeys.length; i++) {
        newMessage = newMessage.replaceAll('{' + variablesKeys[i] + '}', variables[variablesKeys[i]])
    }

    return newMessage
}

const translate = (translationKey: any, variables= {}) => {
    const keys = translationKey.split('.')
    const translation = keys.reduce((acc: any, item: any) => {
        if (!acc || !acc[item]) {
            acc = undefined
        } else {
            acc = acc[item]
        }

        return acc
    }, acceptedPlayerLanguages[playerLanguage as keyof typeof acceptedPlayerLanguages])

    if (translation) {
        return (typeof translation === 'string') ? getSentenceWithVariables(translation, variables) : translationKey
    }
    return translationKey
}

export {
    playerLanguage,
    translate,
    getSentenceWithVariables
}