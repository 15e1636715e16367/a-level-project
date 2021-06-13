import * as p5 from "p5";
import { Engine } from 'matter-js';

import GameObject from "./GameObject";

class Player extends GameObject {
  constructor(
    engine: Engine,
    pos: p5.Vector,
    width: number,
    height: number,
    collidable: boolean) {
    super(engine, pos, width, height, 'green', collidable)
  }

  update(p: p5) {
    if (p.keyIsDown(68)) {
      this.body.position.x += 5;
    }
    if (p.keyIsDown(65)) {
      this.body.position.x -= 5;
    }
  }
}

export default Player