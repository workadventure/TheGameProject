import{i as p,g as y}from"./job-89290bbb.js";import{w as d,s as h}from"./firebase-a8cde200.js";import{t as s}from"./translate-df78904b.js";import{t as e,a as A}from"./layers-d7df7005.js";import{r as f,i as k,c as v,a as t,h as u,b as i,p as m}from"./sounds-dd62bce7.js";import{s as W}from"./switchingTiles-00118c21.js";import{o as E}from"./discussion-84b3e643.js";import{i as T,s as L}from"./readRunes-30e70f2e.js";import{i as S,h as n,d as B}from"./inventory-3654ccf7.js";import{n as G}from"./notifications-7daea5fb.js";import{o as H}from"./init-4335d005.js";import{d as w,a as Z,b as x}from"./ui-ca9d2579.js";const c="treasureEnigma";H(c).then(async()=>{await p(),w(),Z(),x();const l=WA.sound.loadSound(`${f}/sounds/treasure.mp3`);let g={volume:.1,loop:!0,rate:1,detune:1,delay:0,seek:0,mute:!1};l.play(g),k([{name:"evilGuySound",path:"evilGuy.mp3"}]),S(),T(),L("runesReading",{content:"treasureEnigma.runes.content"});let r=null;W("rotatingStatues",()=>{G("treasureEnigma.hammer.opened","utils.success","success"),e("hammerZoneTop",!1),WA.room.onEnterLayer("hammerZone").subscribe(()=>{n("hammer")||(r=WA.ui.displayActionMessage({message:s("utils.executeAction",{action:s("treasureEnigma.hammer.action")}),callback:()=>{B({id:"hammer",name:"treasureEnigma.hammer.name",image:"hammer.png",description:"treasureEnigma.hammer.description"}),e("hammerZone",!1)}}))}),WA.room.onLeaveLayer("hammerZone").subscribe(()=>{r==null||r.remove(),r=null})},!0,"treasureEnigma.makeTurn");let a=null;v("openTreasureDoor",["breakHourglass1","breakHourglass2"],()=>{m("successSound"),e("torchesOnBottom",!0),e("torchesOnTop",!0),e("treasureDoor",!1),WA.room.setTiles([{x:14,y:13,tile:null,layer:"treasureDoorCollisions"},{x:15,y:13,tile:null,layer:"treasureDoorCollisions"},{x:16,y:13,tile:null,layer:"treasureDoorCollisions"}])}),t("breakHourglass1",()=>{e("hourglass1FullBottom",!1),e("hourglass1FullTop",!1),e("hourglass1BrokenTop",!0),e("hourglass1BrokenBottom",!0)}),WA.room.onEnterLayer("breakHourglass1Zone").subscribe(()=>{n("hammer")&&!u("breakHourglass1")&&(a=WA.ui.displayActionMessage({message:s("utils.executeAction",{action:s("treasureEnigma.breakHourglass")}),callback:()=>{i("breakHourglass1")}}))}),WA.room.onLeaveLayer("breakHourglass1Zone").subscribe(()=>{a==null||a.remove(),a=null}),t("breakHourglass2",()=>{e("hourglass2FullBottom",!1),e("hourglass2FullTop",!1),e("hourglass2BrokenTop",!0),e("hourglass2BrokenBottom",!0)}),WA.room.onEnterLayer("breakHourglass2Zone").subscribe(()=>{n("hammer")&&!u("breakHourglass2")&&(a=WA.ui.displayActionMessage({message:s("utils.executeAction",{action:s("treasureEnigma.breakHourglass")}),callback:()=>{i("breakHourglass2")}}))}),WA.room.onLeaveLayer("breakHourglass2Zone").subscribe(()=>{a==null||a.remove(),a=null}),t("evilGuyAppears",async()=>{WA.controls.disablePlayerControls(),WA.camera.set(15*32+16,4*32+16,50,50,!0,!0),m("evilGuySound"),await d(1e3),setTimeout(()=>{e("badGuy",!0)},300),await A(["pouf1","pouf2","pouf3"],100);const b=await y();setTimeout(()=>{E("treasureEnigma.badGuy.name","treasureEnigma.badGuy.monologue","views.choice.close","discussion",async()=>{l.stop(),await h(c),WA.nav.goToRoom(`./bomb.tmj#${b}-entry`)})},300)});let o=null;WA.room.onEnterLayer("treasure").subscribe(()=>{o=WA.ui.displayActionMessage({message:s("utils.executeAction",{action:s("treasureEnigma.takeTheTreasure")}),callback:()=>{i("evilGuyAppears")}})}),WA.room.onLeaveLayer("treasure").subscribe(()=>{o==null||o.remove(),o=null})});
