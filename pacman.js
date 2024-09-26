const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Set canvas size to fill black space
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pacman = {
  x: 0,
  y: 0,
  direction: 'right'
};

const ghosts = [
  {x: 100, y: 100, color: 'red'},
  {x: 200, y: 200, color: 'pink'},
  // Add more ghosts as needed
];

let gameStarted = false;

function drawPacman() {
  // Draw Pac-Man on canvas
}

function drawGhosts() {
  // Draw ghosts on canvas
}

function updateGame() {
  // Update game state
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPacman();
  drawGhosts();
  updateGame();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
  if (!gameStarted && ['w', 'a', 's', 'd'].includes(event.key)) {
    gameStarted = true;
  }
  // Handle Pac-Man movement
});

gameLoop();