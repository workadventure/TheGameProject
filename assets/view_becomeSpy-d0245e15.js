import"./main-531b8551.js";import{t}from"./translate-a92a2393.js";import{a as y,c as r,b as u}from"./job-d586efa0.js";import"./firebase-09ce58cb.js";import"./config-3db041a0.js";const x=async()=>{const e=document.getElementById("title"),n=document.getElementById("text1"),o=document.getElementById("text2"),a=document.getElementById("text3"),c=document.getElementById("startGameButton"),i=document.getElementById("closeButton"),s=document.getElementById("cancelButton"),l=document.getElementById("validateTitle"),d=document.getElementById("validateText1"),m=document.getElementById("validateText2");e&&(e.innerText=await t("choice.spy.title")),n&&(n.innerText=await t("choice.spy.text1")),o&&(o.innerText=await t("choice.spy.text2")),a&&(a.innerText=await t("choice.spy.text3")),c&&(c.innerText=await t("choice.spy.startGameButton")),i&&(i.innerText=await t("choice.spy.closeButton")),s&&(s.innerText=await t("choice.spy.cancelButton")),l&&(l.innerText=await t("choice.spy.validateTitle")),d&&(d.innerText=await t("choice.spy.validateText1")),m&&(m.innerText=await t("choice.spy.validateText2"))};document.addEventListener("DOMContentLoaded",async()=>{await WA.onInit(),await x();const e=document.getElementById("accepted"),n=document.getElementById("ask"),o=document.getElementById("closeButton"),a=document.getElementById("startGameButton"),c=document.getElementById("cancelButton"),i=()=>{WA.ui.modal.closeModal(),WA.controls.restorePlayerControls()},s=()=>{y(),e==null||e.style.setProperty("display","flex"),n==null||n.style.setProperty("display","none"),r()},l=()=>{u(),i()};o==null||o.addEventListener("click",i),a==null||a.addEventListener("click",s),c==null||c.addEventListener("click",l),WA.player.state.job&&WA.player.state.job==="spy"&&s()});
