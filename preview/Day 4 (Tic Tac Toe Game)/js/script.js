const gameBoard = document.querySelectorAll('.playField button');
const messageField = document.querySelector('.messageField div');
const playField = document.querySelector('.playField');
const winnerWindow = document.querySelector('.winnerWindow');
let drawCount = 0;
const arrMoves = [
    [],
    [],
    []
];

let playerX; 
rollDice();

//  roll dice to decide who will start the game
function rollDice() {
    let num = Math.floor(Math.random() * 20);
    if (num % 2 === 0) {
        playerX = true;
        messageField.innerHTML = "Player&nbsp;<span class='spanXO'>X</span>&nbsp;starts";
    } else {
        playerX = false
        messageField.innerHTML = "Player&nbsp;<span class='spanXO'>O</span>&nbsp;starts";
    }
}

//  PLAYER NAMES 
function playerNames(eventObject) {
    eventObject.preventDefault();

    //selecting player name spans (to display player names) on game area
    const playerOne = document.querySelector('.playerOne');
    const playerTwo = document.querySelector('.playerTwo');
    //selecting input text to catch players names
    const namePlayerX = document.querySelector('#playerX');
    const namePlayerO = document.querySelector('#playerO');

    //displaying player names in game
    if (namePlayerX.value === '') {
        const playerDisplayX = document.querySelector('.playerDisplayOne');
        playerDisplayX.classList.add('playerDisplayHide');
        playerOne.innerText = 'Player X';
    } else
        playerOne.innerText = namePlayerX.value;

    if (namePlayerO.value === '') {
        const playerDisplayX = document.querySelector('.playerDisplayTwo');
        playerDisplayX.classList.add('playerDisplayHide');
        playerTwo.innerText = 'Player O';
    } else
        playerTwo.innerText = namePlayerO.value;

    //deactivating playerNames window
    const playerNames = document.querySelector('.playerNames');
    playerNames.classList.add('playerNamesHide');

    namePlayerX.value = ''; //clearing name input
    namePlayerO.value = '';

    //activating gameArea window
    const gameArea = document.querySelector('.gameArea');
    gameArea.classList.remove('gameAreaHide');
}

// GAME 
function game() {

    //checks if a spot is taken on the board, throws error if it is, else gets on with the game
    if (this.innerText) {
        if (playerX)
            messageField.innerHTML = "Spot taken. Player:&nbsp;<span class='spanXO'>X</span>";
        else
            messageField.innerHTML = "Spot taken. Player:&nbsp;<span class='spanXO'>O</span>";
    } else {
        //look for winner
        const checkForWinner = (move) => {
            let isWinner = checkWinner(move);
            if (isWinner) {
                for (let btn of gameBoard) {
                    btn.disabled = true;
                }
                displayWinning(move);
            } else if (drawCount === 9)
                displayDraw();
        }
        //player X moves
        if (playerX) {
            messageField.innerHTML = "Player:&nbsp;<span class='spanXO'>O</span>";
            this.innerText = 'X';
            playerX = false;
            fillArray(this.id, this.innerText);
            drawCount++;
            checkForWinner(this.innerText);
        }
        //player O move
        else {
            messageField.innerHTML = "Player:&nbsp;<span class='spanXO'>X</span>";
            this.innerText = 'O';
            playerX = true;
            fillArray(this.id, this.innerText);
            drawCount++;
            checkForWinner(this.innerText);
        }
    }
}

//PUSHING MOVES TO ARRAY 
function fillArray(id, move) {
    switch (id) {
        case 'one':
            arrMoves[0][0] = move;
            break;
        case 'two':
            arrMoves[0][1] = move;
            break;
        case 'three':
            arrMoves[0][2] = move;
            break;
        case 'four':
            arrMoves[1][0] = move;
            break;
        case 'five':
            arrMoves[1][1] = move;
            break;
        case 'six':
            arrMoves[1][2] = move;
            break;
        case 'seven':
            arrMoves[2][0] = move;
            break;
        case 'eight':
            arrMoves[2][1] = move;
            break;
        case 'nine':
            arrMoves[2][2] = move;
            break;
    }
}

// CHECKING FOR WINNER
//blink if winner
const blinkWinningField = function (direction, place) {

    const addBleepWinner = (divArray) => {
        for (let item of divArray) {
            item.classList.add('bleepWinner');
        }
    }

    if (direction === 'r') {
        switch (place) {
            case 0:
                const rowDivsOne = document.querySelectorAll('.firstRow');
                addBleepWinner(rowDivsOne);
                break;
            case 1:
                const rowDivsTwo = document.querySelectorAll('.secondRow');
                addBleepWinner(rowDivsTwo);
                break;
            case 2:
                const rowDivsThree = document.querySelectorAll('.thirdRow');
                addBleepWinner(rowDivsThree);
                break;
        }
    } else if (direction === 'c') {
        switch (place) {
            case 0:
                const colDivsOne = document.querySelectorAll('.firstColumn');
                addBleepWinner(colDivsOne);
                break;
            case 1:
                const colDivsTwo = document.querySelectorAll('.secondColumn');
                addBleepWinner(colDivsTwo);
                break;
            case 2:
                const colDivsThree = document.querySelectorAll('.thirdColumn');
                addBleepWinner(colDivsThree);
                break;
        }
    } else if (direction === 'ddown') {
        const dDownDivs = document.querySelectorAll('.diagonalDown');
        addBleepWinner(dDownDivs);
    } else { //dup
        const dUpDivs = document.querySelectorAll('.diagonalUp');
        addBleepWinner(dUpDivs);
    }
}

