import{r as l}from"./config-adf52b6e.js";import{e as d,g as m,f as a}from"./firebase-f59070e7.js";const t=["choice","museum","maze","music","treasureEnigma","bomb","escape"],f=async o=>{await WA.onInit(),WA.controls.disableWebcam(),WA.controls.disableMicrophone(),WA.controls.disableInviteButton(),console.info("During this game, the invite button is disabled"),WA.controls.disableRightClick(),console.info("During this game, the right click button is disabled"),WA.controls.disableScreenSharing(),console.info("During this game, the screen sharing is disabled"),WA.controls.disableMapEditor(),console.info("During this game, the map editor is disabled");const i=await d();console.info("Your current step in the game is: ",i==null?void 0:i.step);const e=await m(),c=await WA.nav.getCoWebSites();if((e==null||e.choice==null)&&WA.ui.modal.openModal({allowApi:!0,position:"center",allow:"fullscreen",title:"become spy",src:`${l}/views/playing/playing.html`}),(e==null?void 0:e.choice)=="onlive"&&g(c),(i==null?void 0:i.step)==o)return;if((!i||!i.step)&&o=="choice"){await a(o);return}if(i==null){WA.nav.goToRoom(`./${t[0]}.tmj`);return}const r=t.findIndex(n=>n===o),s=t.findIndex(n=>n===i.step);if(r!==s+1){WA.nav.goToRoom(`./${t[s]}.tmj`);return}else await a(o)},g=o=>{o.forEach(i=>{i.close()})};export{f as o};