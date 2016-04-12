'use strict'

// TODO: draw map
class Utils {
    static toSnakeCase(str) {
        return str.toLowerCase().split(' ').join('_');
    }
}

class Location {
    constructor(name, items) {
        this.name = name;
        this.image = './images/' + Utils.toSnakeCase(name) + '.png';
        this.items = items;
    }
}

class Game {

    constructor() {

        // Other possible items
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
        this.locationItems = [
            { 'Fire control station': ['energy cell'] },
            { 'Captains room': [] },
            { 'Maintanance station': ['repair kit'] },
            { 'Ship crew quarters': ['breath mask'] },
            { 'Main bridge': [] },
            { 'Sick bay': [] },
            { 'Cargo bay': [] },
            { 'Drive shaft': [] },
            { 'Rescue boats': [] }

        ];

        // Create a map with locations
        this.map = this.locationItems.map(function(locItem) {
            let loc = Object.keys(locItem)[0];
            return new Location(loc, locItem[loc])
        });

        this.knownActions = [
            'forward',
            'right',
            'back',
            'left',
            'take',
            'use rescue boat',
            'use',
            'drop',
            'help',
            'inventory'
        ];

        this.item = '';
        this.inventory = [];
        this.blockedPathMessages = ['There is nothing there, only space'];

        // Quest stuff
        this.energyCellInstalled = false;
        this.boatRepaired = false;

        this.mapLocation = 4;
        this.gameMessage = '';

        this.boardEl = document.getElementById('board');
        this.inputEl = document.getElementById('input');
        this.enterBtnEl = document.getElementById('enterBtn');
        this.imgEl = document.getElementById('ship-image');
        this.mapEl = document.getElementById('map-wrapper');

        // Arrow function to pass correct 'this'
        this.enterBtnEl.addEventListener('click', e => this.playGame(), false);
        this.inputEl.addEventListener('keydown', e => { if (e.keyCode === 13){ this.playGame() }}, false);

    }

    showInventory() {
        if (this.inventory.length) {
            this.gameMessage = 'You have ' + this.inventory.join(', ') + ' in your inventory';
        } else {
            this.gameMessage = 'Nothing in there';
        }
    }

    takeItem() {
        let itemIndex = this.map[this.mapLocation].items.indexOf(this.item);

        if (itemIndex !== -1) {
            this.gameMessage = 'You take the ' + this.item;
            this.inventory.push(this.item);
            this.map[this.mapLocation].items.splice(itemIndex, 1);
        } else {
            this.gameMessage = 'You can\'t do that';
        }
    }

    dropItem() {
        if (this.inventory.length !== 0) {
            let inventoryIndex = this.inventory.indexOf(this.item);

            if (inventoryIndex !== -1) {
                this.gameMessage = 'You drop the ' + this.item;
                this.map[this.mapLocation].items.push(this.inventory[inventoryIndex]);
                this.inventory.splice(inventoryIndex, 1);
            } else {
                this.gameMessage = 'You cant do that';
            }
        } else {
            this.gameMessage = 'You are not carrying anything';
        }
    }

    // TODO: get rid of magic numbers
    useItem() {
        let inventoryIndex = this.inventory.indexOf(this.item);

        if (inventoryIndex === -1) {
            this.gameMessage = 'You are not carrying it';
        }

        if (this.inventory.length === 0) {
            this.gameMessage += ' Your inventory is empty';
        }

        if (inventoryIndex !== -1) {
            switch(this.item) {
                case 'energy cell':
                    if (this.mapLocation === 8) {
                        this.energyCellInstalled = true;
                        this.gameMessage = 'You\'ve installed energy cell';
                        this.inventory.splice(inventoryIndex, 1);
                    } else {
                        this.gameMessage = 'It\'s no use in here';
                    }
                    break;
                case 'repair kit':
                    if (this.mapLocation === 8) {
                        this.boatRepaired = true;
                        this.gameMessage = 'You\'ve repaired the boat';
                        this.inventory.splice(inventoryIndex, 1);
                    } else {
                        this.gameMessage = 'It\'s no use in here';
                    }
                    break;
                default:
                    this.gameMessage = 'Unknown input';
            }
        }
    }

