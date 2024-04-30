export default {
  title: "{job} card",
  name: "Name",
  close: 'Close',
  jobs: {
    archaeologist: {
      name: 'Archaeologist',
      attributes: 'Name : {name}<br> Level: Advanced',
      description: 'Congratulations, you are now a member of the Budding Archaeologists. We certify, by issuing this card, that you can:',
      permissions: {
        speakAncienLanguages: "Speak the ancient languages.",
        readRunes: 'Read the runes',
        makeExcavation: 'Do excavations'
      }
    },
    spy: {
      name: 'Spy',
      attributes: 'Name : {name}<br> Registration number: 007',
      description: 'Special state agent. Specialized in :',
      permissions: {
        useComputers: 'computer hacking',
        findSecretPassages: 'find and use secret passages',
        makeHooking: 'Hook'
      }
    }
  }
}