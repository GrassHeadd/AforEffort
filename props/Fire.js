import {ctx} from "../testscript.js" 

export class Fire {
    constructor(x, y, squareSize = 30) {
      // anchor where fire will be based..
      this.anchor = { x: x, y: y };
      this.offset = 0;
      this.direction = "left";
      this.i = 0;
      this.squareSize = squareSize;

    }
    render() {
        const x = this.anchor.x + this.offset;
        const y = this.anchor.y;
        const flameHeight = this.squareSize / 2; // Height of the fire

        ctx.lineWidth = 2;
        ctx.strokeStyle = "orange";
        ctx.fillStyle = "red";

        // Draw the flame
        ctx.beginPath();

        let flameX = x; // Start point of the flame
        let flameY = y;

        ctx.moveTo(flameX, flameY); // Base of the flame inside the square

        // Create a zigzag flame effect with random left/right variations
        for (let i = 0; i < 8; i++) {
            flameX += Math.random() * 40 - 10; // Random horizontal variation
            flameY -= flameHeight / 5; // Move upward for each segment
            ctx.lineTo(flameX, flameY);
        }

        ctx.lineTo(this.anchor.x + this.squareSize, y + this.squareSize); // Close the flame shape
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
  }
  