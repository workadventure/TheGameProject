import{r as f}from"./config-3db041a0.js";import{i as h,g as A}from"./job-ef90d9e1.js";import{t as e}from"./translate-df78904b.js";import{t as b}from"./layers-d7df7005.js";import{i as W}from"./secretPassages-0751a65d.js";import{o as c}from"./discussion-1b07b8e0.js";import{n as S}from"./notifications-cef40a46.js";import{i as v,a as m,h as a,b as u,p as d}from"./sounds-16fb2661.js";import{h as C}from"./workadventureFeatures-48ab46db.js";import{o as w}from"./init-4335d005.js";import{d as g,a as B,b as k}from"./ui-ca9d2579.js";import"./firebase-a8cde200.js";let n=null,t=null;const P=async()=>{const s=await WA.player.getPosition();WA.camera.set(s.x,s.y,100,100)},F="bomb";w(F).then(async()=>{g(),B(),k(),WA.camera.followPlayer(!0),WA.camera.set(665,838),await h(),C(),v([{name:"evilGuySound",path:"evilGuy.mp3"}]);const s=WA.sound.loadSound(`${f}/sounds/bomb.mp3`);s.play({volume:.1,loop:!0,rate:1,detune:1,delay:0,seek:0,mute:!1}),P();const i=await A();c(e("utils.mySelf"),e(`bomb.story.${i}`),"views.choice.close","discussion",()=>{a("freeSpy")?(b("rock",!1),WA.room.setTiles([{x:15,y:7,tile:null,layer:"rockCollisions"},{x:15,y:8,tile:null,layer:"rockCollisions"}])):i==="spy"&&(WA.state.difused==!1&&WA.controls.disablePlayerControls(),WA.player.setOutlineColor(255,0,0))}),WA.player.state.askForDefuseBomb=!1,WA.player.state.askForBoom=!1,WA.state.onVariableChange("difused").subscribe(o=>{o&&y()}),W(["secretPassage"],[()=>{console.info("secret passage discovered !")}]),m("freeSpy",()=>{b("rock",!1),WA.room.setTiles([{x:15,y:7,tile:null,layer:"rockCollisions"},{x:15,y:8,tile:null,layer:"rockCollisions"}]),i==="spy"&&(WA.player.removeOutlineColor(),WA.controls.restorePlayerControls())}),m("boom",()=>{s.stop(),WA.ui.actionBar.removeButton("cheatSheetButton"),d("evilGuySound"),c(e("bomb.bomb.failure.name"),e("bomb.bomb.failure.message"),"views.choice.close","discussion",async()=>{i==="spy"&&WA.controls.disablePlayerControls()})}),m("defuseBomb",()=>{b("bomb",!1),y(),s.stop(),WA.ui.actionBar.removeButton("cheatSheetButton"),d("successSound"),S(e("bomb.bomb.success"),e("utils.success"),"success"),WA.state.difused=!0}),i==="spy"&&(WA.player.state.askForCloseCheatSheet=!1,WA.ui.actionBar.addButton({id:"cheatSheetButton",label:e("bomb.cheatSheet"),callback:async()=>{t?p():await L()}}),WA.player.state.onVariableChange("askForCloseCheatSheet").subscribe(o=>{o&&p()}));let l=null;WA.room.onEnterLayer("saveSpyZone").subscribe(()=>{!a("boom")&&!a("defuseBomb")?c(e("utils.mySelf"),e("bomb.freeSpy.noTime"),"views.choice.close","discussion"):a("freeSpy")||(l=WA.ui.displayActionMessage({message:e("utils.executeAction",{action:e("bomb.freeSpy.free")}),callback:()=>{u("freeSpy")}}),WA.room.onLeaveLayer("saveSpyZone").subscribe(()=>{l==null||l.remove(),l=null}))});let r=null;WA.room.onEnterLayer("bombZone").subscribe(()=>{!a("boom")&&!a("defuseBomb")&&(r=WA.ui.displayActionMessage({message:e("utils.executeAction",{action:e("bomb.bomb.defuse")}),callback:async()=>{WA.state.difused==!1&&WA.controls.disablePlayerControls(),n=await WA.ui.website.open({url:`${f}/views/bomb/bomb.html`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}})}})),WA.room.onLeaveLayer("bombZone").subscribe(()=>{r==null||r.remove(),r=null})}),WA.player.state.onVariableChange("askForBoom").subscribe(o=>{o&&(y(),u("boom"))}),WA.player.state.onVariableChange("askForDefuseBomb").subscribe(o=>{o&&u("defuseBomb")})});const L=async()=>{t=await WA.ui.website.open({url:`${f}/views/bomb/cheatSheet.html`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}})},p=()=>{t==null||t.close(),t=null,WA.player.state.askForCloseCheatSheet=!1},y=()=>{n&&(n.close(),n=null),WA.controls.restorePlayerControls()};
