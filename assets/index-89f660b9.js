import{p as m,o as p}from"./firebase-f59070e7.js";import{t as o}from"./translate-a92a2393.js";import{a as W}from"./translate-a92a2393.js";import{l as f}from"./layers-6eae4c33.js";const r=()=>{WA.player.state.saveVariable("chatRoomId",null,{public:!0,persist:!1,scope:"room"}),WA.state.receiveChatMessage=!1,WA.state.onVariableChange("receiveChatMessage").subscribe(e=>{e&&(WA.state.chatMessageRoom===null||WA.state.chatMessageRoom===WA.player.state.chatRoomId)&&WA.chat.sendChatMessage(WA.state.chatMessageContent,WA.state.chatMessageAuthor)})},l=(e,t,a=null)=>{WA.state.chatMessageContent=e,WA.state.chatMessageAuthor=t,WA.state.chatMessageRoom=a,WA.state.receiveChatMessage=!0,setTimeout(()=>{WA.state.receiveChatMessage=!1},100)},c=(e=null)=>{WA.player.state.saveVariable("chatRoomId",e,{public:!0,persist:!1,scope:"room"})},n=(e,t,a={})=>{for(let s=0;s<e.length;s++)WA.chat.sendChatMessage(o(e[s],a),t)},i=Object.freeze(Object.defineProperty({__proto__:null,initChat:r,monologue:n,sendMessageToAllPlayers:l,setPlayerChatRoomId:c},Symbol.toStringTag,{value:"Module"}));export{i as chat,m as firebase,f as layers,p as main,W as translations};