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

var mapLocation = 4;
var playersInput = '';
var gameMessage = '';
var knownActions = ['north', 'east', 'south', 'west'];
var action = '';

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
        if(playersInput.indexOf(knownActions[i]) !== -1) {
            action = knownActions[i];
            console.log('players action: ' + action);
            break;
        }
    }

    switch(action) {
        case 'north':
            mapLocation -= 3;
            break;
        case 'east':
            mapLocation += 1;
            break;
        case 'south':
            mapLocation += 3;
            break;
        case 'west':
            mapLocation -= 1;
            break;
        default:
            gameMessage = 'Unknown input';
    }

    render();

}

function render() {
    boardEl.innerHTML = map[mapLocation];
    boardEl.innerHTML += '<br>' + gameMessage;
}