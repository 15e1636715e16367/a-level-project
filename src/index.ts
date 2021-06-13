import * as p5 from "p5"
import { Engine, Body, Vector, Bodies, Composite } from 'matter-js';
import Player from "./Player";
import Box from './Box';

// Create the Physics Engine instance
const engine = Engine.create();

//starting stage
let stage = 0;

//canvas 
let canvasX = 1000;
let canvasY = 500;

//gameobject 

//assigning gameobject to variables
let player: Player
let box: Box
let ground: Body;

//jump and gravity variables
let jump = false;
let direction = 1;
let velocity = 2;
let jumpPower = 12;
let fallingSpeed = 6;
let minHeight = 375;
let maxHeight = 50;
let jumpCounter = 0;

//assigning variable to a vector
let MOVE_LEFT: Vector;
let MOVE_RIGHT: Vector
let MOVE_NEUTRAL: Vector

let gametest = function (p: p5) {
  p.setup = function () {
    //creating canvas
    p.createCanvas(canvasX, canvasY);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER);

    //creating player and box as vectors with the class gameobject
    player = new Player(engine, p.createVector(400, 375), 30, 70, true);
    box = new Box(engine, p.createVector(200, 350), 200, 40, true);

    // Create the ground as a fixed physics body
    ground = Bodies.rectangle(p.width / 2, 450, 4000, 100, { isStatic: true });
    Composite.add(engine.world, ground);

    //assigning move_left to a vector
    MOVE_LEFT = Vector.create(-0.1, 0)
    MOVE_RIGHT = Vector.create(0.1, 0)
    MOVE_NEUTRAL = Vector.create(0, 0)


  }

  p.draw = function () {
    // Tell the physics engine to iterate
    Engine.update(engine, p.deltaTime);

    //side scrolling
    p.translate(-player.body.position.x + p.width / 2, 0)

    //functions

    p.keyTyped();

    //setting game level
    if (stage == 0) {
      game();
    }

    //box1 movement
    if (box.body.position.x > 300) {
      Body.applyForce(box.body, MOVE_NEUTRAL, MOVE_LEFT);
    }
    if (box.body.position.x < 0) {
      Body.applyForce(box.body, MOVE_NEUTRAL, MOVE_RIGHT);
    }
  }


  function game() {
    //blue sky
    p.background(150, 230, 240);

    //grass
    p.noStroke();
    p.fill(100, 200, 75);
    p.beginShape();
    ground.vertices.forEach(({ x, y }) => p.vertex(x, y));
    p.endShape();

    // Update the game objects
    box.update(p);
    player.update(p)

    // Draw the game objects
    box.draw(p)
    player.draw(p)
  }

  //creating gravity function
  // function gravity() {
  //   if (player.pos.y >= minHeight && jump == false) {
  //     jumpCounter = 0;
  //   } else {
  //     player.pos.y = player.pos.y + (direction * velocity);

  //   }
  //   if (jump == true) {
  //     if (player.pos.y <= maxHeight || jumpCounter >= jumpPower) {
  //       if (player.pos.y >= minHeight) {
  //         player.pos.y = minHeight;
  //       } else {
  //         velocity = fallingSpeed;
  //       }
  //     } else {
  //       velocity = -jumpPower;
  //       jumpCounter = jumpCounter + 1;
  //     }
  //   } else {
  //     velocity = fallingSpeed;
  //   }


  // }

  //player move left and right

  //player jump
  p.keyTyped = function () {
    if (p.keyIsDown(32)) {
      jump = true;
    } else {
      jump = false;
    }
  }

}

//running game
let myp5 = new p5(gametest)
