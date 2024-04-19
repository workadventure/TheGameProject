import { myGameName } from "./main";

const FIREBASE_URL = "https://thegameproject-c216d-default-rtdb.europe-west1.firebasedatabase.app";

const getFirebaseUserRoleUrl = () => {
    return `${FIREBASE_URL}/${myGameName()}/userRole/${WA.player.uuid}.json`;
}

export const savePlayerJob = async (job: string): Promise<void> => {
    const url = getFirebaseUserRoleUrl();
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({job})
    });
};

export const getPlayerJob = async (): Promise<{job: string}> => {
    const url = getFirebaseUserRoleUrl();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

export const saveGem = async (gem: string): Promise<boolean> => {
    const url = `${FIREBASE_URL}/${myGameName()}/gems/${gem}.json`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({find: true})
    });
    return await response.json();
};

export const getGem = async (gem: string): Promise<{find: boolean}> => {
    const url = `${FIREBASE_URL}/${myGameName()}/gems/${gem}.json`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

// Save game step of the user in firebase
export const saveGameStep = async (step: "choice" | "museum" | "escape" | "treasureEnigma" | "bomb" | "maze" | "music"): Promise<void> => {
    const url = `${FIREBASE_URL}/${myGameName()}/gameStep/${WA.player.uuid}.json`;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({step})
    });
};

// Get game step of the user from firebase
export const getGameStep = async (): Promise<{step: "choice" | "museum" | "escape" | "treasureEnigma" | "bomb" | "maze" | "music"}|undefined> => {
    const url = `${FIREBASE_URL}/${myGameName()}/gameStep/${WA.player.uuid}.json`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

export const saveStartGameTimestamp = async (): Promise<void> => {
    const url = `${FIREBASE_URL}/startGameTimestamp/${myGameName()}/${WA.player.uuid}.json`;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({timestamp: Date.now()})
    });
};

export const endStartGameTimestamp = async (): Promise<void> => {
    const url = `${FIREBASE_URL}/endGameTimestamp/${myGameName()}/${WA.player.uuid}.json`;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({timestamp: Date.now()})
    });
};

// Get start game timestamp of the user from firebase
export const getStartGameTimestamp = async (): Promise<unknown> => {
    const url = `${FIREBASE_URL}/startGameTimestamp/${myGameName()}/${WA.player.uuid}.json`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

// Get end game timestamp of the user from firebase
export const getEndGameTimestamp = async (): Promise<unknown> => {
    const url = `${FIREBASE_URL}/endGameTimestamp/${myGameName()}/${WA.player.uuid}.json`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

// Get all End game timestamp of the users from firebase
export const getAllEndGameTimestamp = async (): Promise<any> => {
    const url = `${FIREBASE_URL}/endGameTimestamp.json?orderBy="timestamp"`;
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }catch(e){
        console.log('getAllEndGameTimestamp => error', e);
    }
};

// Get all Start game timestamp of the users from firebase
export const getAllStartGameTimestamp = async (): Promise<any> => {
    const url = `${FIREBASE_URL}/startGameTimestamp.json?orderBy="timestamp"`;
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }catch(e){
        console.log('getAllStartGameTimestamp => error', e);
    }
};

// Save playing choice in firebase
export const saveChoiceInFirebase = async (choice: "online"|"onlive"): Promise<void> => {
    const url = `${FIREBASE_URL}/${myGameName()}/playing.json`;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({choice})
    });
};

// Get playing choice from firebase
export const getChoiceInFirebase = async (): Promise<{choice: "online"|"onlive"}|undefined> => {
    const url = `${FIREBASE_URL}/${myGameName()}/playing.json`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
};

export{};
