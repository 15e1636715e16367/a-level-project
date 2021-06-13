import * as p5 from "p5";
import GameObject from "./GameObject";

class Box extends GameObject {
  constructor(pos: p5.Vector, width: number, height: number, collidable: boolean) {
    super(pos, width, height, collidable)
  }
  draw(p: p5) {
    p.stroke(0);
    p.strokeWeight(5);
    p.fill(255, 120, 0);
    p.rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

export default Box