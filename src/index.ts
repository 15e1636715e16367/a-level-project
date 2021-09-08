import * as p5 from "p5"
import { Engine, Body, Vector, Bodies, Composite, Events, IEventCollision } from 'matter-js';
import Player from "./Player";
import Box from './Box';
import End from "./End";
import * as Matter from "matter-js";
import { deflateRaw } from "zlib";

// Create the Physics Engine instance
const engine = Engine.create();

//starting stage
let stage = 0;

//canvas 
let canvasX = 1000;
let canvasY = 500;

//assigning gameobject to variables
let player: Player
let boxes: Box[] = []
let box: Box
let box1: Box
let ground: Box;
let levelEnd1: End

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
    boxes = [box = new Box(engine, p.createVector(200, 350), 200, 40), box1 = new Box(engine, p.createVector(550, 300), 200, 40), ground = new Box(engine, p.createVector(500, 450), 4000, 100) ]
    levelEnd1 = new End(engine, p.createVector(1500, 300), 40, 40 )

    player.canJump = false;



    Events.on(engine, 'collisionStart', (event: IEventCollision<Engine>) => {
      event.pairs
          .filter(pair => pair.bodyA.id == player.body.id || pair.bodyB.id == player.body.id)
          .forEach(pair => {
              let otherBody = pair.bodyA.id == player.body.id ? pair.bodyB : pair.bodyA;
              boxes.forEach(platform => {
                  if (platform.body.id === otherBody.id) {
                      player.canJump = true;
                  }
              })
          })
  })

      Events.on(engine, 'collisionEnd', (event: IEventCollision<Engine>) => {
        event.pairs
            .filter(pair => pair.bodyA.id == player.body.id || pair.bodyB.id == player.body.id)
            .forEach(pair => {
                let otherBody = pair.bodyA.id == player.body.id ? pair.bodyB : pair.bodyA;
                boxes.forEach(platform => {
                    if (platform.body.id === otherBody.id) {
                        player.canJump = false;
                    }
                })
            })
    })

    // Create the ground as a fixed physics body
    


    // Setup some collision detection
   
  

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
    } else {
      if (stage == 1) {
        game1();
      }
    }

    
    //box1 movement
    
    if (box.body.position.x > 700) {
      Body.applyForce( box.body, {x: box.body.position.x, y: box.body.position.y}, {x: 0.05, y: 0});
    }
    
  }


  function game() {
    //blue sky
    p.background(150, 230, 240);

    // grass
    // p.noStroke();
    p.stroke(1);
    p.fill(100, 200, 75);
    p.beginShape();
  
    p.endShape(p.CLOSE);

    // Update the game objects
    boxes.forEach(x => x.update(p))
    player.update(p)
    levelEnd1.update(p);

    // Draw the game objects
    boxes.forEach(x => x.draw(p))
      
    
    player.draw(p)
    levelEnd1.draw(p)

  }
  function game1() {
    p.background(255, 255, 0);

  }

  

  //player jump

  

  p.keyTyped = function () {

    // Space bar is jump
    //if (p.keyCode === 32) {
      //player.jump();
    //}
  //}
}
}



//running game

new p5(gametest)