function checkWinner(move) {

    //check row winner
    for (let r = 0; r < 3; r++) {
        if (arrMoves[r][0] === move && arrMoves[r][1] === move && arrMoves[r][2] === move) {
            scoreTracker(move);
            blinkWinningField('r', r);
            return true;
        }
    }
    //check column winner
    for (let c = 0; c < 3; c++) {
        if (arrMoves[0][c] === move && arrMoves[1][c] === move && arrMoves[2][c] === move) {
            scoreTracker(move);
            blinkWinningField('c', c);
            return true;
        }
    }
    // check \ winner  
    if (arrMoves[0][0] === move && arrMoves[1][1] === move && arrMoves[2][2] === move) {
        scoreTracker(move);
        blinkWinningField('ddown', null);
        return true;
    }
    // check / winner  
    if (arrMoves[0][2] === move && arrMoves[1][1] === move && arrMoves[2][0] === move) {
        scoreTracker(move);
        blinkWinningField('dup', null);
        return true;
    }
    return false;
}

//  WINNER or DRAW DISPLAY 
//WINNER
function displayWinning(winner) {
    setTimeout(() => {
        const winnerWindow = document.querySelector('.winnerWindow');
        const winnerName = document.querySelector('.winnerName');
        const playerX = document.querySelector('.playerOne');
        const playerO = document.querySelector('.playerTwo');

        if (winner === 'X')
            winnerName.innerText = playerX.innerText;
        else
            winnerName.innerText = playerO.innerText;

        playField.classList.add('playFieldHide');
        messageField.innerText = '';
        winnerWindow.classList.add('winnerWindowShow');
    }, 1500);
}

//DRAW
function displayDraw() {
    const winner = document.querySelector('.winner');
    const winnerName = document.querySelector('.winnerName');

    playField.classList.add('playFieldHide');
    messageField.innerText = '';
    winnerWindow.classList.add('winnerWindowShow');
    winner.innerText = 'DRAW'
    winnerName.innerText = ' ';
}

// SCORE TRACKER 
function scoreTracker(move) {
    const playerX = document.querySelector('.resultPlayerOne');
    const playerO = document.querySelector('.resultPlayerTwo');

    if (move === 'X')
        playerX.innerText++;
    else
        playerO.innerText++;
}

// RESET 
//GAME BOARD RESET
function resetGameBoard() {

    rollDice();
    drawCount = 0;

    //clearing array for new moves
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            arrMoves[r][c] = '';
        }
    }
    //clear 9 divs of X and O 
    for (let btn of gameBoard) {
        btn.innerText = '';
        btn.classList.remove('bleepWinner');
        btn.disabled = false;
    }

    const winner = document.querySelector('.winner');
    winner.innerText = 'WINNER';

    playField.classList.remove('playFieldHide');
    winnerWindow.classList.remove('winnerWindowShow');
}

//SCORE TRACKER RESET
function resetScoreTracker() {
    const playerX = document.querySelector('.resultPlayerOne');
    const playerO = document.querySelector('.resultPlayerTwo');

    playerX.innerText = 0;
    playerO.innerText = 0;
}


//START THE GAME - PLAYER NAMES
const form = document.querySelector('form');
form.addEventListener('submit', playerNames);

//GAME BOARD
for (let btn of gameBoard) {
    btn.addEventListener('click', game);
}

//RESET GAME BUTTON
const resetGameButton = document.querySelector('.resetGame');
resetGameButton.addEventListener('click', () => {
    resetGameBoard();
    resetScoreTracker();
    //activating playerNames window
    const playerNames = document.querySelector('.playerNames');
    playerNames.classList.remove('playerNamesHide');
    //deactivating gameArea window
    const gameArea = document.querySelector('.gameArea');
    gameArea.classList.add('gameAreaHide');

    const playerDisplayX = document.querySelector('.playerDisplayOne');
    playerDisplayX.classList.remove('playerDisplayHide');
    const playerDisplayO = document.querySelector('.playerDisplayTwo');
    playerDisplayO.classList.remove('playerDisplayHide');
})

//PLAY AGAIN BUTTON
const playAgainButton = document.querySelector('.playAgain');
playAgainButton.addEventListener('click', resetGameBoard)