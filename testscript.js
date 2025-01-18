import {Player} from "./player/Player.js"
import { enemyBird } from "./props/enemyBird.js";
import {pillar} from "./props/pillar.js"
import { screenHeight, screenWidth } from "./constants/screen.js";
import { generateRandomNumberBetween } from "./utilities/number.js";
import {Score} from "./props/score.js"
import { gameOverText } from "./constants/screen.js";

// Fetch and update score element
const scoreElement = document.getElementById('score');
let currentHighScore = localStorage.getItem("highScore");
scoreElement.textContent = currentHighScore == null ? 0 : currentHighScore;

// Desired frame rate
const FPS = 60;
const frameInterval = 1000 / FPS; // Time per frame in milliseconds
let lastFrameTime = 0; // Timestamp of the last rendered frame

// get canvas 2D context object
const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 450;

// Text width
const textWidth = ctx.measureText(gameOverText).width;

// object for storing globally accessable states
export const GLOBALS = {
  char: { x: 0, y: 0, width: 50, height: 50 }, 
  startScreen: true,
  isPlaying: false,
  lives: 3,
  currentScore: 0,
}

// Array where all props will be stored
const PROPS = [];

// Array where all characters will be stored
const CHARS = [];
CHARS.push(new Player(50, canvas.height - 40, 40, "red"));

// function for applying any initial settings
function init() {
  
  // add event listener for space bar to call jump for player objects only
  document.addEventListener("keydown", function(event) {
  if (event.code === "KeyE") {
    CHARS.forEach(char => {
      if (char instanceof Player) {
        char.jump();
      }
    });
  }
  if (event.code === "KeyF") {
    CHARS.forEach(char => {
      if (char instanceof Player) {
        char.fire();
      }
    })
  }
  
  if (event.code === "Enter") {
        if (GLOBALS.startScreen == false && GLOBALS.isPlaying == false) {
          while (PROPS.length) {
            PROPS.pop();
          }
          GLOBALS.lives = 3;
          GLOBALS.isPlaying = true;
        }
        GLOBALS.startScreen = false;
        GLOBALS.isPlaying = true;
    }
  });
}

// function for rendering background elements
function renderBackground() {
  const backgroundImage = new Image();
  backgroundImage.src = "./assets/background4.jpg";
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// function for rendering prop objects in PROPS
function renderProps() {
  for (let p in PROPS) PROPS[p].render();
}

// function for rendering character objects in CHARS
function renderCharacters() {
  for (let c in CHARS) CHARS[c].render();
}

function renderControls() {
  //draw lives
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.font = "20px Arial";
  ctx.fillText("Lives: " + GLOBALS.lives, 40, 30);

  //draw score
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.font = "30px Copperplate";
  ctx.fillText("" + GLOBALS.currentScore, screenWidth/2, 50);

}

function renderStartScreen() {
  renderBackground();

  ctx.beginPath();
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2);

  ctx.font = "20px Arial";
  ctx.fillText("Use 'E' to Jump and 'F' to Fire", canvas.width / 2, canvas.height / 2 + 40);
}

// main function to be run for rendering frames
let time = 0;
function startFrames(currentTime) {
  // Calculate the time elapsed since the last frame
  const deltaTime = currentTime - lastFrameTime;

  // If enough time has passed, render the next frame
  if (deltaTime >= frameInterval) {
    lastFrameTime = currentTime;

    // Render each type of entity in order, relative to layers
    if (GLOBALS.startScreen) {
      renderStartScreen();
    } else if (GLOBALS.isPlaying) {
      // Erase the entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      renderBackground();
      renderProps();
      renderCharacters();
      renderControls();
  
      time++;
      if (time % 100 === 0) {
        addPillarObject();
      }
      
      
      if (time % Math.max((80 - Math.floor(GLOBALS.currentScore / 2)), 5) === 0 && GLOBALS.currentScore >= 5) {
        addEnemyBird();
      }
    }

    // Check for collisions between bullets and enemy birds
    PROPS.forEach((prop, index) => {
      if (prop instanceof enemyBird) {
        CHARS.forEach(char => {
          if (char.bullets) {
            char.bullets.forEach((bullet, bulletIndex) => {
              if (
                bullet.x < prop.x + prop.size &&
                bullet.x + bullet.size > prop.x &&
                bullet.y < prop.y + prop.size &&
                bullet.y + bullet.size > prop.y
              ) {
                prop.die(); 
                char.bullets.splice(bulletIndex, 1); 
                GLOBALS.currentScore += 1;
              }
            });
          }
        });
      }
    });

    PROPS.forEach((prop, index) => {
      if (prop.isDead) {
        PROPS.splice(index, 1);
      }
    });

    if (GLOBALS.lives <= 0) {
      gameFailed();
    }
}
  // Request the next animation frame
  window.requestAnimationFrame(startFrames);
}

init(); // initialize game settings
window.requestAnimationFrame(startFrames); 

function addPillarObject() {
  const zValue = generateRandomNumberBetween(30, screenHeight - 200);
  PROPS.push(new pillar(20, zValue, "brown"))
}

function addEnemyBird() {
  const y = Math.random() * canvas.height;
  PROPS.push(new enemyBird(y))
}

function gameFailed() {
  GLOBALS.isPlaying = false;
  updateHighScore(GLOBALS.currentScore);
  GLOBALS.currentScore = 0;
  renderFailedScreen();
}

function renderFailedScreen() {
  ctx.beginPath();
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(gameOverText , (screenWidth / 2), (screenHeight / 2));
  ctx.beginPath();
  ctx.font = "18px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Press enter to restart", screenWidth / 2, screenHeight / 2 + 50);
}

function updateHighScore(score) {
  if (currentHighScore == null || score >= currentHighScore) {
    console.log(score);
    scoreElement.textContent = score;
    currentHighScore = score;
    localStorage.setItem("highScore", score);
  }
}