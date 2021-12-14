import * as p5 from "p5";
import GameObject from "./GameObject";
import { Bodies, Engine } from 'matter-js';

//box class
class Box extends GameObject {
  colour: string
  
  constructor(
    engine: Engine,
    pos: p5.Vector,
    width: number,
    height: number,
    colour: string) {
    super(engine, Bodies.rectangle(pos.x, pos.y, width, height, { inertia: Infinity, friction: 0.0, isStatic: true }))
    this.colour = colour;


  }
  update(p: p5) {
  }

  //draw the box
  draw(p: p5) {
    p.stroke(0);
    p.strokeWeight(5);
    //colour box the specified colour
    p.fill(this.colour);

    this.drawBody(p);
  }
}

export default Box