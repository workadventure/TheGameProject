import"./main-531b8551.js";import{t as p}from"./translate-df78904b.js";import{p as c}from"./sounds-16fb2661.js";import{s as d,t as v}from"./arrayFilling-3bc428d4.js";import"./config-3db041a0.js";const n=30;document.addEventListener("DOMContentLoaded",()=>{WA.onInit().then(()=>{const i=()=>{c("successSound"),WA.player.state.askForDefuseBomb=!0},s=()=>{WA.player.state.askForBoom=!0},o=document.getElementsByClassName("clickable"),b=[["pave1","pave5","pave3","cableRed","cableWhite","boum"],["pave5","pave6","pave9","cableBlue","cableYellow","cableBlack","press"],["cableRed","cableYellow","pave9","pave6","pave4","pave0","boum"],["pave1","cableGreen","pave9","pave7","cableOrange","pave2","boum"],["cableYellow","cableRed","pave8","pave6","cableWhite","press"],["cableOrange","cableBlue","pave4","pave3","cableRed","pave0","press"]],m=()=>{if(o)for(let e=0;e<o.length;e++)o[e].classList.remove("clicked")};if(d("bomb",b,()=>{c("failureSound");const e=document.getElementById("losesInfos");if(e){const a=document.createElement("div");a.innerText=p("bomb.bomb.wrong",{number:n}),e.appendChild(a)}t=t-n<0?0:t-n,m()},()=>{i()}),o)for(let e=0;e<o.length;e++)o[e].addEventListener("click",()=>{console.log(o[e].getAttribute("id")),console.log("COUCOUCOUCOUC"),o[e].classList.add("clicked"),v("bomb",o[e].getAttribute("id"))});let t=60*5;const r=document.getElementById("counter");let l=null;r&&(l=setInterval(()=>{let e=0,a=0;t>0?(--t,e=Math.floor(t/60),a=Math.floor(t%60)):(s(),t=0),r.textContent=e+":"+(a<10?"0"+a.toString():a),t<=0&&(l&&clearInterval(l),s(),t=0)},1e3))})});
