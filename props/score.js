import {ctx} from "../testscript.js"

export class Score {
    constructor() {
        this.x = screenWidth/ 2;      // X-coordinate
        this.y = screenHeight/ 2;      // Y-coordinate
        this.size = 50; // Size of score
    }

    // Render the bullet
    render() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size); 
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + GLOBALS.currentScore, this.x, this.y);

    }
}
