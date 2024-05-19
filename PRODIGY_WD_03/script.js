const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

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

function handleClick(index) {
    if (!gameActive || boardState[index] !== '') return;
    boardState[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    message.innerText = '';
}
