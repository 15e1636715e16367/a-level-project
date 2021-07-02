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
    player = new Player(engine, p.createVector(400, 375), 30, 70);
    box = new Box(engine, p.createVector(200, 350), 200, 40);

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
    p.translate(-player.body.position.x + (p.width / 2), 0)

    //functions

    p.keyTyped();

    //setting game level
    if (stage == 0) {
      game();
    }

    //box1 movement
    
    
    //Body.applyForce( box.body, {x: box.body.position.x, y: box.body.position.y}, {x: 0.005, y: 0});
    
  }


  function game() {
    //blue sky
    p.background(150, 230, 240);

    // grass
    // p.noStroke();
    p.stroke(1);
    p.fill(100, 200, 75);
    p.beginShape();
    ground.vertices.forEach(({ x, y }) => p.vertex(x, y));
    p.endShape(p.CLOSE);

    // Update the game objects
    box.update(p);
    player.update(p)

    // Draw the game objects
    box.draw(p)
    player.draw(p)
  }

  //player jump
  p.keyTyped = function () {

    // Space bar is jump
    if (p.keyCode === 32) {
      player.jump();
    }
  }
}

//running game
new p5(gametest)
