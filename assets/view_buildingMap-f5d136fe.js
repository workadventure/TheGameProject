import"./main-531b8551.js";document.addEventListener("DOMContentLoaded",()=>{WA.onInit().then(async()=>{const l=e=>{WA.player.state.askForDeactivateCamera=e?"cameraZones/"+e:null},d=e=>{WA.player.state.askForSeeRoom=e},m=()=>{WA.player.state.askForCloseComputerWebsite=!0},u=()=>{WA.player.state.askForSwitchLights=!WA.player.state.askForSwitchLights},a=document.getElementsByClassName("camera"),c=document.getElementsByClassName("room"),n=document.getElementById("closeButton"),s=document.getElementById("hackingWindow"),r=document.getElementById("lightnings");let o=!1;if(r&&s&&r.addEventListener("click",()=>{o||(o=!0,s.classList.add("show"),setTimeout(()=>{u(),s.classList.remove("show"),o=!1},2e3))}),a&&s)for(let e=0;e<a.length;e++)a[e].addEventListener("click",()=>{o||(o=!0,s.classList.add("show"),setTimeout(()=>{l(a[e].getAttribute("id"));for(let t=0;t<a.length;t++)a[t].classList.remove("deactivated");a[e].classList.add("deactivated"),s.classList.remove("show"),o=!1},2e3))});if(c&&s)for(let e=0;e<c.length;e++)c[e].addEventListener("click",()=>{o||(o=!0,s.classList.add("show"),setTimeout(()=>{const t=c[e].getAttribute("id");console.log("room",t==null?void 0:t.replace("room","")),t&&d(t.replace("room","")),s.classList.remove("show"),o=!1},2e3))});n&&n.addEventListener("click",()=>{m()});let i=document.getElementById("WokaCircle");WA.state.onVariableChange("currentCameraPosition").subscribe(e=>{const{x:t,y:g}=e;i||(i=document.getElementById("WokaCircle")),i&&(i.setAttribute("cx",`${t+100}`),i.setAttribute("cy",`${g+200}`))})})});
