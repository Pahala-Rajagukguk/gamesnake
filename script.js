// Element Selection
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const modeSelect = document.getElementById("modeSelect");
const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

// Game Variables
let snake = [{ x: 200, y: 200 }];
let direction = { x: 20, y: 0 };
let food = {
  x: Math.floor(Math.random() * 20) * 20,
  y: Math.floor(Math.random() * 20) * 20,
};
let gameInterval;
let isGameRunning = false;

// Toggle Mode
modeSelect.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", modeSelect.value === "dark");
});

// Start Game
startBtn.addEventListener("click", () => {
  if (!isGameRunning) {
    gameInterval = setInterval(updateGame, 100);
    isGameRunning = true;
    pauseBtn.disabled = false;
    startBtn.disabled = true; // Disable the start button when game starts
  }
});

// Pause Game
pauseBtn.addEventListener("click", () => {
  if (isGameRunning) {
    clearInterval(gameInterval);
    isGameRunning = false;
    pauseBtn.disabled = true;
    startBtn.disabled = false; // Enable the start button when paused
  }
});

// Handle Keypresses
document.addEventListener("keydown", (e) => {
  if (e.key === "w" && direction.y === 0) direction = { x: 0, y: -20 };
  if (e.key === "s" && direction.y === 0) direction = { x: 0, y: 20 };
  if (e.key === "a" && direction.x === 0) direction = { x: -20, y: 0 };
  if (e.key === "d" && direction.x === 0) direction = { x: 20, y: 0 };
});

// Update Game State
function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check for wall collision
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    resetGame();
    return;
  }

  // Check for self collision
  for (let part of snake) {
    if (head.x === part.x && head.y === part.y) {
      resetGame();
      return;
    }
  }

  snake.unshift(head);

  // Check for food collision
  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }

  drawGame();
}

// Place Food
function placeFood() {
  food.x = Math.floor(Math.random() * 20) * 20;
  food.y = Math.floor(Math.random() * 20) * 20;
}

// Draw Game Elements
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 20, 20);

  // Draw Snake
  ctx.fillStyle = "green";
  snake.forEach((part) => ctx.fillRect(part.x, part.y, 20, 20));
}

// Reset Game
function resetGame() {
  clearInterval(gameInterval);
  isGameRunning = false;
  snake = [{ x: 200, y: 200 }];
  direction = { x: 20, y: 0 };
  placeFood();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  drawGame();
}

// Initial Draw
drawGame();
