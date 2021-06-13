import * as p5 from "p5";
import GameObject from "./GameObject";

class Player extends GameObject {
  constructor(pos: p5.Vector, width: number, height: number, collidable: boolean) {
    super(pos, width, height, collidable)
  }
  draw(p: p5) {
    p.stroke(0);
    p.fill(150, 0, 70);
    p.rect(this.pos.x, this.pos.y, this.width, this.height);
  }
  
  update(p: p5) {
    if (p.keyIsDown(68)) {
      this.pos.x += 5;
    }
    if (p.keyIsDown(65)) {
      this.pos.x -= 5;
    }
  }
}

export default Player