import"./main-531b8551.js";import{t as a}from"./translate-df78904b.js";document.addEventListener("DOMContentLoaded",()=>{WA.onInit().then(async()=>{const c=window.location.search,e=new URLSearchParams(c),t=document.getElementById("notificationContainer"),i=document.getElementById("status"),s=document.getElementById("content"),n=document.getElementById("title"),d=e.get("index");t&&t.style.setProperty("margin-top",d*100+"px"),i&&i.classList.add(`bg-${e.get("type")}`),s&&(s.innerText=a(e.get("content")));const o=e.get("title");n&&(!o||o==="null"?n.remove():n.innerText=a(o)),t&&(t.classList.remove("hidden"),setTimeout(()=>{t.classList.add("hidden")},4e3))})});
