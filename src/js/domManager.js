import { getForgettablesFromStorage, removeForgettableFromStorage, addForgettableToStorage } from './storageManager.js';

const queryAddButton = document.querySelector('#query-add');
const queryInput = document.querySelector("#query");
const forgettables = document.querySelector('#forgettables');

function createForgettable(text) {
    let div = document.createElement('div');
    div.innerHTML = `<div class="forgettable">
    <span>${text}</span>
    <button class="button forgettable-remove"><span>-</span></button>
</div>`;
    let forgettable = div.firstChild;
    let button = forgettable.querySelector('button');
    button.addEventListener('click', () => {
        removeForgettable(forgettable);
    });
    return forgettable;
}

function removeForgettable(forgettable) {
    let text = forgettable.querySelector('span').innerText.toLowerCase();
    removeForgettableFromStorage(text);
    forgettables.removeChild(forgettable);
}

function handleQueryInput() {
    let query = queryInput.value.toLowerCase();
    if (!query) return;
    getForgettablesFromStorage().then(res => {
        console.log(res);
        if (res.includes(query)) {
            queryInput.classList.add('error-shake');
            queryInput.addEventListener('animationend', () => {
                queryInput.classList.remove('error-shake');
            });
        }
        else {
            addForgettableToStorage(query);
            let forgettable = createForgettable(query);
            forgettables.prepend(forgettable);
            queryInput.value = "";
        }
    });
}

export function addQueryListener() {
    $(queryInput).keypress(event => {
        if (event.which != 13) return;
        handleQueryInput();
    });
    queryAddButton.addEventListener('click', handleQueryInput);
}

export function addForgettablesFromStorage() {
    getForgettablesFromStorage().then(res => {
        res.reverse().forEach(text => {
            let forgettable = createForgettable(text);
            forgettables.appendChild(forgettable);
        });
    });
}