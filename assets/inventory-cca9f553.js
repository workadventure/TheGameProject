import{r as i,p as y}from"./sounds-5d3f972e.js";import{t as o}from"./translate-d272070d.js";import{n as s}from"./notifications-69979190.js";const l=3,g=()=>{WA.player.state.inventory||(WA.player.state.inventory="[]"),WA.ui.actionBar.addButton({id:"inventory",type:"action",imageSrc:`${i}/images/inventory/school-bag.svg`,toolTip:o("modules.inventory.inventory"),callback:async()=>{r?a():await u()}}),WA.player.state.onVariableChange("askForInventoryWebsiteClose").subscribe(t=>{t&&a()})},m=t=>{const e=JSON.parse(WA.player.state.inventory);return!c(t.id)&&e.length<l?(y("successSound"),e.push(t),WA.player.state.inventory=JSON.stringify(e),s(o("modules.inventory.objectTaken",{object:o(t.name)}),null,"success"),!0):(s("modules.inventory.cannotTakeThis",null,"error"),!1)},c=t=>{const e=JSON.parse(WA.player.state.inventory);for(let n=0;n<e.length;n++)if(e[n].id===t)return!0;return!1},I=t=>{const e=v();for(let n=0;n<e.length;n++)e[n].id===t&&e.splice(n,1);return WA.player.state.inventory=JSON.stringify(e),!0};let r=null;const u=async()=>{WA.controls.disablePlayerControls(),r=await WA.ui.website.open({url:`${i}/views/inventory/inventory.html`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}}),WA.player.state.askForInventoryWebsiteClose=!1},a=()=>{r==null||r.close(),r=null,WA.controls.restorePlayerControls()},A=()=>{WA.player.state.askForInventoryWebsiteClose=!0},v=()=>JSON.parse(WA.player.state.inventory),W=()=>l,h=()=>"default.png";export{h as a,A as b,W as c,m as d,v as g,c as h,g as i,I as r};
