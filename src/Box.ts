import * as p5 from "p5";
import GameObject from "./GameObject";
import { Body, Engine } from 'matter-js';

class Box extends GameObject {
  constructor(
    engine: Engine,
    pos: p5.Vector,
    width: number,
    height: number,
    collidable: boolean) {
    super(engine, pos, width, height, 'blue', collidable)
  }
  update(p: p5) {
  }
}

export default Box