    gameComplete() {
        if ((this.mapLocation === 8) && this.energyCellInstalled && this.boatRepaired) {
            this.gameMessage = 'You successfully escaped in the rescue boat';
        } else {
            this.gameMessage = 'You can\'t do that';
        }
    }

    // Move to Utils?
    showHelpMessage() {
        this.gameMessage = 'You can type in: ' + this.knownActions.join(', ');
    }

    drawMap() {
        // clear node
        while (this.mapEl.firstChild) {
            this.mapEl.removeChild(this.mapEl.firstChild);
        }
        this.map.map((location) => {
            let mapCell = document.createElement('div');
            var t = location.name;
            if (location.name === this.map[this.mapLocation].name) {
                t = (`${location.name} (You are here)`);
            }
            let text = document.createTextNode(t)
            mapCell.appendChild(text);
            mapCell.setAttribute('class', 'map-cell');
            this.mapEl.appendChild(mapCell);
        });
    }

    render() {
        this.boardEl.innerHTML = this.map[this.mapLocation].name;
        this.imgEl.src = this.map[this.mapLocation].image;

        if (this.map[this.mapLocation].items.length) {
            this.boardEl.innerHTML += '<br>You see a <strong>' + this.map[this.mapLocation].items.join(', ') + '</strong> here.';
        }

        this.boardEl.innerHTML += '<br>' + this.gameMessage;

        if (this.inventory.length !== 0) {
            this.boardEl.innerHTML += '<br>You are carrying: ' + this.inventory.join(', ');
        }

        this.inputEl.value = '';
        this.drawMap();
    }

    playGame() {
        let playersInput = this.inputEl.value.toLowerCase();

        this.gameMessage = '';

        // Action is not global for now (if we ever need it)
        let action = '';

        for (let i = 0; i < this.knownActions.length; i++) {
            if (playersInput.indexOf(this.knownActions[i]) !== -1) {
                action = this.knownActions[i];
                if (playersInput === this.knownActions[i]) {
                    action = this.knownActions[i];
                }
                console.log('players action: ' + this.action);
                break;
            }
        }

        let knownItems = this.inventory.concat(this.map[this.mapLocation].items);

        for (let i = 0; i < knownItems.length; i++) {
          if (playersInput.indexOf(knownItems[i]) !== -1) {
            this.item = knownItems[i];
          }
        }

        switch (action) {
            case 'forward':
                if (this.mapLocation >= 3) {
                    this.mapLocation -= 3;
                } else {
                    this.gameMessage = this.blockedPathMessages[0];
                }
                break;
            case 'right':
                if (this.mapLocation % 3 !== 2) {
                    this.mapLocation += 1;
                } else {
                    this.gameMessage = this.blockedPathMessages[0];
                }
                break;
            case 'back':
                if (this.mapLocation < 6) {
                    this.mapLocation += 3;
                } else {
                    this.gameMessage = this.blockedPathMessages[0];
                }
                break;
            case 'left':
                if (this.mapLocation % 3 !== 0) {
                    this.mapLocation -= 1;
                } else {
                    this.gameMessage = this.blockedPathMessages[0];
                }
                break;
            case 'take':
                this.takeItem();
                break;
            case 'drop':
                this.dropItem();
                break;
            case 'use rescue boat':
                this.gameComplete();
                break;
            case 'use':
                this.useItem();
                break;
            case 'help':
                this.showHelpMessage();
                break;
            case 'inventory':
                this.showInventory();
                break;
            default:
                this.gameMessage = 'Unknown input';
        }

        this.render();
    }

}

new Game().render();
