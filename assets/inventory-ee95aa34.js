import{r as i}from"./config-adf52b6e.js";import{t as o}from"./translate-1ba34e64.js";import{n as s}from"./notifications-bb73e947.js";import{p as c}from"./sounds-bea9d6c6.js";const l=3,g=()=>{WA.player.state.inventory||(WA.player.state.inventory="[]"),WA.ui.actionBar.addButton({id:"inventory",type:"action",imageSrc:`${i}/images/inventory/school-bag.svg`,toolTip:o("modules.inventory.inventory"),callback:async()=>{r?a():await y()}}),WA.player.state.onVariableChange("askForInventoryWebsiteClose").subscribe(t=>{t&&a()})},h=t=>{try{const e=JSON.parse(WA.player.state.inventory);return!u(t.id)&&e.length<l?(c("successSound"),e.push(t),WA.player.state.inventory=JSON.stringify(e),s(o("modules.inventory.objectTaken",{object:o(t.name)}),null,"success"),setTimeout(()=>{y()},500),!0):(s("modules.inventory.cannotTakeThis",null,"error"),!1)}catch{return!1}},u=t=>{try{const e=JSON.parse(WA.player.state.inventory);for(let n=0;n<e.length;n++)if(e[n].id===t)return!0;return!1}catch{return!1}},I=t=>{const e=v();for(let n=0;n<e.length;n++)e[n].id===t&&e.splice(n,1);return WA.player.state.inventory=JSON.stringify(e),!0};let r=null;const y=async()=>{WA.controls.disablePlayerControls(),r=await WA.ui.website.open({url:`${i}/views/inventory/inventory.html`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}}),WA.player.state.askForInventoryWebsiteClose=!1},a=()=>{r==null||r.close(),r=null,WA.controls.restorePlayerControls()},A=()=>{WA.player.state.askForInventoryWebsiteClose=!0},v=()=>JSON.parse(WA.player.state.inventory),W=()=>l,b=()=>"default.png";export{b as a,A as b,W as c,h as d,v as g,u as h,g as i,I as r};