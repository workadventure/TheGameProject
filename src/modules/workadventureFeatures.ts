/// <reference types="@workadventure/iframe-api-typings" />

const hidePricingButton = () => {
  setTimeout(() => {
    WA.ui.actionBar.removeButton('pricing-btn');
  }, 200)
}

const hideInviteButton = () => {
  setTimeout(() => {
    // TODO : not working
    WA.ui.actionBar.removeButton('invite-btn');
  }, 200)
}

const hidePremiumBanner = () => {
  setTimeout(() => {
    // @ts-ignore
    WA.ui.banner.closeBanner('freemium-banner')
  }, 200)
}

export {
  hidePricingButton,
  hideInviteButton,
  hidePremiumBanner
}