import{i as p,c as y,J as t}from"./job-22d73a77.js";import{t as s}from"./translate-a92a2393.js";import{f as d,h}from"./firebase-f59070e7.js";import{r as n}from"./config-adf52b6e.js";import{o as u,t as A}from"./discussionv2-8cccfd78.js";import{i as W,g,d as f}from"./inventory-de973741.js";import"./sounds-131a2a9b.js";import{h as v}from"./workadventureFeatures-48ab46db.js";import{o as L}from"./init-ea23a5cf.js";import{o as P}from"./ranking-6c0f41de.js";import"./notifications-bb73e947.js";const i=()=>{WA.ui.banner.closeBanner(),WA.ui.banner.openBanner({id:"banner-players-not-even",text:"You need to be at least 2 players to play this game 🙏",closable:!1,timeToClose:0})},C=()=>{const e=[...WA.players.list()].find(a=>a.state.job=="spy");return e==null?void 0:e.name},w=()=>{const e=[...WA.players.list()].find(a=>a.state.job=="archaeologist");return e==null?void 0:e.name},r=()=>{const e=WA.state.loadVariable(t.spyPlayer),a=WA.state.loadVariable(t.archaeologistPlayer);WA.ui.banner.closeBanner(),WA.ui.banner.openBanner({id:"banner-players-not-even",text:`${e?e.name:"----"} 👀   ${a?a.name:"----"} 👨‍🌾`,closable:!1,timeToClose:0})},m="choice";L(m).then(async()=>{const e=WA.sound.loadSound(`${n}/sounds/choice.mp3`);let a={volume:.1,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1};e.play(a),W(),await p(),v();let l=!1;WA.room.onEnterLayer("talk").subscribe(()=>{if(l){WA.chat.open();return}WA.chat.sendChatMessage(s("views.choice.text"),`${s("views.choice.title")} 🕵️‍♂️`),l=!0}),WA.room.onEnterLayer("spy").subscribe(async()=>{if(C()!=null){WA.chat.sendChatMessage("Sorry, the spy job is already taken 😱",`${s("views.choice.title")} 🕵️‍♂️`);return}WA.ui.modal.openModal({allowApi:!0,position:"center",allow:"fullscreen",title:"become spy",src:`${n}/views/choice/becomeSpy.html`},()=>{WA.controls.restorePlayerControls(),y()})}),WA.room.onEnterLayer("archeo").subscribe(async()=>{if(w()!=null){WA.chat.sendChatMessage("Sorry, the spy job is already taken 😱",`${s("views.choice.title")} 🕵️‍♂️`);return}WA.ui.modal.openModal({allowApi:!0,position:"center",allow:"fullscreen",title:"become spy",src:`${n}/views/choice/becomeArchaeologist.html`},()=>{WA.controls.restorePlayerControls(),y()})});let c;WA.room.onEnterLayer("croissants").subscribe(()=>{c=WA.ui.displayActionMessage({message:s("utils.executeAction",{action:s("choice.takeCroissantMessage")}),callback:()=>{const o=g().length;f({id:`croissant${o}`,name:"Croissant",description:"choice.looksDelicious",image:"croissant.png"})}})}),WA.room.onLeaveLayer("croissants").subscribe(()=>{c.remove()}),WA.room.onEnterLayer("door_left_zone").subscribe(()=>{WA.room.hideLayer("closedoor_left"),WA.room.showLayer("opendoor_left")}),WA.room.onLeaveLayer("door_left_zone").subscribe(()=>{WA.room.showLayer("closedoor_left"),WA.room.hideLayer("opendoor_left")}),WA.room.onEnterLayer("door_right_zone").subscribe(()=>{WA.room.hideLayer("closedoor_right"),WA.room.showLayer("opendoor_right")}),WA.room.onLeaveLayer("door_right_zone").subscribe(()=>{WA.room.showLayer("closedoor_right"),WA.room.hideLayer("opendoor_right")}),await WA.players.configureTracking(),WA.players.onPlayerEnters.subscribe(async o=>{console.info(`Player ${o.name} entered your nearby zone`),[...WA.players.list()].length===1?r():i()}),WA.players.onPlayerLeaves.subscribe(async o=>{console.info(`Player ${o.name} leave your nearby zone`),[...WA.players.list()].length===1?r():i()}),WA.state.onVariableChange("allPlayersGotJob").subscribe(async o=>{r(),o&&(e.stop(),await d(m),h(),WA.ui.modal.closeModal(),WA.nav.goToRoom("./museum.tmj"))}),WA.state.onVariableChange(t.spyPlayer).subscribe(o=>{console.info("onVariableChange => spyPlayer",o),r()}),WA.state.onVariableChange(t.archaeologistPlayer).subscribe(o=>{console.info("onVariableChange => archaeologistPlayer",o),r()}),WA.player.state.playingModeSelected!=null?b():(WA.player.state.playingModeSelected=!1,WA.player.state.onVariableChange("playingModeSelected").subscribe(o=>{o&&b()}))}).catch(e=>console.error(e));const b=()=>{u(A.voiceOver,"choice.scenario",void 0,void 0,()=>{console.log("Discussion closed"),setTimeout(()=>{P()},500)}),setTimeout(()=>{[...WA.players.list()].length===1?r():i()},5e4)};
