import"./main-531b8551.js";import{t}from"./translate-df78904b.js";import{a as r,b as y}from"./job-89290bbb.js";import{c as p}from"./choice-e0ee79f6.js";import"./firebase-a8cde200.js";import"./sounds-dd62bce7.js";import"./discussion-84b3e643.js";import"./inventory-3654ccf7.js";import"./notifications-7daea5fb.js";import"./workadventureFeatures-48ab46db.js";import"./init-4335d005.js";import"./ranking-d1b631d0.js";const u=async()=>{const e=document.getElementById("title"),n=document.getElementById("text1"),o=document.getElementById("text2"),i=document.getElementById("text3"),a=document.getElementById("startGameButton"),c=document.getElementById("closeButton"),s=document.getElementById("cancelButton"),l=document.getElementById("validateTitle"),d=document.getElementById("validateText1"),m=document.getElementById("validateText2");e&&(e.innerText=await t("choice.spy.title")),n&&(n.innerText=await t("choice.spy.text1")),o&&(o.innerText=await t("choice.spy.text2")),i&&(i.innerText=await t("choice.spy.text3")),a&&(a.innerText=await t("choice.spy.startGameButton")),c&&(c.innerText=await t("choice.spy.closeButton")),s&&(s.innerText=await t("choice.spy.cancelButton")),l&&(l.innerText=await t("choice.spy.validateTitle")),d&&(d.innerText=await t("choice.spy.validateText1")),m&&(m.innerText=await t("choice.spy.validateText2"))};document.addEventListener("DOMContentLoaded",async()=>{await WA.onInit(),await u();const e=document.getElementById("accepted"),n=document.getElementById("ask"),o=document.getElementById("closeButton"),i=document.getElementById("startGameButton"),a=document.getElementById("cancelButton"),c=()=>{WA.ui.modal.closeModal(),WA.controls.restorePlayerControls()},s=()=>{r(),e==null||e.style.setProperty("display","flex"),n==null||n.style.setProperty("display","none"),p()},l=()=>{y(),c()};o==null||o.addEventListener("click",c),i==null||i.addEventListener("click",s),a==null||a.addEventListener("click",l),WA.player.state.job&&WA.player.state.job==="spy"&&s()});
