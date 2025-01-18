import { ctx } from "../testscript.js";
import { GLOBALS } from "../testscript.js";
import { generateRandomNumberBetween } from "../utilities/number.js";

export class enemyBird {
  constructor(y) {
    this.x = 800; // X-coordinate of the top-left corner
    this.y = y; // Y-coordinate of the top-left corner
    this.size = 50; // Size of the square
    this.offset = 0;
    this.speed = generateRandomNumberBetween(1, 4);
    this.isDead = false;

    this.image = new Image();
    this.image.src = "../assets/enemyBirdImage.png";
  }

  render() {
    if(!this.isDead) {
      this.x -= this.speed;
      let x = this.x + this.offset;
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  
      ctx.beginPath();
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black"; // Border color
      ctx.stroke();
  
      if (GLOBALS.char.x + GLOBALS.char.width > x && GLOBALS.char.x < x + this.size) {
        if (GLOBALS.char.y + GLOBALS.char.height > this.y && GLOBALS.char.y < this.y + this.size) {
          console.log("CRASH");
          if (this.hasCollided == false) {
            this.hasCollided = true;
            GLOBALS.lives -= 1;
          }
        }
      }
    }

  }
  
  die() {
    this.x = -this.size;
    this.y = -this.size;
    this.isDead = true;
  }

}
