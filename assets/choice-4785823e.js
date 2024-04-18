import{i as b,J as t}from"./job-55a8da1b.js";import{t as s}from"./translate-da45fed2.js";import{s as h,d as p}from"./firebase-a8cde200.js";import{r as n}from"./config-adf52b6e.js";import{o as d}from"./discussion-eb7cda90.js";import{i as A,g as u,d as W}from"./inventory-e900349e.js";import"./sounds-fa9583ac.js";import{h as g}from"./workadventureFeatures-48ab46db.js";import{o as f}from"./init-f6d11096.js";import{o as v}from"./ranking-641ed45a.js";import"./notifications-bb73e947.js";const i=()=>{WA.ui.banner.closeBanner(),WA.ui.banner.openBanner({id:"banner-players-not-even",text:"You need to be at least 2 players to play this game 🙏",closable:!1,timeToClose:0})},P=()=>{const e=[...WA.players.list()].find(o=>o.state.job=="spy");return e==null?void 0:e.name},L=()=>{const e=[...WA.players.list()].find(o=>o.state.job=="archaeologist");return e==null?void 0:e.name},r=()=>{const e=WA.state.loadVariable(t.spyPlayer),o=WA.state.loadVariable(t.archaeologistPlayer);WA.ui.banner.closeBanner(),WA.ui.banner.openBanner({id:"banner-players-not-even",text:`${e?e.name:"----"} 👀   ${o?o.name:"----"} 👨‍🌾`,closable:!1,timeToClose:0})},y=()=>{WA.state.saveVariable("allPlayersGotJob",!1);const e=WA.state.loadVariable(t.spyPlayer),o=WA.state.loadVariable(t.archaeologistPlayer);e!=null&&e!=!1&&o!=null&&o!=!1&&WA.state.saveVariable("allPlayersGotJob",!0)},m="choice";f(m).then(async()=>{const e=WA.sound.loadSound(`${n}/sounds/choice.mp3`);let o={volume:.1,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1};e.play(o),A(),await b(),g(),d("utils.voiceOver","choice.scenario",void 0,void 0,()=>{console.log("Discussion closed"),setTimeout(()=>{v()},1e3)});let l=!1;WA.room.onEnterLayer("talk").subscribe(()=>{if(l){WA.chat.open();return}WA.chat.sendChatMessage(s("views.choice.text"),`${s("views.choice.title")} 🕵️‍♂️`),l=!0}),WA.room.onEnterLayer("spy").subscribe(async()=>{if(P()!=null){WA.chat.sendChatMessage("Sorry, the spy job is already taken 😱",`${s("views.choice.title")} 🕵️‍♂️`);return}WA.ui.modal.openModal({allowApi:!0,position:"center",allow:"fullscreen",title:"become spy",src:`${n}/views/choice/becomeSpy.html`},()=>{WA.controls.restorePlayerControls(),y()})}),WA.room.onEnterLayer("archeo").subscribe(async()=>{if(L()!=null){WA.chat.sendChatMessage("Sorry, the spy job is already taken 😱",`${s("views.choice.title")} 🕵️‍♂️`);return}WA.ui.modal.openModal({allowApi:!0,position:"center",allow:"fullscreen",title:"become spy",src:`${n}/views/choice/becomeArchaeologist.html`},()=>{WA.controls.restorePlayerControls(),y()})});let c;WA.room.onEnterLayer("croissants").subscribe(()=>{c=WA.ui.displayActionMessage({message:s("utils.executeAction",{action:s("choice.takeCroissantMessage")}),callback:()=>{const a=u().length;W({id:`croissant${a}`,name:"Croissant",description:"choice.looksDelicious",image:"croissant.png"})}})}),WA.room.onLeaveLayer("croissants").subscribe(()=>{c.remove()}),WA.room.onEnterLayer("door_left_zone").subscribe(()=>{WA.room.hideLayer("closedoor_left"),WA.room.showLayer("opendoor_left")}),WA.room.onLeaveLayer("door_left_zone").subscribe(()=>{WA.room.showLayer("closedoor_left"),WA.room.hideLayer("opendoor_left")}),WA.room.onEnterLayer("door_right_zone").subscribe(()=>{WA.room.hideLayer("closedoor_right"),WA.room.showLayer("opendoor_right")}),WA.room.onLeaveLayer("door_right_zone").subscribe(()=>{WA.room.showLayer("closedoor_right"),WA.room.hideLayer("opendoor_right")}),await WA.players.configureTracking(),WA.players.onPlayerEnters.subscribe(async a=>{console.info(`Player ${a.name} entered your nearby zone`),[...WA.players.list()].length===1?r():i()}),WA.players.onPlayerLeaves.subscribe(async a=>{console.info(`Player ${a.name} leave your nearby zone`),[...WA.players.list()].length===1?r():i()}),[...WA.players.list()].length===1?r():i(),WA.state.onVariableChange("allPlayersGotJob").subscribe(async a=>{r(),a&&(e.stop(),await h(m),p(),WA.nav.goToRoom("./museum.tmj"))}),WA.state.onVariableChange(t.spyPlayer).subscribe(a=>{console.info("onVariableChange => spyPlayer",a),r()}),WA.state.onVariableChange(t.archaeologistPlayer).subscribe(a=>{console.info("onVariableChange => archaeologistPlayer",a),r()})}).catch(e=>console.error(e));export{y as c};