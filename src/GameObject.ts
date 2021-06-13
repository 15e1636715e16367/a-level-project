import * as p5 from "p5";
import { Body, Bodies, Composite, Engine } from 'matter-js';

//creating game object
abstract class GameObject {
  colour: string;
  body: Body;
  collidable: boolean;
  constructor(engine: Engine,
    pos: p5.Vector,
    width: number,
    height: number,
    colour: string,
    collidable: boolean) {
    this.collidable = collidable;
    this.colour = colour;
    this.body = Bodies.rectangle(pos.x, pos.y, width, height);
    Composite.add(engine.world, this.body)
  }
  collision(other: GameObject) {
    //where the collision code will go
  }

  abstract update(p: p5): void;

  draw(p: p5) {
    p.stroke(0);
    p.strokeWeight(5);
    p.fill(this.colour);

    // Draw the body using the vertices from the physics engine
    p.beginShape();
    this.body.vertices.forEach(({ x, y }) => {
      p.vertex(x, y);
    });
    p.endShape();
  }
}



export default GameObject



