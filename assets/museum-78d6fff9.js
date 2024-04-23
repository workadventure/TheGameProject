import{b as K}from"./init-e2054226.js";import{i as _,g as q,f as I}from"./job-f067f181.js";import{t as o}from"./translate-a92a2393.js";import{t as i}from"./layers-172ce3de.js";import{g as Q,f as X}from"./firebase-6d97cafc.js";import{i as Y}from"./hiddenZone-85a4635d.js";import{r as P}from"./config-adf52b6e.js";import{o as n,t as l}from"./discussionv2-8cccfd78.js";import{h as p,i as ee,d as M}from"./inventory-de973741.js";import{s as se}from"./hooking-0daa4877.js";import{n as oe}from"./notifications-bb73e947.js";import{h as ae,a as g,b as y,d as C}from"./sounds-131a2a9b.js";import{i as te,g as ie,a as re,c as ne,s as le,o as ce}from"./cameraMovingMode-25e0b85e.js";import{c as me,i as ue,o as de,d as pe}from"./digicode-a092db28.js";import{h as ge,a as ye,b as Ae}from"./workadventureFeatures-48ab46db.js";import{o as be}from"./init-337d09bc.js";K();let k,A=0;const $=()=>{WA.ui.actionBar.removeButton("planButton")},S=async a=>{WA.ui.modal.closeModal(),setTimeout(()=>{n(l.mapRetrieved,"museum.goToTheNextRoom","museum.go","discussion",async()=>{a==null||a.stop(),$(),await X(F),WA.nav.goToRoom("maze.tmj")})},1e3)},F="museum";be(F).then(async()=>{await _(),WA.state.mapRetrieved=!1;let a,r,O={volume:.1,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1},w={volume:.1,loop:!1,rate:1,detune:1,delay:0,seek:0,mute:!1};if(Q().then(e=>{(e==null?void 0:e.choice)!="online"&&(a=WA.sound.loadSound(`${P}/sounds/electro.mp3`),r=WA.sound.loadSound(`${P}/sounds/electroLow.mp3`),r.play(w))}),WA.state.onVariableChange("mapRetrieved").subscribe(e=>{e&&S(r)}),WA.state.mapRetrieved||p("secret-map")){WA.state.mapRetrieved=!0,S(r);return}WA.room.onEnterLayer("electroH").subscribe(()=>{r==null||r.stop(),a==null||a.play(O)}),WA.room.onLeaveLayer("electroH").subscribe(()=>{a==null||a.stop(),r==null||r.play(w)}),me("chestDigicode",[{code:"160616",callback:()=>{WA.state.mapRetrieved=!0,y("retrieveMap")}}]),ue();let u=null;WA.room.onEnterLayer("chestZone").subscribe(()=>{ae("retrieveMap")||(u=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.inspect")}),callback:()=>{de("chestDigicode")}}))}),WA.room.onLeaveLayer("chestZone").subscribe(()=>{u==null||u.remove(),u=null}),ge(),ye(),Ae(),te(),ee();const T=()=>{$(),n(l.mySelf,"views.museum.beginDiscussion","views.choice.close","discussion",()=>{WA.controls.restorePlayerControls(),V()})};(()=>{WA.controls.disablePlayerControls(),n(l.voiceOver,"views.museum.beginText","museum.go","discussion",()=>{T()})})();const V=()=>{WA.ui.actionBar.addButton({id:"planButton",label:o("museum.plan"),callback:()=>{T()}})};let b=!1,h=null;const z=()=>{h=setInterval(()=>{i("lights/lights1",b),i("lights/lights2",!b),b=!b},300)},H=()=>{h&&clearInterval(h),h=null},D=()=>{z(),i("noLights/noLights",!1),i("noLights/conversations",!1),i("lights/conversations",!0)},R=()=>{H(),i("lights/lights1",!1),i("lights/lights2",!1),i("noLights/noLights",!0),i("noLights/conversations",!0),i("lights/conversations",!1)};se("hookingD7",()=>{const e=[];e.push({x:5,y:67,tile:null,layer:"hookingD7/collides"}),WA.room.setTiles(e)});let f=null;WA.room.onEnterLayer("closeDoorMessage").subscribe(()=>{f=WA.ui.displayActionMessage({message:o("museum.doorClosed"),callback:()=>{}})}),WA.room.onLeaveLayer("closeDoorMessage").subscribe(()=>{f==null||f.remove()}),g("keeperDoorOpen",()=>{const e=[];e.push({x:25,y:44,tile:null,layer:"bigRoomAccess/bigRoomCollides"}),e.push({x:26,y:44,tile:null,layer:"bigRoomAccess/bigRoomCollides"}),WA.room.setTiles(e),WA.room.hideLayer("doorsClosed/dc6")},!1);let W=null;WA.room.onEnterLayer("bigRoomAccess/keeperZone").subscribe(()=>{W=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.speakToKeeper")}),callback:()=>{p("id-card")?(n(l.keeperName,"views.museum.bigRoomAccess"),y("keeperDoorOpen")):n(l.keeperName,"views.museum.bigRoomNoAccess")}})}),WA.room.onLeaveLayer("bigRoomAccess/keeperZone").subscribe(()=>{W==null||W.remove()});for(let e=1;e<8;e++)Y([{stepIn:`fogsZone/fog${[e]}`,hide:`fogs/fog${[e]}`}]);const N=e=>{let s=null;WA.room.onEnterLayer(`search/s${e}`).subscribe(()=>{e===5&&!p("id-card")?s=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.search")}),callback:()=>{M({id:"id-card",name:"museum.idCardTitle",image:"indentity-card.png",description:"museum.idCardDescription"})}}):s=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.search")}),callback:()=>{s=WA.ui.displayActionMessage({message:o("museum.searchEmpty"),callback:()=>{}})}})}),WA.room.onLeaveLayer(`search/s${e}`).subscribe(()=>{s==null||s.remove()})};for(let e=1;e<8;e++)N(e);const G=e=>{let s=null;WA.room.onEnterLayer(`pickPocketInvited/i${e}`).subscribe(()=>{s=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.pickpocket")}),callback:()=>{C("switchLights")?n(l.museumGuest,"museum.cannotPickPocket","views.choice.close","discussion",()=>{n(l.mySelf,"museum.needDistraction","views.choice.close","discussion")}):e===8&&!p("access-card")?M({id:"access-card",name:"museum.accessCard",image:"gold-key.png",description:"museum.accessCardDescription"}):s=WA.ui.displayActionMessage({message:o("museum.pickpocketEmpty"),callback:()=>{}})}})}),WA.room.onLeaveLayer(`pickPocketInvited/i${e}`).subscribe(()=>{s==null||s.remove()})};for(let e=1;e<13;e++)G(e);let c=null;WA.room.onEnterLayer("desktopAccessZone").subscribe(()=>{p("access-card")?c=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.desktopOpen")}),callback:()=>{c=WA.ui.displayActionMessage({message:o("museum.desktopOpenMsg"),callback:()=>{y("desktopDoorOpen")}})}}):c=WA.ui.displayActionMessage({message:o("museum.doorClosed"),callback:()=>{}})}),WA.room.onLeaveLayer("desktopAccessZone").subscribe(()=>{c==null||c.remove()});for(let e=0;e<9;e++){let s=null;WA.room.onEnterLayer(`desktopItems/i${e}`).subscribe(()=>{s=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("museum.search")}),callback:()=>{e===0?n(l.annuaryTitle,"views.museum.annuaryContent"):s=WA.ui.displayActionMessage({message:o(`museum.desktopItems${e}`),callback:()=>{}})}})}),WA.room.onLeaveLayer(`desktopItems/i${e}`).subscribe(()=>{s==null||s.remove()})}const m=["cameraZones/cZone1","cameraZones/cZone2","cameraZones/cZone3","cameraZones/cZone4","cameraZones/cZone5","cameraZones/cZone6"],Z=[{x:8*32,y:68*32},{x:26*32,y:68*32},{x:15*32,y:63*32},{x:10*32,y:27*32},{x:47*32,y:23*32},{x:47*32,y:42*32}],t=ie(),J={room1:{x:5*32,y:60*32,width:t,height:t},room2:{x:5*32,y:44*32,width:t,height:t},room3:{x:3*32,y:3*32,width:t,height:t},room4:{x:60*32,y:4*32,width:t,height:t},room5:{x:50*32,y:32*32,width:t,height:t},room6:{x:31*32,y:51*32,width:t,height:t},room7:{x:37*32,y:33*32,width:t,height:t}};g("retrieveMap",()=>{M({id:"secret-map",name:"museum.secretMap.title",image:"secret-map.png",description:"museum.secretMap.description"}),oe("museum.mapRetrieved","utils.success","success"),i(["chestOpened"],!0),pe()},!1),g("desktopDoorOpen",()=>{const e=[];e.push({x:38,y:11,tile:null,layer:"desktopCollides"}),e.push({x:39,y:11,tile:null,layer:"desktopCollides"}),WA.room.setTiles(e),WA.room.hideLayer("doorsClosed/dc4")},!1);let L=null;g("deactivateCamera",e=>{for(let s=0;s<m.length;s++)i(m[s],!0);i(e,!1),L===e&&WA.controls.restorePlayerControls()},""),g("switchLights",e=>{e?D():R()},!0),setTimeout(()=>{C("switchLights")?D():R()},200),WA.player.state.askForSwitchLights=!0,WA.player.state.askForDeactivateCamera=!1,WA.player.state.askForCloseComputerWebsite=!1,WA.player.state.askForSeeRoom=!1,WA.player.state.onVariableChange("askForDeactivateCamera").subscribe(e=>{e&&y("deactivateCamera",e)}),WA.player.state.onVariableChange("askForCloseComputerWebsite").subscribe(e=>{e&&E()}),WA.player.state.onVariableChange("askForSwitchLights").subscribe(e=>{y("switchLights",e)}),WA.player.state.onVariableChange("askForSeeRoom").subscribe(e=>{const s=J["room"+e];re(s.x,s.y),i(`fogs/fog${e}`,!1)});const U=await q();for(let e=0;e<m.length;e++)WA.room.onEnterLayer(m[e]).subscribe(()=>{C("deactivateCamera")!==m[e]&&(U==="spy"?n(l.mySelf,"museum.cantStayInCamera","utils.close","discussion",async()=>{WA.controls.disablePlayerControls(),await WA.player.moveTo(Z[e].x,Z[e].y),WA.controls.restorePlayerControls()}):(L=m[e],n(l.mySelf,"museum.cannotWalkInCameras","utils.close","discussion",()=>{C("deactivateCamera")!==L&&WA.controls.disablePlayerControls()})))});let v=null;const j=async()=>{WA.ui.modal.openModal({title:"Camera Map",src:`${P}/views/museum/buildingMap.html`,position:"right",allowApi:!0,allow:"fullscreen"},()=>{E()});const e=WA.state.loadVariable("currentCameraPosition");if(e){const{x:s,y:x}=e;B(s,x)}WA.controls.disablePlayerControls(),WA.player.state.askForCloseComputerWebsite=!1,le(),ce()},E=()=>{v==null||v.close(),v=null,ne(),WA.controls.restorePlayerControls(),WA.camera.followPlayer(!0)};let d=null;WA.room.onEnterLayer("computerZone").subscribe(()=>{d=WA.ui.displayActionMessage({message:o("utils.executeAction",{action:o("utils.hack")}),callback:()=>{I("useComputers")?j():n(l.mySelf,"museum.cannotUseComputers","utils.close","discussion")}})}),WA.room.onLeaveLayer("computerZone").subscribe(()=>{d==null||d.remove(),d=null}),WA.state.saveVariable("currentCameraPosition",{x:0,y:0}).catch(e=>console.error("Something went wrong while saving variable",e)),I("useComputers")?WA.state.onVariableChange("currentCameraPosition").subscribe(e=>{const{x:s,y:x}=e;B(s,x)}):WA.player.onPlayerMove(e=>{he(e)})});const B=(a,r)=>{WA.camera.set(a,r,void 0,void 0,!0,!0),A=0,k=void 0},he=a=>{A++,A>5?(WA.state.currentCameraPosition={x:a.x,y:a.y},A=0):(k&&clearTimeout(k),k=setTimeout(()=>{WA.state.currentCameraPosition={x:a.x,y:a.y},A=0},1e3))};