import {ctx} from "../testscript.js"

export class Bullet {
    constructor(x, y, size, speed) {
        this.x = x;      // X-coordinate
        this.y = y;      // Y-coordinate
        this.size = size; // Size of the bullet
        this.speed = speed; // Speed at which the bullet moves
    }

    // Render the bullet
    render() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size); 
        ctx.fillStyle = "black"; 
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    // Update the bullet's position
    update() {
        this.x += this.speed;
    }
}
