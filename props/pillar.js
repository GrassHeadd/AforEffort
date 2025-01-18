import {ctx} from "../testscript.js"
import {GLOBALS} from "../testscript.js"
import { screenHeight, screenWidth } from "../constants/screen.js";

export class pillar {
    constructor(size, zValue, color) {
        this.spacing = 150; // Spacing between the pillars
        this.x = screenWidth; // X-coordinate of the top-left corner
        this.y = 0; // Y-coordinate of the top-left corner
        
        this.topPillarSize = zValue // Y-coordinate of the top pillar's bottom-right corner
        this.yBottom = zValue + this.spacing; // Y-coordinate of the bottom pillar's top-left corner
        this.size = size; // Width of the pillar (contant value = 20)
        this.color = color; // Fill color of the square
        this.offset = 0;
        this.hasCollided = false;
    }
  
    
    // Add a render method to draw the square
    render() {
        this.offset -= 2;
        let x = this.x + this.offset;
        
        ctx.beginPath();
        ctx.rect(x, this.y, this.size, this.topPillarSize); // top pillar
        ctx.rect(x, this.yBottom, this.size, screenHeight - this.yBottom);    // bottom pillar
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black"; // Border color
        ctx.stroke();

        // Collision detection
        if (GLOBALS.char.x + GLOBALS.char.width > x && GLOBALS.char.x < x + this.size) {
            if (GLOBALS.char.y + GLOBALS.char.height <= this.topPillarSize || GLOBALS.char.y > this.yBottom) {
                console.log("CRASH");
                if (this.hasCollided == false) {
                    this.hasCollided = true;
                    GLOBALS.lives -= 1;
                }
            } else {
                GLOBALS.currentScore += 1;
            }
        }
    }


}