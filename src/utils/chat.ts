import { translate } from './translate'

const initChat = () => {
    // Init null room id
    WA.player.state.saveVariable(
        'chatRoomId',
        null,
        {
            public: true,
            persist: false,
            scope: "room",
        }
    );

    WA.state['receiveChatMessage'] = false

    // Ecouter le nouveau message
    WA.state.onVariableChange('receiveChatMessage').subscribe((value) => {
        if (value) {
            if (WA.state['chatMessageRoom'] === null || WA.state['chatMessageRoom'] === WA.player.state.chatRoomId) {
                WA.chat.sendChatMessage(WA.state['chatMessageContent'] as string, WA.state['chatMessageAuthor'] as string)
            }
        }
    })
}

// Send chat message to all players in map
const sendMessageToAllPlayers = (message: string, author: string, roomId= null) => {
    WA.state['chatMessageContent'] = message
    WA.state['chatMessageAuthor'] = author
    WA.state['chatMessageRoom'] = roomId // Receive only in a certain room
    WA.state['receiveChatMessage'] = true

    setTimeout(() => {
        WA.state['receiveChatMessage'] = false
    }, 100)
}

// Changer le room id d'un player
const setPlayerChatRoomId = (id = null) => {
    WA.player.state.saveVariable(
        'chatRoomId',
        id,
        {
            public: true,
            persist: false,
            scope: "room"
        }
    );
}

const monologue = (translationKeys: Array<unknown>, author: string, variables = {}) => {
    for (let i = 0; i<translationKeys.length; i++) {
        WA.chat.sendChatMessage(translate(translationKeys[i], variables), author)
    }
}

export {
    initChat,
    setPlayerChatRoomId,
    sendMessageToAllPlayers,
    monologue,
}