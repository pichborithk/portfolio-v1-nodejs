let gameInitialState = {
  snake: {
    body: [
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 3 },
      { row: 1, column: 4 },
    ],
    nextDirection: { row: 1, column: 5 },
  },
  difficulty: 500,
  axis: '',
  isRunning: false,
  boardSize: 13,
};

let snake = {};
snake.body = [...gameInitialState.snake.body];
snake.nextDirection = { ...gameInitialState.snake.nextDirection };
let apple = {};
let difficulty = gameInitialState.difficulty;
let axis = gameInitialState.axis;
let isRunning = gameInitialState.isRunning;
let currentPoints = 0;
let bestPoints = 0;
let averagePoints = 0;
let pointsHistory = [];
let applePoints = 50;

const main = document.querySelector('.game-body');
const board = document.querySelector('#game-board');
const startBtn = document.querySelector('#game-start');
const bannerGameOver = document.querySelector('.game-banner');
const difficultySelect = document.querySelector('#game-difficulty');
const averagePointsDisplay = document.querySelector('#game-avg');
const bestPointsDisplay = document.querySelector('#game-best');
const currentPointsDisplay = document.querySelector('#current-points');

for (let i = 1; i <= gameInitialState.boardSize; i++) {
  const row = document.createElement('tr');
  row.className = 'row';
  row.dataset.index = i;
  for (let j = 1; j <= gameInitialState.boardSize; j++) {
    const td = document.createElement('td');
    td.className = 'column';
    td.dataset.index = j;
    const div = document.createElement('div');
    td.appendChild(div);
    row.appendChild(td);
  }
  board.appendChild(row);
}

function renderSnake() {
  const lastSnake = board.querySelectorAll('.snake');
  lastSnake.forEach(part => (part.className = ''));
  snake.body.forEach((part, i) => {
    const snakePart = board.querySelector(
      `[data-index='${part.row}'] > [data-index='${part.column}'] > div`
    );
    snakePart.className = 'snake';
    if (i === snake.body.length - 1) {
      if (axis === 'vertical') {
        snakePart.classList.add('head-vertical');
      } else {
        snakePart.classList.add('head-horizontal');
      }
    }
  });
}

function renderApple() {
  const lastApple = board.querySelector('.apple');
  if (lastApple) lastApple.classList.remove('apple');
  makeNewApple();
  const appleSquare = board.querySelector(
    `[data-index='${apple.row}'] > [data-index='${apple.column}'] > div`
  );
  appleSquare.className = 'apple';
}

function eatApple() {
  let snakeHead = snake.body[snake.body.length - 1];
  if (!(snakeHead.column === apple.column && snakeHead.row === apple.row)) {
    snake.body.shift();
  } else {
    renderApple();
    currentPoints += applePoints;
    bestPoints = bestPoints > currentPoints ? bestPoints : currentPoints;
    averagePoints =
      pointsHistory.length < 1
        ? currentPoints
        : Math.floor(
            (currentPoints + pointsHistory.reduce((a, b) => a + b)) /
              (pointsHistory.length + 1)
          );
    renderPointsDisplay();
    applePoints = 50;
  }
}

function renderPointsDisplay() {
  averagePointsDisplay.innerText = averagePoints;
  bestPointsDisplay.innerText = bestPoints;
  currentPointsDisplay.innerText = currentPoints;
}

function makeNewApple() {
  apple.row = Math.floor(Math.random() * gameInitialState.boardSize + 1);
  apple.column = Math.floor(Math.random() * gameInitialState.boardSize + 1);
  const isAvailable = snake.body.some(part => {
    return part.row === apple.row && part.column === apple.column;
  });
  if (isAvailable) {
    console.log('no');
    makeNewApple();
  }
}

function buildInitialState() {
  renderSnake();
  renderApple();
  currentPoints = 0;
  console.log(pointsHistory);
}

