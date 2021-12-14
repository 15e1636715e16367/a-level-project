import * as p5 from "p5";
import { Bodies, Body, Engine, Vector } from 'matter-js';
import GameObject from "./GameObject";

//player class
class Player extends GameObject {
  //jump and high jump values specified
  canJump: boolean;
  highJumpEnabled: boolean;
  
  constructor(
    engine: Engine,
    pos: p5.Vector,
    width: number,
    height: number) {

    // The inertia prevents rotation
    super(engine, Bodies.rectangle(pos.x, pos.y, width, height, { inertia: Infinity, friction: 0.0 }))

    //sets the player to be able to jump and high jump to false when player is created
    this.canJump = false;
    this.highJumpEnabled = false;
  }

  update(p: p5) {
    // Handle the controls
    let jumpTime = 0;
    let jumpTimer = 200;
    
    //normal jump code
    if (p.keyIsDown(87) && this.canJump == true) {
      Body.setVelocity(this.body, {x: this.body.velocity.x, y: -8});
  }

  //high jump code
    if (p.keyIsDown(73) && this.canJump == true && this.highJumpEnabled == true) {
      Body.setVelocity(this.body, {x: this.body.velocity.x, y: -12});
    }

    //move left and right code
    if (p.keyIsDown(68)) {
      this.body.position.x += 0.3;
    }
    if (p.keyIsDown(65)) {
      this.body.position.x -= 0.3;
    }
  }

  //draw the player
  draw(p: p5) {
    p.stroke(0);
    p.strokeWeight(5);
    p.fill(150, 0, 70);

    this.drawBody(p);
  }
}

export default Player