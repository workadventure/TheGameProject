import"./main-531b8551.js";import"./translate-a92a2393.js";import"./sounds-131a2a9b.js";import{a as r,b as l}from"./digicode-a092db28.js";import"./config-adf52b6e.js";document.addEventListener("DOMContentLoaded",()=>{let e="";WA.onInit().then(async()=>{const s=new URLSearchParams(window.location.search).get("id"),n=document.getElementsByClassName("code-button"),c=document.getElementById("cancel"),i=document.getElementById("validate"),t=document.getElementById("codeDisplay"),a=document.getElementById("close");if(n)for(let o=0;o<n.length;o++)n[o].addEventListener("click",d=>{d.target instanceof Element&&(e+=d.target.id.replace("button","")||"",t&&(t.innerHTML=e))});c&&c.addEventListener("click",()=>{e="",t&&(t.innerHTML=e)}),i&&i.addEventListener("click",()=>{r(s,e)}),a&&a.addEventListener("click",()=>{l()})})});