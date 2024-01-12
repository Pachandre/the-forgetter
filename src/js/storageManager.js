export function addForgettableToStorage(text) {
    return getForgettablesFromStorage().then(forgettables => {
        if (!forgettables.includes(text)) {
            forgettables.push(text);
        }
        browser.storage.local.set({'forgettables': forgettables});
    });
}

export function getForgettablesFromStorage() {
    return browser.storage.local.get('forgettables').then(res => {
        let forgettables;
        if (!('forgettables' in res)) {
            forgettables = [];
        } else {
            forgettables = res['forgettables'];
        };
        return forgettables;
    });
}

export function setForgettablesToStorage(forgettables) {
    return browser.storage.local.set({'forgettables': forgettables});
}

export function removeForgettableFromStorage(text) {
    return getForgettablesFromStorage().then(forgettables => {
        if (forgettables.includes(text)) {
            forgettables = removeItem(forgettables, text);
            setForgettablesToStorage(forgettables);
        };
    });
}

function removeItem(array, item) {
    let index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}