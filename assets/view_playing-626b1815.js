import"./main-531b8551.js";import{t as i}from"./translate-a92a2393.js";import{g as c,s as a}from"./firebase-09ce58cb.js";document.addEventListener("DOMContentLoaded",async()=>{await s();const n=await c();n!=null&&n.choice!=null&&WA.ui.modal.closeModal(),WA.onInit().then(async()=>{const e=document.getElementById("online"),t=document.getElementById("notonline");e==null||e.addEventListener("click",()=>{a("online"),WA.player.state.playingModeSelected=!0,WA.ui.modal.closeModal()}),t==null||t.addEventListener("click",async()=>{a("onlive"),WA.player.state.playingModeSelected=!0,WA.ui.modal.closeModal(),(await WA.nav.getCoWebSites()).forEach(o=>{o.close()})})})});const s=async()=>{const n=document.getElementById("title");n&&(n.innerText=await i("views.playing.title"));const e=document.getElementById("onlineTitle");e&&(e.innerText=await i("views.playing.onlineTitle"));const t=document.getElementById("onlineContent");t&&(t.innerText=await i("views.playing.online"));const o=document.getElementById("onliveTitle");o&&(o.innerText=await i("views.playing.onliveTitle"));const l=document.getElementById("onliveContent");l&&(l.innerText=await i("views.playing.onlive"))};
