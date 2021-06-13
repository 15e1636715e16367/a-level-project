import * as p5 from "p5";

//creating game object
class GameObject {
  pos: p5.Vector;
  width: number;
  height: number;
  collidable: boolean;
  constructor(pos: p5.Vector, width: number, height: number, collidable: boolean) {
    this.pos = pos;
    this.width = width;
    this.height = height;
    this.collidable = collidable;

  }
  collision(other: GameObject) {
    //where the collision code will go
  }
  
}



export default GameObject



