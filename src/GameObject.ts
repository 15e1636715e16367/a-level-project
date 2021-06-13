import * as p5 from "p5";
import { Body, Composite, Engine } from 'matter-js';

//creating game object
abstract class GameObject {
  body: Body;
  collidable: boolean;

  constructor(engine: Engine, body: Body) {
    this.body = body;
    Composite.add(engine.world, this.body)
  }

  abstract update(p: p5): void;
  abstract draw(p: p5): void;

  // Once the child class has setup the drawing, this function will 
  // use p5 shapes/vertices to render the body
  drawBody(p: p5) {
    // Draw the body using the vertices from the physics engine
    p.beginShape();
    this.body.vertices.forEach(({ x, y }) => {
      p.vertex(x, y);
    });
    p.endShape(p.CLOSE);
  }
}

export default GameObject



