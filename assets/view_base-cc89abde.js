import"./main-531b8551.js";import{t as s}from"./translate-da45fed2.js";import{a as c}from"./readRunes-0e90811b.js";import"./sounds-fa9583ac.js";import"./job-55a8da1b.js";import"./firebase-a8cde200.js";import"./config-adf52b6e.js";document.addEventListener("DOMContentLoaded",()=>{WA.onInit().then(async()=>{const a=window.location.search,e=new URLSearchParams(a),t=document.getElementById("title"),n=document.getElementById("content"),o=document.getElementById("closeButton"),i=e.get("canRead")==="0",r=e.get("title");t&&(r?(t.innerText=s(r),i&&t.classList.add("runes-font")):t.remove()),n&&(n.innerText=s(e.get("content")),i&&n.classList.add("runes-font")),o&&(o.innerText=s("modules.runes.close"),o.addEventListener("click",()=>{c()}))})});