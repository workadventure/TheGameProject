/// <reference types="@workadventure/iframe-api-typings" />

import * as utils from '../../src/utils/index.js';
import { myGameName } from '../../src/utils/main';

const MAX_RANKING_NUMBER_SHOWN = 10;

document.addEventListener("DOMContentLoaded", async () => {
    WA.onInit().then(async () => {

        const ranking = await globalRanking();

        // Get the start game timestamp of the user from firebase
        let stratGame = await utils.firebase.getStartGameTimestamp();
        // Get the end game timestamp of the user from firebase
        let endGame = await utils.firebase.getEndGameTimestamp();

        if(!endGame || !stratGame) {
            if(ranking != undefined) renderRanking(ranking);
            return;
        }

        // Calculate the best start time taken by the users
        let bestStartTime = 0;
        for(const player in stratGame) {
            if(stratGame[player].timestamp < bestStartTime) bestStartTime = stratGame[player].timestamp;
            else bestStartTime = stratGame[player].timestamp;
        }

        // Calculate the best end time taken by the users
        let bestEndTime = 0;
        for(const player in endGame) {
            if(endGame[player].timestamp < bestEndTime) bestEndTime = endGame[player].timestamp;
            else bestEndTime = endGame[player].timestamp;
        }

        // Calculate the best time taken by the users
        const timeTaken = {myGame : bestEndTime - bestStartTime};

        // Include the user's time in the ranking
        ranking?.push([myGameName(), timeTaken.myGame]);

        // Sort the "timeTakenByGames" array by time
        const sortedTimeTakenByGames = ranking?.sort(([,a],[,b]) => (a as number)-(b as number)) as Array<[string, number]>;
        renderRanking(sortedTimeTakenByGames, myGameName());
    });
});

const globalRanking = async () : Promise<Array<[string, number]>|undefined> => {
    // Get all end game timestamps from firebase
    const allEndGameTimestamps = await utils.firebase.getAllEndGameTimestamp();

    // Get all start game timestamps from firebase
    const allStartGameTimestamps = await utils.firebase.getAllStartGameTimestamp();

    if(!allEndGameTimestamps || !allStartGameTimestamps) {
        WA.ui.modal.closeModal();
        return undefined;
    }

    // Calculate the time taken by each game to complete the game
    const timeTakenByGames = {};
    for(const game in allEndGameTimestamps) {
        // Get the best end time taken by the game
        let bestEndTime = 0;
        for(const player in allEndGameTimestamps[game]) {
            if(allEndGameTimestamps[game][player].timestamp < allEndGameTimestamps[game][player].timestamp) bestEndTime = allEndGameTimestamps[game][player].timestamp;
            else bestEndTime = allEndGameTimestamps[game][player].timestamp;
        }

        // Get the best start time taken by the game
        if(!allStartGameTimestamps[game]) continue;
        let bestStartTime = 0;
        for(const player in allStartGameTimestamps[game]) {
            if(allStartGameTimestamps[game][player].timestamp < allStartGameTimestamps[game][player].timestamp) bestStartTime = allStartGameTimestamps[game][player].timestamp;
            else bestStartTime = allStartGameTimestamps[game][player].timestamp;
        }

        if(bestEndTime === 0 || bestStartTime === 0) continue;

        // Calculate the time taken by the game
        timeTakenByGames[game] = bestEndTime - bestStartTime;
    }

    // Sort the "timeTakenByGames" array by time
    return Object.entries(timeTakenByGames) as Array<[string, number]>;
};

// Renderer for the ranking
const renderRanking = async (ranking: Array<[string, number]>, myGameName?: string) => {
    const rankingElement = document.getElementById('ranking');
    rankingElement?.childNodes.forEach(child => child.remove());

    let myIndexNameShowed = false;
    for(const [index, game] of ranking.slice(0,MAX_RANKING_NUMBER_SHOWN).entries()) {
        const gameName = game[0];
        const time = game[1];
        const timeInMinutes = Math.floor(time / 60000);
        const timeInSeconds = Math.floor((time % 60000) / 1000);
        const timeString = `${timeInMinutes}min ${timeInSeconds}s`;
        const p = document.createElement('p');
        p.classList.add('rank');
        p.textContent = `#${index + 1} ${atob(gameName)} : ${timeString}`;
        rankingElement?.appendChild(p);

        myIndexNameShowed = myIndexNameShowed || gameName === myGameName;
    }

    try{
        const gameStep = await utils.firebase.getGameStep();
        if(gameStep?.step == undefined || gameStep?.step == "choice") return await translateForNewGame();
    }catch(e){
        return await translateForNewGame();
    }
    if(myIndexNameShowed) return;
    // Get my game index in the ranking
    const myIndexGame = ranking.findIndex(([name]) => myGameName === name);
    if(myIndexGame === -1) return;
    const myGame = ranking[myIndexGame];
    const myGameTime = myGame[1];
    const myGameTimeInMinutes = Math.floor(myGameTime / 60000);
    const myGameTimeInSeconds = Math.floor((myGameTime % 60000) / 1000);
    const myGameTimeString = `${myGameTimeInMinutes}min ${myGameTimeInSeconds}s`;
    
    const p = document.createElement('p');
    p.textContent = "...";

    const myGameElement = document.createElement('p');
    myGameElement.classList.add('rank');
    myGameElement.id = "myGame";
    myGameElement.textContent = `#${myIndexGame + 1} ${myGameName} : ${myGameTimeString}`;
    
    rankingElement?.appendChild(p);
    rankingElement?.appendChild(myGameElement);

    translateForEndGame();
};

const translateForNewGame = async () => {
    const title = document.getElementById('title');
    if(title) title.innerText = await utils.translations.translate('views.ranking.start.title');
};
const translateForEndGame = async () => {
    const title = document.getElementById('title');
    if(title) title.innerText = await utils.translations.translate('views.ranking.end.title');
};