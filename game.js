'use strict'

class Utils {
    static toSnakeCase(str) {
        return str.toLowerCase().split(' ').join('_');
    }
}

class Location {
    constructor(name, image, items) {
        this.name = name;
        this.image = image;
        this.items = items;
    }
}

class Game {

    constructor() {
        this.map = [
            new Place('Fire control station'),
            new Place('Captains room'),
            new Place('Maintanance station'),
            new Place('Ship crew quarters'),
            new Place('Main bridge'),
            new Place('Sick bay'),
            new Place('Cargo bay'),
            new Place('Drive shaft'),
            new Place('Rescue boats')
        ];

        this.inventory = [];
        this.currentPosition = 0;
    }

}

// blockedPathMessages = [
//         'There is nothing there, only space'
//     ];

// var items = [
//     'energy cell',
//     null, // 'access key'
//     'repair kit',
//     'breath mask',
//     null,
//     null, // 'Vaccine',
//     null, // 'Explosion',
//     null,
//     null
//    // 'Energy Shield',
//    // 'Strength Gauntlet',
//    // 'Combat Suit',
//    // 'Light Exoskeleton',
//    // 'Blaster Pistol',
//    // 'Ion Blaster',
//    // 'Sonic Grenade',
//    // 'Energy Cell',
//    // 'Medpac',
//    // 'Life Support Pack',
//    // 'Antidote Kit',
//    // 'Adrenal Strength Stimulant',
//    // 'Repair Kit'
// ];

// var energyCellInstalled = false;
// var boatRepaired = false;

// // Get rid of the same array (require changing the for loop in the playGame function
// var knownItems = [
//     'energy cell',
//     null,
//     'repair kit',
//     'breath mask',
//     null,
//     null, // 'Vaccine',
//     null, // 'Explosion',
//     null,
//     null
//     ];

// var itemLocations = [0, 1, 2, 3]; // 5, 6

// var inventory = [];

// var mapLocation = 4;
// var playersInput = '';
// var gameMessage = '';

// var knownActions = [
//     'forward',
//     'right',
//     'back',
//     'left',
//     'take',
//     'use rescue boat',
//     'use',
//     'drop',
//     'help',
//     'inventory'
//     ];
// var action = '';

// var item = '';

// var boardEl = document.getElementById('board');
// var inputEl = document.getElementById('input');
// var enterBtnEl = document.getElementById('enterBtn');
// var imgEl = document.getElementById('ship-image');

// enterBtnEl.addEventListener('click', playGame, false);
// inputEl.addEventListener('keydown', function(e){ if (e.keyCode === 13){ playGame() }}, false);

// function showInventory() {
//     if (inventory.length) {
//         gameMessage = 'You have ' + inventory.join(', ') + ' in your inventory';
//     } else {
//         gameMessage = 'Nothing in there';
//     }
// }

// function takeItem() {
//     var itemIndex = items.indexOf(item);

//     if (itemIndex !== - 1 && itemLocations[itemIndex] === mapLocation) {
//         gameMessage = 'You take the ' + item;
//         inventory.push(item);
//         items.splice(itemIndex, 1);
//         itemLocations.splice(itemIndex, 1);
//     } else {
//         gameMessage = 'Unknown input';
//     }
// }

// function dropItem() {
//     if (inventory.length !== 0) {
//         var inventoryIndex = inventory.indexOf(item);

//         if (inventoryIndex !== -1) {
//             gameMessage = 'You drop the ' + item;
//             items.push(inventory[inventoryIndex]);
//             itemLocations.push(mapLocation);

//             inventory.splice(inventoryIndex, 1);
//         } else {
//             gameMessage = 'You cant do that';
//         }
//     } else {
//         gameMessage = 'You are not carrying anything';
//     }
// }

// // TODO: get rid of magic numbers
// // add real items
// function useItem() {
//     var inventoryIndex = inventory.indexOf(item);

