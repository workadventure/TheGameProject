const u={executeAction:"[ESPACE] {action}",shoot:"Tirer",see:"Consulter",hack:"Pirater",examine:"Examiner",seeTheRules:"Voir les règles",mySelf:"Moi",success:"Succès",failure:"Échec",close:"Fermer",voiceOver:"Voix-off"},c={jobChanged:"Vous êtes maintenant {job}",jobs:{archaeologist:"Archéologue",spy:"Espion"},myJobWallet:{label:"Portefeuille"}},d={makeExcavations:"Faire des fouilles"},m={findSecretPassage:"Chercher un passage secret"},h={playersList:"Liste des joueurs autour de moi",invite:"Inviter",accept:"Accepter",refuse:"Refuser",cancel:"Annuler",players:"Joueurs",connectToInvite:"Connectez-vous pour pouvoir inviter quelqu'un",notAuthenticated:"Non-authentifié",waitingForAnswer:"En attente de réponse. Veuillez patienter.",youAreGoingToBeRedirected:"Vous allez être redirigé vers le jeu",letSGo:"C'est parti !",close:"Fermer",playerIsNotAvailable:"Le joueur n'est pas disponible",youHaveBeenInvitedBy:"Vous avez été invité par "},p={close:"Fermer",see:"Consulter"},g={inventory:"Mon inventaire",close:"Fermer",empty:"Vide",inventoryItem:"Objet n°{itemNo}",looksDelicious:"Ce croissant a l'air délicieux, mais ça n'est pas bon pour ma ligne",cannotTakeThis:"Je ne peux pas prendre cet objet",objectTaken:'Vous avez ramassé: "{object}"'},E={hook:"Crocheter"},v=Object.freeze(Object.defineProperty({__proto__:null,excavation:d,hooking:E,inventory:g,job:c,lobby:h,runes:p,secretPassage:m},Symbol.toStringTag,{value:"Module"})),b={title:"Carte d'{job}",name:"Nom",close:"Fermer",jobs:{archaeologist:{name:"Archéologue",attributes:"Nom : {name}<br> Niveau: Avancé",description:"Félicitations, vous êtes désormais membre des archéologues en herbe. Nous certifions par la délivrance de la présente carte que vous pouvez :",permissions:{speakAncienLanguages:"Parler les anciens langages",readRunes:"Lire les runes",makeExcavation:"Faire des fouilles"}},spy:{name:"Espion",attributes:"Nom : {name}<br> Matricule: 007",description:"Agent spécial d'état. Spécialisé dans :",permissions:{useComputers:"le piratage informatique",findSecretPassages:"trouver et emprunter les passages secrets",makeHooking:"Crocheter des serrures"}}}},y={title:"Madame Auriane Tassion",close:"OK !",text:`Bienvenue au bureau des métiers extraordinaires !
Vous êtes ici aujourd'hui parce que vous avez un profil complémentaire, vous ne pouvez donc pas choisir le même métier !
Choisissez votre futur métier MAINTENANT :nA GAUCHE vous trouverez la porte qui vous mènera vers le métier d'ESPION.
A DROITE vous trouverez la porte qui vous mènera vers le métier d'ARCHEOLOGUE.`},A={title:"Seul celui qui fera preuve d'élégance pourra continuer son chemin",close:"OK !",text:`310143135310103
16143531043510503
1310153141340503
3165435353151051 
31014153103513416`},T={content:`1 - 5 - 3 - Rouge - Blanc - BOUM
5 - 6 - 9 - Bleu - Jaune - Noir - PRESS
Rouge - Jaune - 9 - 7 - 6 - 4 - 0 - BOUM
1 - Vert - 9 - 7 - Orange - 2 - BOUM
Jaune - Rouge - 8 - 6 - Blanc - PRESS
Orange - Bleu - 4 - 3 - Rouge - 0 - PRESS`,note:"Pour desamorcer les bombes"},I={keeperName:"Agent de Securité",bigRoomAccess:"Je ne vous avais pas reconnu ! Allez y, entrez, je vous en prie",bigRoomNoAccess:"Qui êtes vous ?! Vous ne pouvez pas entrer si vous n'êtes pas invité, allez on dégage !",annuaryTitle:"livre super secret de la mort qui tue",annuaryContent:`Notes personnelles
23/05/2016
Première expéditio pour le monde nouveau à la recherche du remède. L'équipe à bien attend l'île mais n'a plus donné signe de vie après 2 semaines.
30/05/2016
Je pense que quelque chose ou quelqu'un de dangereux à compromis cette mission. Nous devons tenter une nouveklle expédition!

16/06/2016
Les préparatifs de la mission sont en cours et nous devons trouver le moyen de nous rendre sur place pour constater et comprendre l'echec de la précédente mission. Mais cela peut être risqué... L'enjeux dépasse les risques... Nous devons y aller...`,beginText:`Après tant d'années, nos deux amis se sont retrouvés dans le but de trouver un remède qui pourrait aider l'humanité entière.
Ils n'ont qu'une seule piste : Une carte menant à l'artefact se trouverait dans le bureau d'un homme faisant partie de l'élite.
Après de nombreux mois à élaborer un plan, c'est le moment d'agir : les voilà dans la demeure dans laquelle se trouverait la précieuse carte...
Le maitre des lieux aurait trouver une civilisation qui pourrait avoir trouver le moyen de créer le remède. Il est le seul à avoir une carte permettant de trouver l'île de cette civilisation bien cachée.
nom de code de l'opération : Projet Weasley.`,beginDiscussion:`Enfin nous avons réussi à entrer ! Je te rappellle le plan : 
1 - Trouver la salle de contrôle pour désactiver les caméras, si on a bien visé, ça doit être la porte juste là
2 - Trouver un moyen d'entrer dans la salle du musée où se passe la fête, c'est normalement la grande salle au milieu du bâtiment
3 - Trouver le maître des lieux et lui subtiliser la clé de son bureau
4 - Trouver son bureau, y entrer et voler la carte menant au temple où se trouve le remède
Facile non ? Allez c'est parti !`},f={mobileCamera:"Camera mobile"},S={title:"{name} a sauvé le monde avec son compagnon 💪",text:"Grâce à deux courageux amis d'enfance, le monde va enfin connaître la paix. Au péril de leurs vies, ces deux aventuriers ont bravé le danger pour ramener LE remède qui nous permettra de guérir tous les maux de l'humanité. Ils ont accepté de nous donner une interview exclusive. Bla bla bla... 😍",rankingButton:"Voir mon classement 🏆",linkedind:{button:"Partager sur LinkedIn 🙏",title:"PRÊT À SAUVER LE MONDE ? 🌍🚀🔥",summary:"Bienvenue dans cette nouvelle aventure à deux joueurs ! Êtes-vous prêt à sauver le monde ?"}},k={start:{title:"Est-ce que tu penses pouvoir faire mieux ?! 🤔"},end:{title:"Félicitations ! Tu as terminé le jeu 🏆"}},N={title:"Comment vas tu jouer avec ton collègues ? 🤔",onlineTitle:"En ligne",online:"Je vais jouer en ligne avec mon collègue",onliveTitle:"En présentiel",onlive:"Je vais jouer en présentiel avec mon collègue"},R=Object.freeze(Object.defineProperty({__proto__:null,cameraMoving:f,cheatSheet:T,choice:y,jobWallet:b,museum:I,music:A,newspaper:S,playing:N,ranking:k},Symbol.toStringTag,{value:"Module"})),L={talk:"Parler",spyMessage:"Devenir espion (ATTENTION CHOIX DEFINITIF)",archeoMessage:"Devenir archéolgue (ATTENTION CHOIX DEFINITIF)",takeCroissantMessage:"Prendre un croissant",looksDelicious:"Ce croissant a l'air délicieux... Mais ce n'est pas bon pour ma ligne. 🥐",scenario:"Voici l'histoire de deux amis d'enfance. Ils ont grandi ensemble, sont allés à l'école ensemble, mais aujourd'hui, il est temps qu'ils prennent des chemins différents. Les voici dans le bureau de la conseillère d'orientation de leur lycée, prêts à choisir leur futur métier.",spy:{title:"Le métier d'espion !",text1:"Deviens l'espion de la partie 😈",text2:"C'est un rôle majeur et la première compétence est... NE PAS ÊTRE TIMIDE !",text3:"Penses-tu pouvoir être un grand espion ?",startGameButton:"Espion 😍... C'est parti 💪",closeButton:"Pas encore sûr 🤔",cancelButton:"Finalement... Ce n'est pas pour moi... 😱",validateTitle:"Tu es l'espion 😍",validateText1:"Bienvenue dans la nouvelle partie, l'espion est un rôle majeur dans ce jeu d'évasion. Prépare-toi et attends ton collègue pour commencer la partie.",validateText2:"Pas sûr ? Pas de problème, tu peux annuler et revenir pour choisir un autre métier !"},archaeologist:{title:"Le métier d'archéologue !",text1:"Deviens l'archéologue de la partie 🏺",text2:"C'est un rôle majeur et la première compétence est... AVOIR LE SENS DE L'OBSERVATION !",text3:"Penses-tu pouvoir être un grand archéologue ?",startGameButton:"Archéologue 😍... C'est parti 💪",closeButton:"Pas encore sûr 🤔",cancelButton:"Finalement... Ce n'est pas pour moi... 😱",validateTitle:"Tu es l'archéologue 😍",validateText1:"Bienvenue dans la nouvelle partie, l'archéologue est un rôle majeur dans ce jeu d'évasion. Prépare-toi et attends ton collègue pour commencer la partie.",validateText2:"Pas sûr ? Pas de problème, tu peux annuler et revenir pour choisir un autre métier !"}},O={takeSeed:"Prendre la graine",seed:"Graine",seedDescription:"Cette graine semble différente, Aïe! ça pique !",takeSeedMsg:"[ESPACE] Prendre la graine magique",takePowder:"Prendre la poudre",powder:"Eclat",takePowderMsg:"[ESPACE] Prendre l'éclat de lune",powderDescription:"Ça ressemble à de la poussière d'étoile... Atchoum, oups...",takeGem:"Prendre la gemme",gem:"Gemme",takeGemMsg:"[ESPACE] Prendre la gemme de feu",gemDescription:"Ça semble brûlant... oucha, c'est chaud !",triggerBlue:"[ESPACE] Déposer l'éclat de lune",triggerGreen:"[ESPACE] Déposer la graine magique",triggerRed:"[ESPACE] Déposer la gemme de feu",empty:"Je pense qu'on doit mettre quelque chose ici...",fireOn:"Comme c'est beau !"},w={display:"Lire la stèle"},C={content:`IL ÉTAIT UNE FOIS, ALORS QUE LE MONDE ÉTAIT PLONGÉ DANS L'OBSCURITÉ ET LE DÉSESPOIR, UN GRAND ET NOBLE CHEVALIER CHOISI POUR PROTÉGER LA LUMIÈRE, LA SEULE CHOSE QUI S'OPPOSAIT À UNE VICTOIRE TOTALE DES FORCES DES TÉNÈBRES.

LE CHEVALIER ÉTAIT BRAVE ET COURAGEUX, ET AVAIT ÉTUDIÉ L'ART DE LA GUERRE PENDANT DE NOMBREUSES ANNÉES, SE PRÉPARANT AINSI À CETTE BATAILLE. GUIDÉ PAR LA CHEVALERIE ET LA JUSTICE, IL AFFRONTA LA HORDE DÉMONIAQUE AVEC COURAGE ET BRAVOURE.

AU DÉBUT, LE COURAGE DU CHEVALIER NE SEMBLE PAS LUI AVOIR SERVI À GRAND-CHOSE FACE À L'IMMENSE ARMÉE DE DÉMONS. EN MOINS D'UNE JOURNÉE, IL SEMBLAIT QUE LE CHEVALIER SERAIT SUBMERGÉ PAR LA HORDE DE MONSTRES QUI SEMBLAIT NE JAMAIS VOULOIR S'ARRÊTER. MAIS UN MIRACLE S'EST PRODUIT.

ALORS QUE L'ÉPÉE DU CHEVALIER SEMBLAIT SUR LE POINT D'ÊTRE ÉCRASÉE PAR UN PUISSANT DÉMON, UN ANGE DESCENDIT DES CIEUX, BRILLANT D'UNE LUMIÈRE BLANCHE AVEUGLANTE. DANS SA MAIN SE TROUVAIT UNE ÉPÉE FLAMBOYANTE, BRÛLANT D'UNE FLAMME IMPIE, ET L'aNGE L'ABATTIT SUR LA TÊTE DU DÉMON, L'INCINÉRANT.

CET ANGE N'ÉTAIT PAS UN SIMPLE MESSAGER, MAIS UN SERVITEUR DE LA JUSTICE DIVINE. L'ANGE AVAIT ÉTÉ ENVOYÉ PAR DIEU LUI-MÊME POUR APPORTER LA JUSTICE ET LA LUMIÈRE AU MONDE. DANS UN ÉCLAIR AVEUGLANT, L'ANGE DISPARUT, NE LAISSANT DERRIÈRE LUI QUE SON ÉPÉE ENFLAMMÉE.

LE cHEVALIER, INSPIRÉ PAR CETTE INTERVENTION DIVINE, SE BATTIT AVEC UNE FORCE NOUVELLE ET RALLIA SON ARMÉE. AVEC LE DON DE L'ANGE EN MAIN, LE CHEVALIER SE LANÇA DANS LA BATAILLE, BRANDISSANT L'ÉPÉE FLAMBOYANTE ET TERRASSANT L'ARMÉE DÉMONIAQUE AVEC UNE PRÉCISION SURNATURELLE. À LA FIN, LE CHEVALIER SORTIT VICTORIEUX DE LA BATAILLE, DEBOUT AU MILIEU DES CORPS DÉCHUS DE LA HORDE dÉMONIAQUE.

DEPUIS CE JOUR, UNE LÉGENDE S'EST RÉPANDUE PARMI LE PEUPLE DU CHEVALIER : DANS LES PÉRIODES D'OBSCURITÉ ET DE DÉSESPOIR, IL Y AURA TOUJOURS UN CHEVALIER CHOISI POUR PROTÉGER LA LUMIÈRE, ET CES GUERRIERS ÉLUS N'ONT PAS BESOIN DE SE BATTRE SEULS, CAR DANS LES MOMENTS DE DÉSESPOIR, UN ANGE VIENDRA LES SAUVER.`,title:"Texte ancien",active:"Toucher la statue 🤩",artifact:"[TOUCHER] Comme c'est beau, je ne peux pas resister à l'envie d'y toucher... 😍"},P={go:"C'est parti !",doorClosed:"Cette porte semble fermée",search:"Fouiller",idCardTitle:"Carte d'identité",idCardDescription:"La carte d'identité de quelqu'un qui a l'air vraiment très très important",searchEmpty:"Rien d'intéressant...",speakToKeeper:"Parler",pickpocket:"Pickpocketer",pickpocketEmpty:"mmmh... non, rien d'intéressant",accessCard:"Clé dorée",accessCardDescription:"Clé dorée d'une pièce qui a l'air importante",desktopOpenMsg:"*Clic clac* c'est ouvert !",desktopOpen:"Introduire la clé dorée",desktopItems0:"Un livre qui semble être intéressant",desktopItems1:"Je crois que je connais cette personne... ah ! c'est un mirroir",desktopItems2:"L'australie ! Oh non encore ? Et oui c'est le jeu ma pauvre Lucette...",desktopItems3:"Ce livre a pour titre 'NECRONOMICON', ça a l'air sympa",desktopItems4:"Un coffre fort... La carte doit être à l'intérieur ! Mais... quel est le code ? Il doit y avoir un indice quelque part...",desktopItems5:"Tiens c'est marrant, on dirait Narnia au fond de cette armoire ! Dommage qu'elle soit fermée à clé...",desktopItems6:"Pas mal l'armure",desktopItems7:"Franchement... mon petit neveu aurait pu faire ce tableau... avec ses pieds... et les yeux bandés !",desktopItems8:"Génial, une carte ! Il manque un bout... Surement ce que nous devont retrouver !",beginBtn:"Commencer l'aventure",cannotUseComputers:"Je n'ai jamais rien compris aux ordinateurs...",guest:"Invité",cannotPickPocket:"Non mais dites ! Faut pas vous gêner ! Vous avez de la chance que je n'appelle pas immédiatement la sécurité !",needDistraction:"Mince ! Il me faudrait une distraction pour pouvoir fouiller les poches des invités...",cantStayInCamera:"Mince ! je suis dans le champs de vision d'une caméra... Je ne dois pas rester ici ! Je dois vite m'en aller avant qu'elle ne me repère !",secretMap:{title:"Carte top secrète",description:"Une carte qui permet de trouver le remède à tous les maux de l'humanité"},escape:"S'enfuir",plan:"Plan",inspect:"Inspecter",mapRetrieved:"La carte a été récupérée 💪",cannotWalkInCameras:"Mince ! Je n'avais pas vu cette caméra ! Si je bouge d'un centimètre, elle va me repérer... Il faut vite que quelqu'un la désactive !",goToTheNextRoom:"Vous pouvez vous diriger vers la prochaine étape... ne tardez pas... tic tac tic tac... 🕰️"},U={runes:{content:"L'ange fixe la pleine lune. Lorsque tout le monde lui tourne le dos, le temps est bouleversé. Lorsque le temps n'existe plus, le secret est révélé."},breakHourglass:"Briser le sablier",makeTurn:"Faire pivoter",takeTheTreasure:"Prendre le trésor",badGuy:{name:"Le capitaine de la première expédition",monologue:"Mouahahahahaha ! J'ai enfin trouvé cet endroit grâce à vous ! Merci pour votre aide ! Vous pensiez sincèrement sauver l`humanité... Nous sommes tous perdus et vous allez rester coincé à tout jamais avec ce remède. Jamais vous ne sortirez et jamais vous ne ramènerez ce remède... Tic tac... Tic tac... Adieu !"},hammer:{name:"Marteau",description:"Je dois bien pouvoir en faire quelque chose...",action:"Prendre le marteau",opened:"Une trappe s'est ouverte !"}},D={story:{spy:"😱 Mince ! L'espion est coincé sous une pierre avec le remède... Il faut trouver un moyen de partir d'ici, mais je n'aurai jamais le temps de le décoincer avant que cette bombe n'explose...",archaeologist:"Mince! l'espion est coincé sous une pierre avec le remède... Il faut trouver un moyen de partir d'ici, mais je n'aurais jamais le temps de le décoincer avant que cette bombe n'explose..."},freeSpy:{noTime:"Mais qu'est-ce que je fais ?!? On n'a pas le temps !!! la bombe va exploser !!! Je dois vite aller la désactiver",free:"Libérer",success:{mySelf:"Vous avez été libéré",other:"L'espion a été libéré"}},bomb:{defuse:"Désamorcer",success:"La bombe a été désamorcée",wrong:"FAUX : - {number} secondes",failure:{name:"Micro dans la bombe",message:"BOUM ! HAHA non, je n'allais quand même pas utiliser une vraie bombe sur vous. De toute façon, vous ne pourrez jamais sortir d'ici vivants. Prenez-ça comme un cadeau d'adieu!"}},cheatSheet:"Antisèche"},M={activateRandom:"Lancer la sélection aléatoire",whatIsThat:`Lorsque la sélection aléatoire sera lancée par les administrateurs, les équipes aléatoires seront choisies et envoyées dans leurs map respectives.Seul les joueurs présents dans la zone de sélection (zone rouge) seront pris en compte dans l'aléatoire.
/!\\ Attention : Si vous entrez dans la zone de sélection, vous ne serez plus capable d'en sortir.
/!\\ Attention : Vous devez être connectés si vous souhaitez que la sélection fonctionne`,notValid:"Le nombre de joueur n'est pas valide",displayInfos:"Informations",infoPanel:"Panneau d'informations",admin:"Administrateur",connectToParticipate:"Connectez-vous pour participer"},x=Object.freeze(Object.defineProperty({__proto__:null,bomb:D,choice:L,escape:C,lobby:M,maze:O,modules:v,museum:P,music:w,treasureEnigma:U,utils:u,views:R},Symbol.toStringTag,{value:"Module"})),j={executeAction:"[SPACE] {action}",shoot:"Shoot",see:"See",hack:"Hack",examine:"Examiner",seeTheRules:"See the rules",mySelf:"Me",success:"Success",failure:"Failure",voiceOver:"Voice-over",close:"Fermer"},B={jobChanged:"You are now a(n) {job}",jobs:{archaeologist:"Archaeologist",spy:"Spy"},myJobWallet:{label:"Wallet"}},q={makeExcavations:"Make excavations"},V={findSecretPassage:"Search a secret passage"},G={playersList:"Players around me",invite:"Invite",accept:"Accept",refuse:"Refuse",cancel:"Cancel",players:"Players",connectToInvite:"Log in to invite someone",notAuthenticated:"Not authenticated",waitingForAnswer:"Waiting for an answer. Please wait.",youAreGoingToBeRedirected:"You're going to be redirected to the game",letSGo:"Let's go !",close:"Close",playerIsNotAvailable:"Player is not available",youHaveBeenInvitedBy:"You have been invited by "},H={close:"Close",see:"See"},z={inventory:"My inventory",close:"Close",empty:"Empty",inventoryItem:"Object n°{itemNo}",looksDelicious:"This croissant looks delicious, but it's not good for my figure",cannotTakeThis:"I can't take this.",objectTaken:'You took: "{object}"'},F={hook:"Hook"},W=Object.freeze(Object.defineProperty({__proto__:null,excavation:q,hooking:F,inventory:z,job:B,lobby:G,runes:H,secretPassage:V},Symbol.toStringTag,{value:"Module"})),$={title:"{job} card",name:"Name",close:"Close",jobs:{archaeologist:{name:"Archaeologist",attributes:"Name : {name}<br> Level: Advanced",description:"Congratulations, you are now a member of the Budding Archaeologists. We certify, by issuing this card, that you can:",permissions:{speakAncienLanguages:"Speak the ancient languages.",readRunes:"Read the runes",makeExcavation:"Do excavations"}},spy:{name:"Spy",attributes:"Name : {name}<br> Registration number: 007",description:"Special state agent. Specialized in :",permissions:{useComputers:"computer hacking",findSecretPassages:"find and use secret passages",makeHooking:"Hook"}}}},J={title:"Miss Guy Dance",close:"OK !",text:`Welcome to the Office of Extraordinary Jobs!
Today, you're here because you have a unique profile, so you can't choose the same job as the other player!Choose your future career NOW:
To the LEFT is the door leading to the profession of SPY.
To the RIGHT is the door leading to the profession of ARCHAEOLOGIST.`},_={title:"Only those who show elegance will be able to continue their journey",close:"OK !",text:`310143135310103
16143531043510503
1310153141340503
3165435353151051 
31014153103513416`},Y={content:`1 - 5 - 3 - Red - White - BOUM
5 - 6 - 9 - Blue - Yellow - Black - PRESS
Red - Yellow - 9 - 7 - 6 - 4 - 0 - BOUM
1 - Green - 9 - 7 - Orange - 2 - BOUM
Yellow - Red - 8 - 6 - White - PRESS
Orange - Blue - 4 - 3 - Red - 0 - PRESS`,note:"to defuse bombs"},Q={keeperName:"Security guard",bigRoomAccess:"I didn't recognize you! Go ahead, enter please",bigRoomNoAccess:"Who are you?! You can't come in if you're not invited, so beat it!",annuaryTitle:"Super secret book",annuaryContent:`Personal notes
23/05/2016
First expedition to the new world in search of the cure. The team has reached the island but has not been heard from for 2 weeks.
30/05/2016
I think something or someone dangerous has compromised this mission. We must attempt a new expedition!

16/06/2016
The preparations for the mission are underway and we must find a way to get there to see and understand the failure of the previous mission. But it could be risky... The stakes outweigh the risks... We must go...`,beginText:`After years apart, our two friends have reunited with a shared mission: finding a cure to benefit all humanity.
They possess just one lead—a map to the artifact, rumored to be hidden in the office of one of the elite.
After months of meticulous planning, the time for action has arrived. Now, they stand at the gates of the mansion where the precious map is believed to be located.
The owner has discovered a civilization that may have found a way to create the cure. He alone holds the map to the hidden island of this civilization.
under the code name of Operation Weasley.`,beginDiscussion:`At last we've managed to get inside !Let me remind you of the plan:
1 - Find the control room to deactivate the cameras. If we've aimed correctly, it should be the door right there.
2 - Find a way to get into the room in the museum where the party is taking place, which is normally the large room in the middle of the building.
3 - Find the owner and steal his office key
4 - Find his office, enter it and steal the map leading to the temple where the cure is located
Easy, isn't it? Here we go!`},K={mobileCamera:"Mobile camera"},X={title:"{name} and his friend save the world 💪",text:"Thanks to two courageous childhood friends, the world will finally know peace. At the risk of their lives, these two adventurers braved danger to bring back THE remedy that will enable us to cure all the ills of humanity. bla bla bla... 😍",rankingButton:"See my ranking 🏆",linkedind:{button:"Share on LinkedIn 🙏",title:"READY TO SAVE THE WORLD? 🌍🚀🔥",summary:"Welcome to this new two-player adventure! Are you ready to save the world?"}},Z={start:{title:"Do you think you could do better?! 🤔"},end:{title:"Congratulations! You have completed the game 🏆"}},ee={title:"How will you play with your colleague? 🤔",onlineTitle:"Online",online:"I will play online with my colleague",onliveTitle:"Side by side",onlive:"I will play onlive with my colleague"},te=Object.freeze(Object.defineProperty({__proto__:null,cameraMoving:K,cheatSheet:Y,choice:J,jobWallet:$,museum:Q,music:_,newspaper:X,playing:ee,ranking:Z},Symbol.toStringTag,{value:"Module"})),oe={talk:"Talk",spyMessage:"Become a spy (FINAL DECISION)",archeoMessage:"Become an archaeologist (FINAL DECISION)",takeCroissantMessage:"Take a croissant",looksDelicious:"This croissant looks delicious, but it's not good for my figure",scenario:"This is the story of two childhood friends. They grew up side by side, attending the same school. But now, it's time for them to chart their own paths. Here they sit in the guidance counselor's office, ready to decide their future careers.",spy:{title:'The "SPY" job!',text1:"Embark on the adventure as the spy of the game! 😈",text2:"This is a crucial role, and the first skill needed is... to NOT BE SHY!",text3:"Could you imagine being a great spy?",startGameButton:"Spy 😍... Let's go 💪",closeButton:"Not sure yet 🤔",cancelButton:"At the end, it's not for me ... 😱",validateTitle:'You are the "SPY" 😍',validateText1:"Welcome to the new game, where the spy plays a major role in this escape game. Get ready and await your colleague to start the game.",validateText2:"Not sure? No problem, you can cancel it and choose another job instead!"},archaeologist:{title:'The "archaeologist" job',text1:"Embark on the adventure as the archaeologist of the game! 🏺",text2:"This is a crucial role, and the first skill required is... HAVING A KEEN SENSE OF OBSERVATION!",text3:"Could you imagine yourself as a great archaeologist?",startGameButton:"archaeologist 😍... Let's go 💪",closeButton:"Not sure yet 🤔",cancelButton:"At the end, it's not for me ... 😱",validateTitle:'You are the "archaeologist" 😍',validateText1:"Welcome to the new game, where the archaeologist plays a major role in this escape game. Get ready and await your colleague to start the game.",validateText2:"Not sure? No problem, you can cancel it and choose another job instead!"}},ae={takeSeed:"Take the seed",seed:"Seed",seedDescription:"This seed feels different, ouch! It stings!",takeSeedMsg:"[SPACE] Take the seed",takePowder:"Take the powder",powder:"Powder",takePowderMsg:"[SPACE] Take the moon shard",powderDescription:"It looks like stardust ...Achoo! Oops...",takeGem:"Take the gem",gem:"gem",takeGemMsg:"[SPACE] Take the fire gem",gemDescription:"It looks like it's burning... Ouch, it's hot!",triggerBlue:"[SPACE] Drop the moon shard",triggerGreen:"[SPACE] Drop the magical seed",triggerRed:"[SPACE] Drop the fire gem",empty:"I think we need to drop something here...",fireOn:"That's beautiful!"},ne={display:"Read the headstone"},se={content:`The knight was valiant and courageous, having delved into the art of war for many years, preparing himself for this epic clash. With chivalry and justice as his compass, he confronted the demonic horde with unwavering bravery.
Initially, it seemed the knight's valor would avail him little against the vast army of demons. In less than a day, it appeared as though he would be overwhelmed by the seemingly unending swarm of monsters. But then, a miracle unfolded.
Just when the knight's sword was on the verge of being shattered by a mighty demon, an angel descended from the heavens, radiating with blinding white light. In its hand was a flaming sword, blazing with an unholy fire, and the angel brought it down upon the demon's head, incinerating it.
This angel was not a mere messenger, but a servant of divine justice. Sent by God Himself to bring light and justice to the world, the angel vanished in a blinding flash, leaving only its flaming sword behind.
Inspired by this divine intervention, the knight fought with newfound strength and rallied his army. With the angel's gift in hand, he charged into battle, wielding the flaming sword and striking down the demonic army with supernatural precision. In the end, the knight emerged victorious, standing amidst the fallen bodies of the demonic horde.
From that day forward, it became a legend among the knight's people: that in times of darkness and despair, there will always be a chosen knight to protect the light, and that these chosen warriors need not fight alone, for in times of desperation, an angel will come to their rescue.`,title:"Ancient manuscript",active:"Touch the statue 🤩",artifact:"[TOUCH] How beautiful, I can't resist to touch it... 😍"},ie={go:"GO!",doorClosed:"This door seems to be locked",search:"Search",idCardTitle:"Identity card",idCardDescription:"The identity card of someone who appears extremely important.",searchEmpty:"Nothing interesting...",speakToKeeper:"Talk",pickpocket:"Pickpocket",pickpocketEmpty:"mmmh... no, nothing interesting",accessCard:"Golden key",accessCardDescription:"The golden key to a room that looks important.",desktopOpenMsg:"Click clack, and it's open!",desktopOpen:"Try the golden key",desktopItems0:"An intriguing book",desktopItems1:"I think I know this person... oh! it's a mirror",desktopItems2:"Oh, how I'd love to travel!",desktopItems3:"The title of this book is 'NECRONOMICON', that sounds intriguing.",desktopItems4:"A safe... The card must be inside! But... what's the code? There must be a clue somewhere...",desktopItems5:"Funny, it looks like Narnia in this cabinet! It's a shame it's locked...",desktopItems6:"Nice armor",desktopItems7:"Honestly... my little nephew could have painted this... with his feet... and blindfolded!",desktopItems8:"A map! Oh, but it seems not complete... Maybe we need find!",beginBtn:"Start the adventure",cannotUseComputers:"I don't understand anything about computers.",guest:"Guest",cannotPickPocket:"Hey! What are you doing? You're lucky I'm not calling security right away!",needDistraction:"Damn! I need a distraction so I can go through the guests' pockets...",cantStayInCamera:"Damn! I'm in the camera's field of vision... I can't stay here! I've got to get out before she spots me!",secretMap:{title:"Secret map",description:"A map to find the cure for all of mankind's ailments."},escape:"Escape",plan:"Plan",inspect:"Inspect",mapRetrieved:"The map has been retrieved 💪",cannotWalkInCameras:"I can't walk within the camera's field of vision.",goToTheNextRoom:"You can proceed to the next step... don't wait too long... tick tock tick tock... 🕰️"},re={runes:{content:"The angel stares at the full moon. When everyone else turns away, time is flipped on its head. When time ceases to exist, the secret is revealed."},breakHourglass:"Break the hourglass",makeTurn:"Rotate",takeTheTreasure:"Take the treasure",badGuy:{name:"The captain of the first expedition",monologue:"Mwahahahahaha! I've finally found this place thanks to you! Thank you for your help! You really thought you could save humanity... We're all doomed, and you'll be stuck here forever with this cure. You'll never get out, and you'll never bring back this cure... Tic tac... Tic tac... Farewell!"},hammer:{name:"Hammer",description:"There must be something I can do with it...",action:"Take the hammer",opened:"A hatch has opened!"}},le={story:{spy:"Woof! When he ran away, it triggered an earthquake that trapped me under a rock withe the cure... And there's this bomb about to explode... Luckily, I always have my bomb-disarming cheat sheet with me!",archaeologist:"Damn it! The spy is stuck under a rock with the cure... We've got to find a way to get out of here, but I'll never have time to get him unstuck before this bomb explodes..."},freeSpy:{noTime:"What the hell am I doing?!? There's no time! The bomb's going to explode! I've got to go and deactivate it",free:"Release",success:{mySelf:"You've been released",other:"The spy has been released"}},bomb:{defuse:"Defuse",success:"The bomb has been defused",wrong:"WRONG : - {number} seconds",failure:{name:"Microphone in the bomb",message:"BOOM! Haha, no, I wasn't going to use a real bomb on you. You'll never get out of here alive anyway. Think of it as a going-away present!"}},cheatSheet:"CheatSheet"},ue={activateRandom:"Start random selection",whatIsThat:`When the random selection is launched by the administrators, the random teams will be chosen and sent to their respective maps.Only players present in the selection zone (red zone) will be included in the random selection.
Warning: If you enter the selection zone, you will not be able to leave it.
Warning: You MUST be logged in if you want the selection to work properly`,notValid:"Player number is not valid",displayInfos:"Informations",infoPanel:"Infos Pannel",admin:"Administrator",connectToParticipate:"Please connect to participate"},ce=Object.freeze(Object.defineProperty({__proto__:null,bomb:le,choice:oe,escape:se,lobby:ue,maze:ae,modules:W,museum:ie,music:ne,treasureEnigma:re,utils:j,views:te},Symbol.toStringTag,{value:"Module"})),r={"fr-FR":x,"en-US":ce};let a="fr-FR";WA.onInit().then(()=>{a=WA.player.language,Object.keys(r).includes(a)||(a="en-US")});const l=(o,n={})=>{let s=o;const t=Object.keys(n);for(let e=0;e<t.length;e++)s=s.replaceAll("{"+t[e]+"}",n[t[e]]);return s},de=(o,n={})=>{const t=o.split(".").reduce((e,i)=>(!e||!e[i]?e=void 0:e=e[i],e),r[a]);return t&&typeof t=="string"?l(t,n):o},me=Object.freeze(Object.defineProperty({__proto__:null,getSentenceWithVariables:l,get playerLanguage(){return a},translate:de},Symbol.toStringTag,{value:"Module"}));export{me as a,de as t};