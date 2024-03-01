# Utils
In this directory, you have all re-usable functions created to make workadventure maps script easier to write

## Main
Global functions

## Chat
All chat related function.
At the begining of your script, you mush initiate chat with the following code :

```javascript
WA.onInit().then(() => {
    // Initiate chat
    utils.chat.initChat()
})
```

(NOTE : For now, in order to make chat with all users work, you must create the following variables in your maps :
* chatRoomId : String
* chatMessageContent : String
* chatMessageAuthor : String
* chatMessageRoom : String
* receiveChatMessage : Boolean
)

## Layers
All related layers function

## Translate
To translate texts in your scripts. Based upon the selected language of the user in woka.