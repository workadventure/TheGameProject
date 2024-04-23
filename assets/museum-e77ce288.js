import{b as K}from"./init-e2054226.js";import{i as _,g as q,f as I}from"./job-22d73a77.js";import{t as o}from"./translate-a92a2393.js";import{t as a}from"./layers-6eae4c33.js";import{f as Q}from"./firebase-f59070e7.js";import{i as X}from"./hiddenZone-85a4635d.js";import{r as P}from"./config-adf52b6e.js";import{o as r,t as l}from"./discussionv2-8cccfd78.js";import{h as p,i as Y,d as w}from"./inventory-de973741.js";import{s as ee}from"./hooking-33a0f9ec.js";import{n as se}from"./notifications-bb73e947.js";import{h as oe,a as g,b as y,d as k}from"./sounds-131a2a9b.js";import{i as te,g as ae,a as ie,c as re,s as le,o as ne}from"./cameraMovingMode-25e0b85e.js";import{c as ce,i as me,o as ue,d as de}from"./digicode-a092db28.js";import{h as pe,a as ge,b as ye}from"./workadventureFeatures-48ab46db.js";import{o as Ae}from"./init-ea23a5cf.js";K();let C,A=0;const $=()=>{WA.ui.actionBar.removeButton("planButton")},S=async i=>{WA.ui.modal.closeModal(),setTimeout(()=>{r(l.mapRetrieved,"museum.goToTheNextRoom","museum.go","discussion",async()=>{i==null||i.stop(),$(),await Q(F),WA.nav.goToRoom("maze.tmj")})},1e3)},F="museum";Ae(F).then(async()=>{await _(),WA.state.mapRetrieved=!1;const i=WA.sound.loadSound(`${P}/sounds/electro.mp3`),n=WA.sound.loadSound(`${P}/sounds/electroLow.mp3`);let M={volume:.1,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1},O={volume:.1,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1};if(n.play(M),WA.state.onVariableChange("mapRetrieved").subscribe(e=>{e&&S(n)}),WA.state.mapRetrieved||p("secret-map")){WA.state.mapRetrieved=!0,S(n);return}WA.room.onEnterLayer("electroH").subscribe(()=>{n.stop(),i.play(O)}),WA.room.onLeaveLayer("electroH").subscribe(()=>{i.stop(),n.play(M)}),ce("chestDigicode",[{code:"160616",callback:()=>{WA.state.mapRetrieved=!0,y("retrieveMap")}}]),me();let u=null;WA.room.onEnterLayer("chestZone").subscribe(()=>{oe("retrieveMap")||(u=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.inspect")}),callback:()=>{ue("chestDigicode")}}))}),WA.room.onLeaveLayer("chestZone").subscribe(()=>{u==null||u.remove(),u=null}),pe(),ge(),ye(),te(),Y();const T=()=>{$(),r(l.mySelf,"views.museum.beginDiscussion","views.choice.close","discussion",()=>{WA.controls.restorePlayerControls(),V()})};(()=>{WA.controls.disablePlayerControls(),r(l.voiceOver,"views.museum.beginText","museum.go","discussion",()=>{T()})})();const V=()=>{WA.ui.actionBar.addButton({id:"planButton",label:o("museum.plan"),callback:()=>{T()}})};let b=!1,h=null;const z=()=>{h=setInterval(()=>{a("lights/lights1",b),a("lights/lights2",!b),b=!b},300)},H=()=>{h&&clearInterval(h),h=null},D=()=>{z(),a("noLights/noLights",!1),a("noLights/conversations",!1),a("lights/conversations",!0)},R=()=>{H(),a("lights/lights1",!1),a("lights/lights2",!1),a("noLights/noLights",!0),a("noLights/conversations",!0),a("lights/conversations",!1)};ee("hookingD7",()=>{const e=[];e.push({x:5,y:67,tile:null,layer:"hookingD7/collides"}),WA.room.setTiles(e)});let f=null;WA.room.onEnterLayer("closeDoorMessage").subscribe(()=>{f=WA.ui.displayActionMessage({message:o("museum.doorClosed"),callback:()=>{}})}),WA.room.onLeaveLayer("closeDoorMessage").subscribe(()=>{f==null||f.remove()}),g("keeperDoorOpen",()=>{const e=[];e.push({x:25,y:44,tile:null,layer:"bigRoomAccess/bigRoomCollides"}),e.push({x:26,y:44,tile:null,layer:"bigRoomAccess/bigRoomCollides"}),WA.room.setTiles(e),WA.room.hideLayer("doorsClosed/dc6")},!1);let W=null;WA.room.onEnterLayer("bigRoomAccess/keeperZone").subscribe(()=>{W=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.speakToKeeper")}),callback:()=>{p("id-card")?(r(l.keeperName,"views.museum.bigRoomAccess"),y("keeperDoorOpen")):r(l.keeperName,"views.museum.bigRoomNoAccess")}})}),WA.room.onLeaveLayer("bigRoomAccess/keeperZone").subscribe(()=>{W==null||W.remove()});for(let e=1;e<8;e++)X([{stepIn:`fogsZone/fog${[e]}`,hide:`fogs/fog${[e]}`}]);const N=e=>{let s=null;WA.room.onEnterLayer(`search/s${e}`).subscribe(()=>{e===5&&!p("id-card")?s=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.search")}),callback:()=>{w({id:"id-card",name:"museum.idCardTitle",image:"indentity-card.png",description:"museum.idCardDescription"})}}):s=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.search")}),callback:()=>{s=WA.ui.displayActionMessage({message:o("museum.searchEmpty"),callback:()=>{}})}})}),WA.room.onLeaveLayer(`search/s${e}`).subscribe(()=>{s==null||s.remove()})};for(let e=1;e<8;e++)N(e);const G=e=>{let s=null;WA.room.onEnterLayer(`pickPocketInvited/i${e}`).subscribe(()=>{s=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.pickpocket")}),callback:()=>{k("switchLights")?r(l.museumGuest,"museum.cannotPickPocket","views.choice.close","discussion",()=>{r(l.mySelf,"museum.needDistraction","views.choice.close","discussion")}):e===8&&!p("access-card")?w({id:"access-card",name:"museum.accessCard",image:"gold-key.png",description:"museum.accessCardDescription"}):s=WA.ui.displayActionMessage({message:o("museum.pickpocketEmpty"),callback:()=>{}})}})}),WA.room.onLeaveLayer(`pickPocketInvited/i${e}`).subscribe(()=>{s==null||s.remove()})};for(let e=1;e<13;e++)G(e);let c=null;WA.room.onEnterLayer("desktopAccessZone").subscribe(()=>{p("access-card")?c=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.desktopOpen")}),callback:()=>{c=WA.ui.displayActionMessage({message:o("museum.desktopOpenMsg"),callback:()=>{y("desktopDoorOpen")}})}}):c=WA.ui.displayActionMessage({message:o("museum.doorClosed"),callback:()=>{}})}),WA.room.onLeaveLayer("desktopAccessZone").subscribe(()=>{c==null||c.remove()});for(let e=0;e<9;e++){let s=null;WA.room.onEnterLayer(`desktopItems/i${e}`).subscribe(()=>{s=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.search")}),callback:()=>{e===0?r(l.annuaryTitle,"views.museum.annuaryContent"):s=WA.ui.displayActionMessage({message:o(`museum.desktopItems${e}`),callback:()=>{}})}})}),WA.room.onLeaveLayer(`desktopItems/i${e}`).subscribe(()=>{s==null||s.remove()})}const m=["cameraZones/cZone1","cameraZones/cZone2","cameraZones/cZone3","cameraZones/cZone4","cameraZones/cZone5","cameraZones/cZone6"],Z=[{x:8*32,y:68*32},{x:26*32,y:68*32},{x:15*32,y:63*32},{x:10*32,y:27*32},{x:47*32,y:23*32},{x:47*32,y:42*32}],t=ae(),J={room1:{x:5*32,y:60*32,width:t,height:t},room2:{x:5*32,y:44*32,width:t,height:t},room3:{x:3*32,y:3*32,width:t,height:t},room4:{x:60*32,y:4*32,width:t,height:t},room5:{x:50*32,y:32*32,width:t,height:t},room6:{x:31*32,y:51*32,width:t,height:t},room7:{x:37*32,y:33*32,width:t,height:t}};g("retrieveMap",()=>{w({id:"secret-map",name:"museum.secretMap.title",image:"secret-map.png",description:"museum.secretMap.description"}),se("museum.mapRetrieved","utils.success","success"),a(["chestOpened"],!0),de()},!1),g("desktopDoorOpen",()=>{const e=[];e.push({x:38,y:11,tile:null,layer:"desktopCollides"}),e.push({x:39,y:11,tile:null,layer:"desktopCollides"}),WA.room.setTiles(e),WA.room.hideLayer("doorsClosed/dc4")},!1);let L=null;g("deactivateCamera",e=>{for(let s=0;s<m.length;s++)a(m[s],!0);a(e,!1),L===e&&WA.controls.restorePlayerControls()},""),g("switchLights",e=>{e?D():R()},!0),setTimeout(()=>{k("switchLights")?D():R()},200),WA.player.state.askForSwitchLights=!0,WA.player.state.askForDeactivateCamera=!1,WA.player.state.askForCloseComputerWebsite=!1,WA.player.state.askForSeeRoom=!1,WA.player.state.onVariableChange("askForDeactivateCamera").subscribe(e=>{e&&y("deactivateCamera",e)}),WA.player.state.onVariableChange("askForCloseComputerWebsite").subscribe(e=>{e&&E()}),WA.player.state.onVariableChange("askForSwitchLights").subscribe(e=>{y("switchLights",e)}),WA.player.state.onVariableChange("askForSeeRoom").subscribe(e=>{const s=J["room"+e];ie(s.x,s.y),a(`fogs/fog${e}`,!1)});const U=await q();for(let e=0;e<m.length;e++)WA.room.onEnterLayer(m[e]).subscribe(()=>{k("deactivateCamera")!==m[e]&&(U==="spy"?r(l.mySelf,"museum.cantStayInCamera","utils.close","discussion",async()=>{WA.controls.disablePlayerControls(),await WA.player.moveTo(Z[e].x,Z[e].y),WA.controls.restorePlayerControls()}):(L=m[e],r(l.mySelf,"museum.cannotWalkInCameras","utils.close","discussion",()=>{k("deactivateCamera")!==L&&WA.controls.disablePlayerControls()})))});let v=null;const j=async()=>{WA.ui.modal.openModal({title:"Camera Map",src:`${P}/views/museum/buildingMap.html`,position:"right",allowApi:!0,allow:"fullscreen"},()=>{E()});const e=WA.state.loadVariable("currentCameraPosition");if(e){const{x:s,y:x}=e;B(s,x)}WA.controls.disablePlayerControls(),WA.player.state.askForCloseComputerWebsite=!1,le(),ne()},E=()=>{v==null||v.close(),v=null,re(),WA.controls.restorePlayerControls(),WA.camera.followPlayer(!0)};let d=null;WA.room.onEnterLayer("computerZone").subscribe(()=>{d=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("utils.hack")}),callback:()=>{I("useComputers")?j():r(l.mySelf,"museum.cannotUseComputers","utils.close","discussion")}})}),WA.room.onLeaveLayer("computerZone").subscribe(()=>{d==null||d.remove(),d=null}),WA.state.saveVariable("currentCameraPosition",{x:0,y:0}).catch(e=>console.error("Something went wrong while saving variable",e)),I("useComputers")?WA.state.onVariableChange("currentCameraPosition").subscribe(e=>{const{x:s,y:x}=e;B(s,x)}):WA.player.onPlayerMove(e=>{be(e)})});const B=(i,n)=>{WA.camera.set(i,n,void 0,void 0,!0,!0),A=0,C=void 0},be=i=>{A++,A>5?(WA.state.currentCameraPosition={x:i.x,y:i.y},A=0):(C&&clearTimeout(C),C=setTimeout(()=>{WA.state.currentCameraPosition={x:i.x,y:i.y},A=0},1e3))};