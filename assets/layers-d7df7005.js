import{w as a}from"./firebase-a8cde200.js";const i=(t,e=!0)=>{if(typeof t=="string")e?WA.room.showLayer(t):WA.room.hideLayer(t);else if(e)for(let o=0;o<t.length;o++)WA.room.showLayer(t[o]);else for(let o=0;o<t.length;o++)WA.room.hideLayer(t[o])},f=async(t,e=300)=>{i(t[0]);for(let o=1;o<t.length;o++)await a(e),i(t[o-1],!1),i(t[o]);return i(t[t.length-1],!1),!0},l=(t,e)=>({x:Math.floor(t/32),y:Math.floor(e/32)}),g=async()=>{const t=await WA.player.getPosition();return l(t.x,t.y)},c=async(t,e,o,n,s=300)=>{WA.room.setTiles([{x:t,y:e,tile:o[0],layer:n}]);for(let r=1;r<o.length;r++)await a(s),WA.room.setTiles([{x:t,y:e,tile:o[r],layer:n}])},m=Object.freeze(Object.defineProperty({__proto__:null,getPlayerPositionTileCoordinate:g,getTileCoordinate:l,replaceTileAnimation:c,toggleLayersVisibility:i,triggerAnimationWithLayers:f},Symbol.toStringTag,{value:"Module"}));export{f as a,m as l,i as t};