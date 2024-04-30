export default {
  title: "Carte d'{job}",
  name: "Nom",
  close: 'Fermer',
  jobs: {
    archaeologist: {
      name: 'Archéologue',
      attributes: 'Nom : {name}<br> Niveau: Avancé',
      description: 'Félicitations, vous êtes désormais membre des archéologues en herbe. Nous certifions par la délivrance de la présente carte que vous pouvez :',
      permissions: {
        speakAncienLanguages: 'Parler les anciens langages',
        readRunes: 'Lire les runes',
        makeExcavation: 'Faire des fouilles'
      }
    },
    spy: {
      name: 'Espion',
      attributes: 'Nom : {name}<br> Matricule: 007',
      description: 'Agent spécial d\'état. Spécialisé dans :',
      permissions: {
        useComputers: 'le piratage informatique',
        findSecretPassages: 'trouver et emprunter les passages secrets',
        makeHooking: 'Crocheter des serrures'
      }
    }
  }
}