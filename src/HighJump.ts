import * as p5 from "p5";
import GameObject from "./GameObject";
import { Bodies, Engine } from 'matter-js';

//high jump powerup class
class HighJump extends GameObject {
  constructor(
    engine: Engine,
    pos: p5.Vector,
    width: number,
    height: number) {
    super(engine, Bodies.rectangle(pos.x, pos.y, width, height, { inertia: Infinity, friction: 0.0, isStatic: true }))
  }
  update(p: p5) {
  }

  //draw high jump powerup
  draw(p: p5) {
    p.stroke(0);
    p.strokeWeight(5);
    p.fill('green');
    this.drawBody(p);
  }
}

export default HighJump