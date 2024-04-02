/// <reference types="@workadventure/iframe-api-typings" />

type hiddenZoneType = {
  stepIn: string,
  hide: string
}

const initiateHiddenZones = (zones: Array<hiddenZoneType>) => {
  for (let i = 0; i < zones.length; i++) {

    const zone = zones[i].hide;
    const variable = `${zones[i].stepIn.replace('eyes/', '')}Activated`;
    const layerName = zones[i].stepIn;
    
    WA.state.onVariableChange(variable).subscribe((newValue) => {
      if(newValue === true) {
        WA.room.hideLayer(zone)
      }else{
        WA.room.showLayer(zone);
      }
    });

    WA.room.onEnterLayer(layerName).subscribe(() => {
      WA.room.hideLayer(zone)
      WA.state[variable] = true;
    });

    WA.room.onLeaveLayer(layerName).subscribe(() => {
      WA.room.showLayer(zone);
      WA.state[variable] = false;
    });
  }
}

export {
  initiateHiddenZones
}