import{t as s}from"./translate-1ba34e64.js";import{f as t}from"./job-1b9471bc.js";import{p as m}from"./sounds-bea9d6c6.js";let a=null;const $=(e,r=null)=>{WA.state[`${e}Discovered`]?(WA.room.hideLayer(`${e}/trace`),WA.room.hideLayer(`${e}/search`),WA.room.hideLayer(`${e}/disappear`),WA.room.showLayer(`${e}/found`),r&&r()):(t("makeHooking")?(WA.room.showLayer(`${e}/trace`),WA.room.onEnterLayer(`${e}/trace`).subscribe(()=>{WA.state[`${e}Discovered`]||(a=WA.ui.displayPlayerMessage({message:s("utils.executeAction",{action:s("modules.hooking.hook")}),callback:()=>{WA.state[`${e}Discovered`]=!0}}))}),WA.room.onLeaveLayer(`${e}/trace`).subscribe(()=>{a==null||a.remove()})):(WA.room.hideLayer(`${e}/trace`),WA.room.hideLayer(`${e}/search`),WA.room.hideLayer(`${e}/found`),WA.room.showLayer(`${e}/disappear`)),WA.state.onVariableChange(`${e}Discovered`).subscribe(()=>{d(e,r)}))},d=(e,r=null)=>{WA.room.hideLayer(`${e}/trace`),WA.room.showLayer(`${e}/search`),setTimeout(()=>{WA.room.showLayer(`${e}/found`),WA.room.hideLayer(`${e}/disappear`),setTimeout(()=>{WA.room.hideLayer(`${e}/search`),m("successSound"),r&&r()},1e3)},3e3)};export{$ as s};