//     if (inventoryIndex === -1) {
//         gameMessage = 'You are not carrying it';
//     }

//     if (inventory.length === 0) {
//         gameMessage += ' Your inventory is empty';
//     }

//     if (inventoryIndex !== -1) {
//         switch(item) {
//             case 'energy cell':
//                 if (mapLocation === 8) {
//                     energyCellInstalled = true;
//                     gameMessage = 'You\'ve installed energy cell';
//                     inventory.splice(inventoryIndex, 1);
//                 } else {
//                     gameMessage = 'It\'s no use in here';
//                 }
//                 break;
//             case 'repair kit':
//                 if (mapLocation === 8) {
//                     boatRepaired = true;
//                     gameMessage = 'You\'ve repaired the boat';
//                     inventory.splice(inventoryIndex, 1);
//                 } else {
//                     gameMessage = 'It\'s no use in here';
//                 }
//                 break;
//             default:
//                 gameMessage = 'Unknown input';
//         }
//     }
// }

// function gameComplete() {
//     if ((mapLocation === 8) && energyCellInstalled && boatRepaired) {
//         gameMessage = 'You successfully escaped in the resque boat';
//     } else {
//         gameMessage = 'You cant do that';
//     }
// }

// function showHelpMessage() {
//     gameMessage = 'You can type in: ' + knownActions.join(', ');
// }

// render();

// function playGame() {
//     playersInput = inputEl.value.toLowerCase();

//     gameMessage = '';
//     action = '';

//     for (let i = 0; i < knownActions.length; i++) {
//         if (playersInput.indexOf(knownActions[i]) !== -1) {
//             action = knownActions[i];
//             if (playersInput === knownActions[i]) {
//                 action = knownActions[i];
//             }
//             console.log('players action: ' + action);
//             break;
//         }
//     }

//     for (let i = 0; i < knownItems.length; i++) {
//       if (playersInput.indexOf(knownItems[i]) !== -1) {
//         item = knownItems[i];
//       }
//     }

//     switch (action) {
//         case 'forward':
//             if (mapLocation >= 3) {
//                 mapLocation -= 3;
//             } else {
//                 gameMessage = blockedPathMessages[0];
//             }
//             break;
//         case 'right':
//             if (mapLocation % 3 !== 2) {
//                 mapLocation += 1;
//             } else {
//                 gameMessage = blockedPathMessages[0];
//             }
//             break;
//         case 'back':
//             if (mapLocation < 6) {
//                 mapLocation += 3;
//             } else {
//                 gameMessage = blockedPathMessages[0];
//             }
//             break;
//         case 'left':
//             if (mapLocation % 3 !== 0) {
//                 mapLocation -= 1;
//             } else {
//                 gameMessage = blockedPathMessages[0];
//             }
//             break;
//         case 'take':
//             takeItem();
//             break;
//         case 'drop':
//             dropItem();
//             break;
//         case 'use rescue boat':
//             gameComplete();
//             break;
//         case 'use':
//             useItem();
//             break;
//         case 'help':
//             showHelpMessage();
//             break;
//         case 'inventory':
//             showInventory();
//             break;
//         default:
//             gameMessage = 'Unknown input';
//     }

//     render();

// }

// function render() {
//     boardEl.innerHTML = map[mapLocation];
//     imgEl.src = './images/' + images[mapLocation];

//     // TODO: fix "You see a 'null' here if I drop an item"
//     for (let i = 0; i < items.length; i++) {
//         if (mapLocation === itemLocations[i]) {
//             boardEl.innerHTML += '<br>You see a <strong>' + items[i] + '</strong> here.';
//         }
//     }

//     boardEl.innerHTML += '<br>' + gameMessage;

//     if (inventory.length !== 0) {
//         boardEl.innerHTML += '<br>You are carrying: ' + inventory.join(', ');
//     }

//     inputEl.value = '';
// }
