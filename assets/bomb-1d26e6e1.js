import{i as d,r as y,a as c,h as s,b,p as f}from"./sounds-5d3f972e.js";import{i as A,g as r}from"./job-eb8dc8ef.js";import{t as e}from"./translate-d272070d.js";import{t as m}from"./layers-a51a04ec.js";import{i as W}from"./secretPassages-5fc21458.js";import{o as u}from"./discussion-49536565.js";import{o as v}from"./init-0f7c740a.js";import{n as S}from"./notifications-69979190.js";import{h as C}from"./workadventureFeatures-48ab46db.js";let n=null,a=null;const w=async()=>{const o=await WA.player.getPosition();WA.camera.set(o.x,o.y,100,100)};v().then(async()=>{WA.camera.followPlayer(!0),WA.camera.set(665,838),await A(),C(),d([{name:"evilGuySound",path:"evilGuy.mp3"}]);const o=WA.sound.loadSound(`${y}/sounds/bomb.mp3`);o.play({volume:.3,loop:!0,rate:1,detune:1,delay:0,seek:0,mute:!1}),w(),u(e("utils.mySelf"),e(`bomb.story.${r()}`),"views.choice.close","discussion",()=>{s("freeSpy")?(m("rock",!1),WA.room.setTiles([{x:15,y:7,tile:null,layer:"rockCollisions"},{x:15,y:8,tile:null,layer:"rockCollisions"}])):r()==="spy"&&(WA.controls.disablePlayerControls(),WA.player.setOutlineColor(255,0,0))}),WA.player.state.askForDefuseBomb=!1,WA.player.state.askForBoom=!1,W(["secretPassage"],[()=>{console.log("secret passage discovered !")}]),c("freeSpy",()=>{m("rock",!1),WA.room.setTiles([{x:15,y:7,tile:null,layer:"rockCollisions"},{x:15,y:8,tile:null,layer:"rockCollisions"}]),r()==="spy"&&(WA.player.removeOutlineColor(),WA.controls.restorePlayerControls())}),c("boom",()=>{o.stop(),WA.ui.actionBar.removeButton("cheatSheetButton"),f("evilGuySound"),u(e("bomb.bomb.failure.name"),e("bomb.bomb.failure.message"),"views.choice.close","discussion",()=>{r()==="spy"&&WA.controls.disablePlayerControls()})}),c("defuseBomb",()=>{m("bomb",!1),h(),o.stop(),WA.ui.actionBar.removeButton("cheatSheetButton"),f("successSound"),S(e("bomb.bomb.success"),e("utils.success"),"success")}),r()==="spy"&&(WA.player.state.askForCloseCheatSheet=!1,WA.ui.actionBar.addButton({id:"cheatSheetButton",label:e("bomb.cheatSheet"),callback:async()=>{a?p():await g()}}),WA.player.state.onVariableChange("askForCloseCheatSheet").subscribe(i=>{i&&p()}));let l=null;WA.room.onEnterLayer("saveSpyZone").subscribe(()=>{!s("boom")&&!s("defuseBomb")?u(e("utils.mySelf"),e("bomb.freeSpy.noTime"),"views.choice.close","discussion"):s("freeSpy")||(l=WA.ui.displayActionMessage({message:e("utils.executeAction",{action:e("bomb.freeSpy.free")}),callback:()=>{b("freeSpy")}}),WA.room.onLeaveLayer("saveSpyZone").subscribe(()=>{l==null||l.remove(),l=null}))});let t=null;WA.room.onEnterLayer("bombZone").subscribe(()=>{!s("boom")&&!s("defuseBomb")&&(t=WA.ui.displayActionMessage({message:e("utils.executeAction",{action:e("bomb.bomb.defuse")}),callback:async()=>{WA.controls.disablePlayerControls(),n=await WA.ui.website.open({url:`${y}/views/bomb/bomb.html`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}})}})),WA.room.onLeaveLayer("bombZone").subscribe(()=>{t==null||t.remove(),t=null})}),WA.player.state.onVariableChange("askForBoom").subscribe(i=>{i&&(h(),b("boom"))}),WA.player.state.onVariableChange("askForDefuseBomb").subscribe(i=>{i&&b("defuseBomb")})});const g=async()=>{a=await WA.ui.website.open({url:`${y}/views/bomb/cheatSheet.html`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}})},p=()=>{a==null||a.close(),a=null,WA.player.state.askForCloseCheatSheet=!1},h=()=>{n&&(n.close(),n=null,WA.controls.restorePlayerControls())};