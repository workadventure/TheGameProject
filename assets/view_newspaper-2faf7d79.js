import"./main-531b8551.js";import{t as o}from"./translate-d272070d.js";import{o as a}from"./init-0f7c740a.js";document.addEventListener("DOMContentLoaded",()=>{a().then(async()=>{const e=document.getElementById("picture"),t=document.getElementById("title"),n=document.getElementById("content"),i=document.getElementById("date");n&&(n.innerText=o("views.newspaper.text")),t&&(t.innerText=o("views.newspaper.title",{name:WA.player.name})),e&&(e.src=await WA.player.getWokaPicture()),i&&(i.innerText=new Date().toDateString())})});
