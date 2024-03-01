export default {
  title: "{job} card",
  name: "Name",
  close: 'Close',
  jobs: {
    archaeologist: {
      name: 'Archaeologist',
      attributes: 'Name : {name}<br> Level: Advanced',
      description: 'Congratulations, you are now a member of the Budding Archaeologists. We certify by the issuance of this card that you can :',
      permissions: {
        speakAncienLanguages: 'Speak the old languages',
        readRunes: 'Read the runes',
        makeExcavation: 'Make excavation'
      }
    },
    spy: {
      name: 'Spy',
      attributes: 'Name : {name}<br> Registration number: 007',
      description: 'Special state agent. Specialized in :',
      permissions: {
        useComputers: 'computer hacking',
        findSecretPassages: 'find and use the secret passages',
        makeHooking: 'Hook'
      }
    }
  }
}