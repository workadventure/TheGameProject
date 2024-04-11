const FIREBASE_URL = "https://thegameproject-c216d-default-rtdb.europe-west1.firebasedatabase.app";

const getFirebaseUserRoleUrl = () => {
    return `${FIREBASE_URL}/userRole/${WA.room.id.split('/')[4]}/${WA.player.uuid}.json`;
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
    const url = `${FIREBASE_URL}/gems/${WA.room.id.split('/')[4]}/${gem}.json`;
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
    const url = `${FIREBASE_URL}/gems/${WA.room.id.split('/')[4]}/${gem}.json`;
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
    const url = `${FIREBASE_URL}/gameStep/${WA.room.id.split('/')[4]}/${WA.player.uuid}.json`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({step})
    });
    console.log('saveGameStep => res', res);
};

// Get game step of the user from firebase
export const getGameStep = async (): Promise<{step: "choice" | "museum" | "escape" | "treasureEnigma" | "bomb" | "maze" | "music"}|undefined> => {
    const url = `${FIREBASE_URL}/gameStep/${WA.room.id.split('/')[4]}/${WA.player.uuid}.json`;
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
    const url = `${FIREBASE_URL}/startGameTimestamp/${WA.room.id.split('/')[4]}/${WA.player.uuid}.json`;
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
    const url = `${FIREBASE_URL}/startGameTimestamp/${WA.room.id.split('/')[4]}/${WA.player.uuid}.json`;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({timestamp: Date.now()})
    });
};

export{};
