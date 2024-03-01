/// <reference types="@workadventure/iframe-api-typings" />

type hiddenZoneType = {
  stepIn: string,
  hide: string
}

const initiateHiddenZones = (zones: Array<hiddenZoneType>) => {
  for (let i = 0; i < zones.length; i++) {
    WA.room.onEnterLayer(zones[i].stepIn).subscribe(() => {
      console.log('caché')
      WA.room.hideLayer(zones[i].hide)
    })

    WA.room.onLeaveLayer(zones[i].stepIn).subscribe(() => {
      console.log('pas caché')
      WA.room.showLayer(zones[i].hide)
    })
  }
}

export {
  initiateHiddenZones
}