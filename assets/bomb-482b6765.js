import{r as d}from"./config-3db041a0.js";import{i as A,g as W}from"./job-d586efa0.js";import{t as o}from"./translate-a92a2393.js";import{t as b}from"./layers-2a00048c.js";import{i as S}from"./secretPassages-bde722f2.js";import{o as c,t as m}from"./discussionv2-a040ca14.js";import{n as v}from"./notifications-cef40a46.js";import{i as C,a as u,h as a,b as y,p}from"./sounds-38d81953.js";import{h as w}from"./workadventureFeatures-48ab46db.js";import{o as g}from"./init-01709531.js";import{d as B,a as k,b as P}from"./ui-ca9d2579.js";import"./firebase-09ce58cb.js";let n=null,t=null;const F=async()=>{const s=await WA.player.getPosition();WA.camera.set(s.x,s.y,100,100)},L="bomb";g(L).then(async()=>{B(),k(),P(),WA.camera.followPlayer(!0),WA.camera.set(665,838),await A(),w(),C([{name:"evilGuySound",path:"evilGuy.mp3"}]);const s=WA.sound.loadSound(`${d}/sounds/bomb.mp3`);s.play({volume:.1,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1}),F();const i=await W();c(m.mySelf,`bomb.story.${i}`,"views.choice.close","discussion",()=>{a("freeSpy")?(b("rock",!1),WA.room.setTiles([{x:15,y:7,tile:null,layer:"rockCollisions"},{x:15,y:8,tile:null,layer:"rockCollisions"}])):i==="spy"&&(WA.state.difused==!1&&WA.controls.disablePlayerControls(),WA.player.setOutlineColor(255,0,0))}),WA.player.state.askForDefuseBomb=!1,WA.player.state.askForBoom=!1,WA.state.onVariableChange("difused").subscribe(e=>{e&&f()}),S(["secretPassage"],[()=>{console.info("secret passage discovered !")}]),u("freeSpy",()=>{b("rock",!1),WA.room.setTiles([{x:15,y:7,tile:null,layer:"rockCollisions"},{x:15,y:8,tile:null,layer:"rockCollisions"}]),i==="spy"&&(WA.player.removeOutlineColor(),WA.controls.restorePlayerControls())}),u("boom",()=>{s.stop(),WA.ui.actionBar.removeButton("cheatSheetButton"),p("evilGuySound"),c(m.bombFailure,"bomb.bomb.failure.message","views.choice.close","discussion",async()=>{i==="spy"&&WA.controls.disablePlayerControls()})}),u("defuseBomb",()=>{b("bomb",!1),f(),s.stop(),WA.ui.actionBar.removeButton("cheatSheetButton"),p("successSound"),v(o("bomb.bomb.success"),o("utils.success"),"success"),WA.state.difused=!0}),i==="spy"&&(WA.player.state.askForCloseCheatSheet=!1,WA.ui.actionBar.addButton({id:"cheatSheetButton",label:o("bomb.cheatSheet"),callback:async()=>{t?h():await x()}}),WA.player.state.onVariableChange("askForCloseCheatSheet").subscribe(e=>{e&&h()}));let l=null;WA.room.onEnterLayer("saveSpyZone").subscribe(()=>{!a("boom")&&!a("defuseBomb")?c(m.mySelf,"bomb.freeSpy.noTime","views.choice.close","discussion"):a("freeSpy")||(l=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("bomb.freeSpy.free")}),callback:()=>{y("freeSpy")}}),WA.room.onLeaveLayer("saveSpyZone").subscribe(()=>{l==null||l.remove(),l=null}))});let r=null;WA.room.onEnterLayer("bombZone").subscribe(()=>{!a("boom")&&!a("defuseBomb")&&(r=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("bomb.bomb.defuse")}),callback:async()=>{WA.state.difused==!1&&WA.controls.disablePlayerControls(),n=await WA.ui.website.open({url:`${d}/views/bomb/bomb.html`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}})}})),WA.room.onLeaveLayer("bombZone").subscribe(()=>{r==null||r.remove(),r=null})}),WA.player.state.onVariableChange("askForBoom").subscribe(e=>{e&&(f(),y("boom"))}),WA.player.state.onVariableChange("askForDefuseBomb").subscribe(e=>{e&&y("defuseBomb")})});const x=async()=>{t=await WA.ui.website.open({url:`${d}/views/bomb/cheatSheet.html`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}})},h=()=>{t==null||t.close(),t=null,WA.player.state.askForCloseCheatSheet=!1},f=()=>{n&&(n.close(),n=null),WA.controls.restorePlayerControls()};
