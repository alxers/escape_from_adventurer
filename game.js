var map = [
    'Fire control station',
    'Captains room',
    'Maintanance station',
    'Ship crew quarters',
    'Main bridge',
    'Sick bay',
    'Cargo bay',
    'Drive shaft',
    'Rescue boats'
];

var blockedPathMessages = [
    'There is nothing there, only space',
];

var items = [];
var itemLocations = [1, 6, 8];

var backpack = [];

var mapLocation = 4;
var playersInput = '';
var gameMessage = '';

var knownActions = ['north', 'east', 'south', 'west', 'take', 'use', 'drop'];
var action = '';

var knownItems = [];
var item = '';

var boardEl = document.getElementById('board');
var inputEl = document.getElementById('input');
var enterBtnEl = document.getElementById('enterBtn')

enterBtnEl.addEventListener('click', playGame, false);

render();

function playGame() {
    playersInput = inputEl.value.toLowerCase();

    gameMessage = '';
    action = '';

    for(i = 0; i < knownActions.length; i++) {
        if (playersInput.indexOf(knownActions[i]) !== -1) {
            action = knownActions[i];
            console.log('players action: ' + action);
            break;
        }
    }

    switch(action) {
        case 'north':
            if (mapLocation >= 3) {
                mapLocation -= 3;
            } else {
                gameMessage = blockedPathMessages[0];
            }
            break;
        case 'east':
            if (mapLocation % 3 !== 2) {
                mapLocation += 1;
            } else {
                gameMessage = blockedPathMessages[0];
            }
            break;
        case 'south':
            if (mapLocation < 6) {
                mapLocation += 3;
            } else {
                gameMessage = blockedPathMessages[0];
            }
            break;
        case 'west':
            if (mapLocation % 3 !== 0) {
                mapLocation -= 1;
            } else {
                gameMessage = blockedPathMessages[0];
            }
            break;
        default:
            gameMessage = 'Unknown input';
    }

    render();

}

function render() {
    boardEl.innerHTML = map[mapLocation];

    for (var i = 0; i < items.length; i++) {
        if (mapLocation === itemLocations[i]) {
            boardEl.innerHTML += '<br>You see a <strong>' + items[i] + '</strong> here.';
        }
    }

    boardEl.innerHTML += '<br>' + gameMessage;

    if (backpack.length !== 0) {
        boardEl.innerHTML += '<br>You are carrying: ' + backpack.join(', ');
    }
}