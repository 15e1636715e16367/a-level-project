import * as p5 from "p5";
import GameObject from "./GameObject";
import { Bodies, Engine } from 'matter-js';

class Box extends GameObject {
  constructor(
    engine: Engine,
    pos: p5.Vector,
    width: number,
    height: number) {
    super(engine, Bodies.rectangle(pos.x, pos.y, width, height, { inertia: Infinity, friction: 0.0, isStatic: false }))
  }
  update(p: p5) {
  }

  draw(p: p5) {
    p.stroke(0);
    p.strokeWeight(5);
    p.fill(255, 120, 0);

    this.drawBody(p);
  }
}

export default Box