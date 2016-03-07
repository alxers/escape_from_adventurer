'use strict'

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

var items = [
    'energy cell',
    'access key',
    'repair kit',
    'breath mask',
    null,
    null, // 'Vaccine',
    null, // 'Explosion',
    null,
    null
   // 'Energy Shield',
   // 'Strength Gauntlet',
   // 'Combat Suit',
   // 'Light Exoskeleton',
   // 'Blaster Pistol',
   // 'Ion Blaster',
   // 'Sonic Grenade',
   // 'Energy Cell',
   // 'Medpac',
   // 'Life Support Pack',
   // 'Antidote Kit',
   // 'Adrenal Strength Stimulant',
   // 'Repair Kit'
];

// Get rid of the same array (require changing the for loop in the playGame function
var knownItems = [
    'energy cell',
    'access key',
    'repair kit',
    'breath mask',
    null,
    null, // 'Vaccine',
    null, // 'Explosion',
    null,
    null
    ];

var itemLocations = [0, 1, 2, 3]; // 5, 6

var backpack = [];

var mapLocation = 4;
var playersInput = '';
var gameMessage = '';

var knownActions = [
    'north',
    'east',
    'south',
    'west',
    'take',
    'use rescue boat',
    'use',
    'drop',
    'help',
    'inventory',
    'backpack'
    ];
var action = '';

// var knownItems = [];
var item = '';

var boardEl = document.getElementById('board');
var inputEl = document.getElementById('input');
var enterBtnEl = document.getElementById('enterBtn')

enterBtnEl.addEventListener('click', playGame, false);

function showInventory() {
    if (backpack.length) {
        gameMessage = 'You have ' + backpack.join(', ') + ' in your inventory';
    } else {
        gameMessage = 'Nothing in there';
    }
}

function takeItem() {
    var itemIndex = items.indexOf(item);

    if (itemIndex !== - 1 && itemLocations[itemIndex] === mapLocation) {
        gameMessage = 'You take the ' + item;
        backpack.push(item);
        items.splice(itemIndex, 1);
        itemLocations.splice(itemIndex, 1);
    } else {
        gameMessage = 'Unknown input';
    }
}

function dropItem() {
    if (backpack.length !== 0) {
        var backpackIndex = backpack.indexOf(item);

        if (backpackIndex !== -1) {
            gameMessage = 'You drop the ' + item;
            items.push(backpack[backpackIndex]);
            itemLocations.push(mapLocation);

            backpack.splice(backpackIndex, 1);
        } else {
            gameMessage = 'You cant do that';
        }
    } else {
        gameMessage = 'You are not carrying anything';
    }
}

// TODO: get rid of magic numbers
// add real items
function useItem() {
    var backpackIndex = backpack.indexOf(item);

    if (backpackIndex === -1) {
        gameMessage = 'You are not carrying it';
    }

    if (backpack.length === 0) {
        gameMessage += ' Your backpack is empty';
    }

    if (backpackIndex !== -1) {
        switch(item) {
            case 'item1':
                gameMessage = '';
                break;
            // Item can be on the 'right' location, otherwise it's useless
            case 'item2':
                if (mapLocation === 3) {
                    gameMessage = '';
                }
        }
    }
}

function gameComplete() {
    if (mapLocation === 8) {
        gameMessage = 'You successfully escaped in the resque boat';
    } else {
        gameMessage = 'You cant do that';
    }
}

function showHelpMessage() {
    gameMessage = 'You can type in: ' + knownActions.join(', ');
}

render();

function playGame() {
    playersInput = inputEl.value.toLowerCase();

    gameMessage = '';
    action = '';

    for (let i = 0; i < knownActions.length; i++) {
        if (playersInput.indexOf(knownActions[i]) !== -1) {
            action = knownActions[i];
            if (playersInput === knownActions[i]) {
                action = knownActions[i];
            }
            console.log('players action: ' + action);
            break;
        }
    }

    for (let i = 0; i < knownItems.length; i++) {
      if (playersInput.indexOf(knownItems[i]) !== -1) {
        item = knownItems[i];
      }
    }

    switch (action) {
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
        case 'take':
            takeItem();
            break;
        case 'drop':
            dropItem();
            break;
        case 'use rescue boat':
            gameComplete();
            break;
        case 'use':
            useItem();
            break;
        case 'help':
            showHelpMessage();
            break;
        case 'inventory':
            showInventory();
            break;
        case 'backpack':
            showInventory();
            break;
        default:
            gameMessage = 'Unknown input';
    }

    render();

}

function render() {
    boardEl.innerHTML = map[mapLocation];

    for (let i = 0; i < items.length; i++) {
        if (mapLocation === itemLocations[i]) {
            boardEl.innerHTML += '<br>You see a <strong>' + items[i] + '</strong> here.';
        }
    }

    boardEl.innerHTML += '<br>' + gameMessage;

    if (backpack.length !== 0) {
        boardEl.innerHTML += '<br>You are carrying: ' + backpack.join(', ');
    }
}
