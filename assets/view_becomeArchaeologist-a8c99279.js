import"./main-531b8551.js";import{o as a}from"./init-0f7c740a.js";import{s as m,u as d}from"./job-eb8dc8ef.js";import{c as i}from"./choice-3df3ac2a.js";import"./translate-d272070d.js";import"./sounds-5d3f972e.js";import"./discussion-49536565.js";import"./inventory-cca9f553.js";import"./notifications-69979190.js";import"./workadventureFeatures-48ab46db.js";document.addEventListener("DOMContentLoaded",async()=>{await a();const t=document.getElementById("accepted"),e=document.getElementById("ask"),o=document.getElementById("closeButton"),s=document.getElementById("startGameButton"),n=document.getElementById("cancelButton"),r=()=>{WA.ui.modal.closeModal(),WA.controls.restorePlayerControls()},c=()=>{m(),t==null||t.style.setProperty("display","flex"),e==null||e.style.setProperty("display","none"),i()},l=()=>{d(),r()};o==null||o.addEventListener("click",r),s==null||s.addEventListener("click",c),n==null||n.addEventListener("click",l),WA.player.state.job&&WA.player.state.job==="archaeologist"&&c()});