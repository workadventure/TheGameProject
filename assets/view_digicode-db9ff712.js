import"./main-b4a669df.js";import"./translate-1ba34e64.js";import"./sounds-bea9d6c6.js";import{a as r,b as l}from"./digicode-874dab7a.js";import"./config-adf52b6e.js";document.addEventListener("DOMContentLoaded",()=>{let e="";WA.onInit().then(async()=>{const s=new URLSearchParams(window.location.search).get("id"),n=document.getElementsByClassName("code-button"),c=document.getElementById("cancel"),i=document.getElementById("validate"),t=document.getElementById("codeDisplay"),a=document.getElementById("close");if(n)for(let o=0;o<n.length;o++)n[o].addEventListener("click",d=>{d.target instanceof Element&&(e+=d.target.id.replace("button","")||"",t&&(t.innerHTML=e))});c&&c.addEventListener("click",()=>{e="",t&&(t.innerHTML=e)}),i&&i.addEventListener("click",()=>{r(s,e)}),a&&a.addEventListener("click",()=>{l()})})});