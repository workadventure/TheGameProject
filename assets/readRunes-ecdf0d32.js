import{t as a}from"./translate-d272070d.js";import{e as l}from"./job-eb8dc8ef.js";import{r}from"./sounds-5d3f972e.js";import{o as c}from"./init-0f7c740a.js";let t=null,i=null;const y=()=>{c().then(()=>{WA.player.state.onVariableChange("askForRuneWebsiteClose").subscribe(e=>{e&&b()})})},A=(e,n={},o="modules.runes.see",s="base")=>{WA.room.onEnterLayer(e).subscribe(()=>{i=WA.ui.displayActionMessage({message:a("utils.executeAction",{action:a(o)}),callback:()=>{u(n,s)}})}),WA.room.onLeaveLayer(e).subscribe(()=>{i==null||i.remove()})},u=async(e,n)=>{l("readRunes")||(e.canRead="0"),WA.controls.disablePlayerControls();let o="";for(let s=0;s<Object.keys(e).length;s++)s!==0&&(o+="&"),o+=Object.keys(e)[s]+"="+Object.values(e)[s];t=await WA.ui.website.open({url:`${r}/views/runes/${n}.html${o?"?"+o:""}`,allowApi:!0,allowPolicy:"",position:{vertical:"middle",horizontal:"middle"},size:{height:"50vh",width:"50vw"}}),WA.player.state.askForRuneWebsiteClose=!1},b=()=>{t==null||t.close(),t=null,WA.controls.restorePlayerControls()},R=()=>{WA.player.state.askForRuneWebsiteClose=!0};export{R as a,y as i,A as s};