function moveRight() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row;
  snake.nextDirection.column = snakeHead.column + 1;
  snake.body.push({ ...snake.nextDirection });
  if (applePoints > 10) applePoints--;
  eatApple();
  checkGameOver();
  if (!isRunning) return;
  axis = 'horizontal';
  renderSnake();
}

function moveLeft() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row;
  snake.nextDirection.column = snakeHead.column - 1;
  snake.body.push({ ...snake.nextDirection });
  if (applePoints > 10) applePoints--;
  eatApple();
  checkGameOver();
  if (!isRunning) return;
  axis = 'horizontal';
  renderSnake();
}

function moveDown() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row + 1;
  snake.nextDirection.column = snakeHead.column;
  snake.body.push({ ...snake.nextDirection });
  if (applePoints > 10) applePoints--;
  eatApple();
  checkGameOver();
  if (!isRunning) return;
  axis = 'vertical';
  renderSnake();
}

function moveUp() {
  let snakeHead = snake.body[snake.body.length - 1];
  snake.nextDirection.row = snakeHead.row - 1;
  snake.nextDirection.column = snakeHead.column;
  snake.body.push({ ...snake.nextDirection });
  if (applePoints > 10) applePoints--;
  eatApple();
  checkGameOver();
  if (!isRunning) return;
  axis = 'vertical';
  renderSnake();
}

function move(event) {
  switch (event.key) {
    case 'ArrowRight':
      if (axis === 'horizontal') return;
      moveRight();
      clearInterval(isRunning);
      isRunning = setInterval(moveRight, difficulty);
      break;
    case 'ArrowLeft':
      if (axis === 'horizontal') return;
      moveLeft();
      clearInterval(isRunning);
      isRunning = setInterval(moveLeft, difficulty);
      break;
    case 'ArrowUp':
      if (axis === 'vertical') return;
      moveUp();
      clearInterval(isRunning);
      isRunning = setInterval(moveUp, difficulty);
      break;
    case 'ArrowDown':
      if (axis === 'vertical') return;
      moveDown();
      clearInterval(isRunning);
      isRunning = setInterval(moveDown, difficulty);
      break;
  }
}

function checkGameOver() {
  let snakeHead = snake.body[snake.body.length - 1];
  let snakeTail = snake.body.slice(0, -1);
  if (
    snakeHead.row > gameInitialState.boardSize ||
    snakeHead.row <= 0 ||
    snakeHead.column > gameInitialState.boardSize ||
    snakeHead.column <= 0 ||
    snakeTail.some(
      part => part.column === snakeHead.column && part.row === snakeHead.row
    )
  ) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(isRunning);
  isRunning = false;
  axis = '';
  startBtn.disabled = false;
  difficultySelect.disabled = false;
  main.classList.add('game-over');
  bannerGameOver.querySelector('#snake-length').innerText = snake.body.length;
  bannerGameOver.querySelector('#game-point').innerText = currentPoints;
  bannerGameOver.classList.add('game-over');
  bannerGameOver.querySelector('button').addEventListener('click', restart);
}

function restart() {
  main.classList.remove('game-over');
  bannerGameOver.classList.remove('game-over');
  snake.body = [...gameInitialState.snake.body];
  snake.nextDirection = { ...gameInitialState.snake.nextDirection };
  pointsHistory.push(currentPoints);
  buildInitialState();
}

function handleDifficulty(event) {
  difficulty = Number(event.target.value);
  console.log(difficulty);
}

buildInitialState();

document.addEventListener('keydown', function (event) {
  if (!isRunning) {
    startBtn.disabled = true;
    difficultySelect.disabled = true;
  }
  move(event);
});
startBtn.addEventListener('click', function () {
  if (!isRunning) {
    startBtn.disabled = true;
    difficultySelect.disabled = true;
    moveRight();
    isRunning = setInterval(moveRight, difficulty);
  }
});
difficultySelect.addEventListener('change', handleDifficulty);
