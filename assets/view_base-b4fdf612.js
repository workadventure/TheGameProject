import"./main-531b8551.js";import{t as s}from"./translate-d272070d.js";import{a as c}from"./readRunes-ecdf0d32.js";import"./sounds-5d3f972e.js";import{o as d}from"./init-0f7c740a.js";import"./job-eb8dc8ef.js";document.addEventListener("DOMContentLoaded",()=>{d().then(async()=>{const r=window.location.search,e=new URLSearchParams(r),t=document.getElementById("title"),n=document.getElementById("content"),o=document.getElementById("closeButton"),i=e.get("canRead")==="0",a=e.get("title");t&&(a?(t.innerText=s(a),i&&t.classList.add("runes-font")):t.remove()),n&&(n.innerText=s(e.get("content")),i&&n.classList.add("runes-font")),o&&(o.innerText=s("modules.runes.close"),o.addEventListener("click",()=>{c()}))})});
