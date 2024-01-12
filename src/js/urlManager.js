import { getForgettablesFromStorage } from "./storageManager.js";
import { removeUrlFromHistory } from "./historyManager.js";

function addUrlUpdateListener() {
    browser.history.onVisited.addListener(res => {
        checkForgettablesInUrl(res.url).then(forgettableInUrl => {
            if (forgettableInUrl) {
                console.log(`${res.url} in forgettables, deleting it`);
                removeUrlFromHistory(res.url);
            }
        });
    });
}

function checkForgettablesInUrl(url) {
    return getForgettablesFromStorage().then(res => {
        for (const forgettable of res) {
            if (url.toLowerCase().includes(forgettable)) {
                return true;
            }
        }
        return false;
    });
}

addUrlUpdateListener();