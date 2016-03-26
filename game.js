'use strict'

class Utils {
    static toSnakeCase(str) {
        return str.toLowerCase().split(' ').join('_');
    }
}

class Location {
    constructor(name, items) {
        this.name = name;
        this.image = './images/' + Utils.toSnakeCase(name) + '.png';
        this.items = items || [];
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
            { 'Captains room': null },
            { 'Maintanance station': ['repair kit'] },
            { 'Ship crew quarters': ['breath mask'] },
            { 'Main bridge': null },
            { 'Sick bay': null },
            { 'Cargo bay': null },
            { 'Drive shaft': null },
            { 'Rescue boats': null }

        ];

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

        // this.action = '';
        this.item = '';

        this.inventory = [];
        this.currentPosition = 0;

        this.blockedPathMessages = ['There is nothing there, only space'];

        // Quest stuff
        this.energyCellInstalled = false;
        this.boatRepaired = false;

        this.mapLocation = 4;
        // this.playersInput = '';
        this.gameMessage = '';

        // Do I need this?
        // this.itemLocations = [0, 1, 2, 3]; // 5, 6

        this.boardEl = document.getElementById('board');
        this.inputEl = document.getElementById('input');
        this.enterBtnEl = document.getElementById('enterBtn');
        this.imgEl = document.getElementById('ship-image');

        this.enterBtnEl.addEventListener('click', evt => this.playGame(evt), false);
        this.inputEl.addEventListener('keydown', function(e){ if (e.keyCode === 13){ this.playGame() }}, false);

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
            this.gameMessage = 'Unknown input';
        }

        // let itemIndex = this.items.indexOf(this.item);

        // if (itemIndex !== - 1 && this.itemLocations[itemIndex] === this.mapLocation) {
        //     this.gameMessage = 'You take the ' + this.item;
        //     this.inventory.push(item);
        //     items.splice(itemIndex, 1);
        //     itemLocations.splice(itemIndex, 1);
        // } else {
        //     gameMessage = 'Unknown input';
        // }
    }

    dropItem() {
        if (inventory.length !== 0) {
            var inventoryIndex = inventory.indexOf(item);

            if (inventoryIndex !== -1) {
                gameMessage = 'You drop the ' + item;
                items.push(inventory[inventoryIndex]);
                itemLocations.push(mapLocation);

                inventory.splice(inventoryIndex, 1);
            } else {
                gameMessage = 'You cant do that';
            }
        } else {
            gameMessage = 'You are not carrying anything';
        }
    }

    // TODO: get rid of magic numbers
    // add real items
    useItem() {
        var inventoryIndex = inventory.indexOf(item);

        if (inventoryIndex === -1) {
            gameMessage = 'You are not carrying it';
        }

        if (inventory.length === 0) {
            gameMessage += ' Your inventory is empty';
        }

        if (inventoryIndex !== -1) {
            switch(item) {
                case 'energy cell':
                    if (mapLocation === 8) {
                        energyCellInstalled = true;
                        gameMessage = 'You\'ve installed energy cell';
                        inventory.splice(inventoryIndex, 1);
                    } else {
                        gameMessage = 'It\'s no use in here';
                    }
                    break;
                case 'repair kit':
                    if (mapLocation === 8) {
                        boatRepaired = true;
                        gameMessage = 'You\'ve repaired the boat';
                        inventory.splice(inventoryIndex, 1);
                    } else {
                        gameMessage = 'It\'s no use in here';
                    }
                    break;
                default:
                    gameMessage = 'Unknown input';
            }
        }
    }

    gameComplete() {
        if ((mapLocation === 8) && energyCellInstalled && boatRepaired) {
            gameMessage = 'You successfully escaped in the resque boat';
        } else {
            gameMessage = 'You cant do that';
        }
    }

    // Move to Utils?
    showHelpMessage() {
        this.gameMessage = 'You can type in: ' + this.knownActions.join(', ');
    }

    render() {
        this.boardEl.innerHTML = this.map[this.mapLocation].name;
        this.imgEl.src = this.map[this.mapLocation].image;

        if (this.map[this.mapLocation].items) {
            this.boardEl.innerHTML += '<br>You see a <strong>' + this.map[this.mapLocation].items.join(', ') + '</strong> here.';
        }

        // TODO: fix "You see a 'null' here if I drop an item"
        // for (let i = 0; i < items.length; i++) {
        //     if (mapLocation === itemLocations[i]) {
        //         boardEl.innerHTML += '<br>You see a <strong>' + items[i] + '</strong> here.';
        //     }
        // }

        this.boardEl.innerHTML += '<br>' + this.gameMessage;

        if (this.inventory.length !== 0) {
            this.boardEl.innerHTML += '<br>You are carrying: ' + inventory.join(', ');
        }

        this.inputEl.value = '';
    }

    playGame() {
        let playersInput = this.inputEl.value.toLowerCase();

        let gameMessage = '';
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
                    gameMessage = blockedPathMessages[0];
                }
                break;
            case 'right':
                if (this.mapLocation % 3 !== 2) {
                    this.mapLocation += 1;
                } else {
                    gameMessage = blockedPathMessages[0];
                }
                break;
            case 'back':
                if (this.mapLocation < 6) {
                    this.mapLocation += 3;
                } else {
                    gameMessage = blockedPathMessages[0];
                }
                break;
            case 'left':
                if (this.mapLocation % 3 !== 0) {
                    this.mapLocation -= 1;
                } else {
                    gameMessage = blockedPathMessages[0];
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
                gameMessage = 'Unknown input';
        }

        this.render();
    }

}

new Game().render();
