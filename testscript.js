import {Player} from "./player/Player.js"
import { enemyBird } from "./props/enemyBird.js";
import {pillar} from "./props/pillar.js"
import { screenHeight, screenWidth } from "./constants/screen.js";
import { generateRandomNumberBetween } from "./utilities/number.js";

// Desired frame rate
const FPS = 60;
const frameInterval = 1000 / FPS; // Time per frame in milliseconds
let lastFrameTime = 0; // Timestamp of the last rendered frame

// get canvas 2D context object
const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 450;

// object for storing globally accessable states
export const GLOBALS = {
  char: { x: 0, y: 0, width: 50, height: 50 }, 
  failed: false,
  lives: 3,
  currentScore: 0,
}


// Array where all props will be stored
const PROPS = [];


// Array where all characters will be stored
const CHARS = [];
CHARS.push(new Player(50, canvas.height - 20, 20, "red"));


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
  });


}

// function for rendering background elements
function renderBackground() {
  ctx.fillStyle = "lightblue";//
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  ctx.font = "20px Arial";
  ctx.fillText("Lives: " + GLOBALS.lives, 10, 30);

  //draw score
  // ctx.fillText("Score: " + GLOBALS.currentScore, 10, 30);

}

// main function to be run for rendering frames
let time = 0;
function startFrames(currentTime) {
  // Calculate the time elapsed since the last frame
  const deltaTime = currentTime - lastFrameTime;

  // If enough time has passed, render the next frame
  if (deltaTime >= frameInterval) {
    lastFrameTime = currentTime;

    // // Check for failure
    // if (GLOBALS.failed) {
    //   while (PROPS.length) {
    //     PROPS.pop();
    //   }
    //   GLOBALS.failed = false;
    
    // Erase the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render each type of entity in order, relative to layers
    renderBackground();
    renderProps();
    renderCharacters();
    renderControls();

    time++;
    if (time % 100 === 0) {
      addPillarObject();
    }
    if (time % 80 === 0) {
      addEnemyBird();
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
                console.log("Bullet hit enemy bird!");
                prop.die(); 
                char.bullets.splice(bulletIndex, 1); 
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

}

  // Request the next animation frame
  window.requestAnimationFrame(startFrames);

}


init(); // initialize game settings
window.requestAnimationFrame(startFrames); 

function addPillarObject() {
  const zValue = generateRandomNumberBetween(30, screenHeight - 200);
  console.log(zValue)
  PROPS.push(new pillar(20, zValue, "red"))
}

function addEnemyBird() {
  const y = Math.random() * 180;
  console.log(y)
  PROPS.push(new enemyBird(y))
}