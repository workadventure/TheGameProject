const s=function*(e,t,a){let l=!1,i=[];for(;!l;){let g=yield,o=!1;i.push(g);for(let r=0;r<e.length;r++){let f=!0;for(let n=0;n<i.length;n++){if(e[r][n]===i[n]){n===e[r].length-1&&(l=!0,a());continue}f=!1;break}if(f){o=!0;break}}o||(i=[],t())}},u=(e,t,a,l)=>{window[`arrayFilling${e}`]=s(t,a,l),window[`arrayFilling${e}`].next()},c=(e,t)=>{window[`arrayFilling${e}`].next(t)};export{u as s,c as t};
