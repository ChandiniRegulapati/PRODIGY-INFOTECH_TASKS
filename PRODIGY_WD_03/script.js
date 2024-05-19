// script.js
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const playWithPlayerButton = document.getElementById('play-with-player');
const playWithComputerButton = document.getElementById('play-with-computer');

let currentPlayer = 'X';
let gameActive = false;
let boardState = ['', '', '', '', '', '', '', '', ''];
let mode = ''; // Variable to track the game mode

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check for a winner
function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            message.innerText = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }
    if (boardState.every(cell => cell !== '')) {
        message.innerText = "It's a draw!";
        gameActive = false;
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    message.innerText = `Player ${currentPlayer}'s turn`;
    removeActiveClass();
}

// Function to handle player's move
function handlePlayerMove(index) {
    if (!gameActive || boardState[index] !== '') return;

    // Human player's move
    boardState[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    checkWinner();

    // Check if the game is still active
    if (!gameActive) return;

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `Player ${currentPlayer}'s turn`;

    if (mode === 'computer' && currentPlayer === 'O') {
        // If playing with computer and it's the computer's turn, trigger computer's move
        setTimeout(computerMove, 500);
    }
}

// Function to make a move for the computer player
function computerMove() {
    // Find empty cells
    const emptyCells = [];
    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === '') {
            emptyCells.push(i);
        }
    }

    // Choose a random empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerIndex = emptyCells[randomIndex];

    // Set the computer's move
    boardState[computerIndex] = currentPlayer;
    cells[computerIndex].innerText = currentPlayer;
    checkWinner();

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `Player ${currentPlayer}'s turn`;
}

// Function to remove the active class from buttons
function removeActiveClass() {
    playWithPlayerButton.classList.remove('active');
    playWithComputerButton.classList.remove('active');
}

// Function to handle button click and set the active class
function handleButtonClick(button) {
    removeActiveClass();
    button.classList.add('active');
}

// Add event listeners to the buttons
resetButton.addEventListener('click', resetGame);
playWithPlayerButton.addEventListener('click', () => {
    handleButtonClick(playWithPlayerButton);
    mode = 'player';
    resetGame();
});
playWithComputerButton.addEventListener('click', () => {
    handleButtonClick(playWithComputerButton);
    mode = 'computer';
    resetGame();
});

// Add event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handlePlayerMove(index));
});
