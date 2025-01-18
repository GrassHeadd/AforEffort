import {ctx} from "../testscript.js" 

export class Spikes {
  constructor(x, y) {
    // anchor where spikes will be based..
    this.anchor = { x: x, y: y };
    // variable offset from anchor to shake spikes...
    this.offset = 0;
    this.direction = "left";
    this.i = 0;
    // set an interval for a loop animation...
    this.animation = setInterval(() => {
      if (this.i === 10) {
        this.direction = this.direction === "right" ? "left" : "right";
        this.i = 0;
      } else {
        if (this.direction === "left") {
          this.offset -= 3;
          this.i++;
        } else {
          this.offset += 3;
          this.i++;
        }
      }
    }, 20);
  }
  render() {
    ctx.strokeStyle = "black";
    let x = this.anchor.x + this.offset,
      y = this.anchor.y;

    // simply create a zig zag
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 20, y + 20);
    ctx.lineTo(x + 30, y);
    ctx.lineTo(x + 40, y + 20);
    ctx.lineTo(x + 50, y);
    ctx.lineTo(x + 60, y + 20);
    ctx.lineTo(x + 70, y);
    ctx.lineTo(x + 80, y + 20);
    ctx.lineTo(x + 90, y);
    ctx.lineTo(x + 100, y + 20);
    ctx.stroke();
  }
}
  