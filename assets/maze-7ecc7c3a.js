import{e as p,i as b}from"./job-eb8dc8ef.js";import{t as r}from"./translate-d272070d.js";import{p as y,r as f}from"./sounds-5d3f972e.js";import{i as W}from"./hiddenZone-8ca7275f.js";import{i as L}from"./switchingTiles-ebadba9a.js";import{o as F}from"./init-0f7c740a.js";import{i as B,r as m,d as u}from"./inventory-cca9f553.js";import{s as T}from"./hooking-43362ee1.js";import{h as w}from"./workadventureFeatures-48ab46db.js";import"./notifications-69979190.js";let c=null;const g=(e=["excavationZone"],a=null)=>{for(let o=0;o<e.length;o++)WA.state[`${e[o]}Discovered`]?(WA.room.hideLayer(`${e[o]}/trace`),WA.room.hideLayer(`${e[o]}/search`),WA.room.showLayer(`${e[o]}/found`),a&&a[o]&&a[o]()):(p("makeExcavation")?(WA.room.showLayer(`${e[o]}/trace`),WA.room.onEnterLayer(`${e[o]}/trace`).subscribe(()=>{WA.state[`${e[o]}Discovered`]||(c=WA.ui.displayActionMessage({message:r("utils.executeAction",{action:r("modules.excavation.makeExcavations")}),callback:()=>{WA.state[`${e[o]}Discovered`]=!0}}))}),WA.room.onLeaveLayer(`${e[o]}/trace`).subscribe(()=>{c==null||c.remove()})):(WA.room.hideLayer(`${e[o]}/trace`),WA.room.hideLayer(`${e[o]}/search`),WA.room.hideLayer(`${e[o]}/found`)),WA.state.onVariableChange(`${e[o]}Discovered`).subscribe(()=>{S(e[o],a?a[o]:null)}))},S=(e,a=null)=>{WA.room.hideLayer(`${e}/trace`),WA.room.showLayer(`${e}/search`),setTimeout(()=>{WA.room.showLayer(`${e}/found`),setTimeout(()=>{WA.room.hideLayer(`${e}/search`),y("successSound"),a&&a()},1e3)},3e3)};F().then(async()=>{const e=WA.sound.loadSound(`${f}/sounds/forest.mp3`);let a={volume:.5,loop:!0,rate:1,detune:1,delay:0,seek:0,mute:!1};e.play(a);for(let s=1;s<10;s++)W([{stepIn:`fogFloor/fog${[s]}`,hide:`fog/fog${[s]}`}]);WA.player.state.hasFoundBlueSeed=!1,WA.player.state.hasFoundGreenSeed=!1,WA.player.state.hasFoundRedSeed=!1,B(),await b(),w();const o=()=>{WA.state.blueFire&&(WA.room.hideLayer("torchesTop/offTop/torcheBlueOffTop"),WA.room.hideLayer("torchesBot/offBot/torcheBlueOffBot"),WA.room.showLayer("torchesTop/onTop/torcheBlueOnTop"),WA.room.showLayer("torchesBot/onBot/torcheBlueOnBot"))};WA.state.onVariableChange("blueFire").subscribe(s=>{s&&o()}),WA.player.state.onVariableChange("hasFoundBlueSeed").subscribe(()=>{WA.room.hideLayer("blueSeed")});const A=()=>{WA.state.greenFire&&(WA.room.hideLayer("torchesTop/offTop/torcheGreenOffTop"),WA.room.hideLayer("torchesBot/offBot/torcheGreenOffBot"),WA.room.showLayer("torchesTop/onTop/torcheGreenOnTop"),WA.room.showLayer("torchesBot/onBot/torcheGreenOnBot"))};WA.state.onVariableChange("greenFire").subscribe(s=>{s&&A()}),WA.player.state.onVariableChange("hasFoundGreenSeed").subscribe(()=>{WA.room.hideLayer("excavations/exca6/found")});const h=()=>{WA.state.redFire&&(WA.room.hideLayer("torchesTop/offTop/torcheRedOffTop"),WA.room.hideLayer("torchesBot/offBot/torcheRedOffBot"),WA.room.showLayer("torchesTop/onTop/torcheRedOnTop"),WA.room.showLayer("torchesBot/onBot/torcheRedOnBot"))};WA.state.onVariableChange("redFire").subscribe(s=>{s&&h()}),WA.player.state.onVariableChange("hasFoundRedSeed").subscribe(()=>{console.log("todo")}),W([{stepIn:"hiddenZoneFloor/hiddenZoneFloor",hide:"hiddenZoneTop"}]),T("hiddenZoneFloor/hooking",()=>{u({id:"gem",name:r("maze.gem"),image:"gem.png",description:r("maze.gemDescription")}),WA.player.state.hasFoundRedSeed=!0}),g(["excavations/exca1","excavations/exca2","excavations/exca3","excavations/exca4","excavations/exca5"],[()=>{console.log("Excavation has been made !")}]);let t=null;g(["excavations/exca6"],[()=>{WA.room.onEnterLayer("excavations/exca6/found").subscribe(()=>{WA.player.state.hasFoundGreenSeed||(t=WA.ui.displayActionMessage({message:r("maze.takeSeedMsg"),callback:()=>{u({id:"graine",name:r("maze.seed"),image:"seed.png",description:r("maze.seedDescription")}),WA.player.state.hasFoundGreenSeed=!0}}))}),WA.room.onLeaveLayer("excavations/exca6/trace").subscribe(()=>{t==null||t.remove()})}]),L(["switchingTiles"],[()=>{WA.room.hideLayer("blueArtifact"),WA.room.showLayer("blueSeed"),WA.room.showLayer("switchTileVictory"),WA.room.onEnterLayer("blueSeed").subscribe(()=>{WA.player.state.hasFoundBlueSeed||(t=WA.ui.displayActionMessage({message:r("maze.takePowderMsg"),callback:()=>{u({id:"powder",name:r("maze.powder"),image:"shard.png",description:r("maze.powderDescription")}),WA.player.state.hasFoundBlueSeed=!0}}))}),WA.room.onLeaveLayer("blueSeed").subscribe(()=>{t==null||t.remove()})}]);let i=null;WA.room.onEnterLayer("triggerBlue").subscribe(()=>{WA.state.blueFire?i=WA.ui.displayActionMessage({message:r("maze.fireOn"),callback:()=>{}}):WA.player.state.hasFoundBlueSeed?i=WA.ui.displayActionMessage({message:r("maze.triggerBlue"),callback:()=>{m("powder"),WA.state.blueFire=!0}}):i=WA.ui.displayActionMessage({message:r("maze.empty"),callback:()=>{}})}),WA.room.onLeaveLayer("triggerBlue").subscribe(()=>{i==null||i.remove()});let n=null;WA.room.onEnterLayer("triggerRed").subscribe(()=>{WA.state.redFire?n=WA.ui.displayActionMessage({message:r("maze.fireOn"),callback:()=>{}}):WA.player.state.hasFoundRedSeed?n=WA.ui.displayActionMessage({message:r("maze.triggerRed"),callback:()=>{m("gem"),WA.state.redFire=!0}}):n=WA.ui.displayActionMessage({message:r("maze.empty"),callback:()=>{}})}),WA.room.onLeaveLayer("triggerRed").subscribe(()=>{n==null||n.remove()});let l=null;WA.room.onEnterLayer("triggerGreen").subscribe(()=>{WA.state.greenFire?l=WA.ui.displayActionMessage({message:r("maze.fireOn"),callback:()=>{}}):WA.player.state.hasFoundGreenSeed?l=WA.ui.displayActionMessage({message:r("maze.triggerGreen"),callback:()=>{m("seed"),WA.state.greenFire=!0}}):l=WA.ui.displayActionMessage({message:r("maze.empty"),callback:()=>{}})}),WA.room.onLeaveLayer("triggerGreen").subscribe(()=>{l==null||l.remove()}),WA.state.onVariableChange("blueFire").subscribe(()=>{d()}),WA.state.onVariableChange("redFire").subscribe(()=>{d()}),WA.state.onVariableChange("greenFire").subscribe(()=>{d()});const d=()=>{WA.state.blueFire&&WA.state.redFire&&WA.state.greenFire&&(y("successSound"),WA.room.showLayer("dragonTopLight"),WA.room.showLayer("dragonLight"),WA.room.showLayer("mountainDoorAnimate"),WA.room.setTiles([{x:16,y:4,tile:null,layer:"collisions"}]),o(),A(),h())};d(),WA.room.onEnterLayer("exit").subscribe(()=>{e.stop()})});
