import"./main-531b8551.js";import{t as o}from"./translate-df78904b.js";import{g as i,c,d as m}from"./job-89290bbb.js";import"./sounds-dd62bce7.js";import"./firebase-a8cde200.js";const d=async()=>o("views.jobWallet.title",{job:o(`views.jobWallet.jobs.${await i()}.name`)}),u=async()=>o(`views.jobWallet.jobs.${await i()}.attributes`,{name:WA.player.name}),b=async()=>o(`views.jobWallet.jobs.${await i()}.description`),p=async()=>{const t=document.createElement("ul"),e=c();if(!e)return t;for(let n=0;n<e.length;n++){const s=document.createElement("li");s.innerHTML=o(`views.jobWallet.jobs.${await i()}.permissions.${e[n]}`),t.appendChild(s)}return t},W=()=>o("views.jobWallet.close"),g=()=>{m()};document.addEventListener("DOMContentLoaded",()=>{WA.onInit().then(async()=>{const t=document.getElementById("photo"),e=document.getElementById("title"),n=document.getElementById("attributes"),s=document.getElementById("description"),r=document.getElementById("permissions"),a=document.getElementById("closeWalletWebsiteButton"),l=await WA.player.getWokaPicture();t&&t.setAttribute("src",l),e&&(e.innerText=await d()),n&&(n.innerHTML=await u()),s&&(s.innerText=await b()),r&&r.appendChild(await p()),a&&(a.innerText=W(),a.addEventListener("click",()=>{g()}))}).catch(t=>console.error(t))});
