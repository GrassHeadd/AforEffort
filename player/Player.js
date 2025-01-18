import {ctx} from "../testscript.js"
import { GLOBALS } from "../testscript.js";
import { Bullet } from "../props/Bullet.js";


export class Player {

    constructor(x, y, size, color) {
        this.x = x; // X-coordinate of the top-left corner
        this.y = y // Y-coordinate of the top-left corner
        this.size = size;
        this.offset = 200;
        this.speed = 0;
        this.gravity = 0.5;
        this.bullets = [];
        GLOBALS.char.width = this.size;
        GLOBALS.char.height = this.size;
        GLOBALS.char.x = this.x;

        this.image = new Image();
        this.image.src = "../assets/quacker.png";
    }

    // Add a render method to draw the square
    render() {
        this.offset += this.speed;
        this.speed -= 0.5;


        if (this.offset < 0) {
            this.offset = 0;
        }

        let y = this.y - this.offset;

        GLOBALS.char.y = y;
        ctx.drawImage(this.image, this.x, y, this.size, this.size);
        ctx.beginPath();
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black"; // Border color
        ctx.stroke();

        this.bullets.forEach(bullet => {
            bullet.update();
            bullet.render();
        });
    }
    //jumping event
    jump() {
        this.speed = 7;
    }

    // bullets
    fire() {
        const bulletSize = 5;
        const bulletSpeed = 5;

        const bullet = new Bullet(this.x + this.size, GLOBALS.char.y + this.size / 2 - bulletSize/2, bulletSize, bulletSpeed);
        this.bullets.push(bullet);
    }

    //lose life
    loseLife() {
        GLOBALS.lives -= 1;
        if (GLOBALS.lives <= 0) {
            prop.die();
        }
    }

}
