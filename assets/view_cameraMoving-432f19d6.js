import"./main-b4a669df.js";import{t as m}from"./translate-1ba34e64.js";import"./sounds-bea9d6c6.js";import{m as e}from"./cameraMovingMode-25e0b85e.js";import"./config-adf52b6e.js";document.addEventListener("DOMContentLoaded",()=>{WA.onInit().then(async()=>{const t=document.getElementById("cameraMoveRight"),n=document.getElementById("cameraMoveLeft"),o=document.getElementById("cameraMoveUp"),a=document.getElementById("cameraMoveDown"),i=document.getElementById("close"),c=document.getElementById("cameraMoveTitle");t&&t.addEventListener("click",()=>{e("right")}),n&&n.addEventListener("click",()=>{e("left")}),a&&a.addEventListener("click",()=>{e("down")}),o&&o.addEventListener("click",()=>{e("up")}),i&&i.addEventListener("click",()=>{WA.player.state.askForCloseCameraMovingWebsite=!0}),c&&(c.innerText=m("views.cameraMoving.mobileCamera").toUpperCase())})});