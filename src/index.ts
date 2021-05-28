import { fill } from "lodash";
import * as p5 from "p5"



//starting stage
let stage = 0;

//canvas 
let canvasX = 1000;
let canvasY = 500;

//gameobject 
class GameObject {
  pos: p5.Vector;
  width: number;
  height: number;
  constructor(pos: p5.Vector, width: number, height: number) {
    this.pos = pos;
    this.width = width;
    this.height = height;

  }
}

//assigning gameobject to variables
let player: GameObject
let box: GameObject

//jump and gravity variables
let jump = false;
let direction = 1;
let velocity = 2;
let jumpPower = 12;
let fallingSpeed = 6;
let minHeight = 375;
let maxHeight = 50;
let jumpCounter = 0;

let collision1: number
let collisionHeight: number

//assigning variable to a vector
let MOVE_LEFT: p5.Vector;

let gametest = function (p: p5) {
  p.setup = function () {
    //creating canvas
    p.createCanvas(canvasX, canvasY);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER);

    //creating player and box as vectors with the class gameobject
    player = new GameObject(p.createVector(400, 375), 30, 70)
    box = new GameObject(p.createVector(200, 350), 200, 40)

    collision1 = box.pos.x + 160;
    collisionHeight = box.height;



    //assigning move_left to a vector
    MOVE_LEFT = p.createVector(-1, 0)


  }

  p.draw = function () {

    //side scrolling
    p.translate(-player.pos.x + p.width / 2, 0)

    //functions
    p.keyPressed();
    p.keyTyped();
    gravity();

    //setting game level
    if (stage == 0) {
      game();
    }

    //box movement
    box.pos.add(MOVE_LEFT)
    if (box.pos.x < 0) {
      box.pos.x = p.width
    }
  }


  function game() {
    //blue sky
    p.background(150, 230, 240);

    //grass
    p.noStroke();
    p.fill(100, 200, 75);
    p.rect(p.width / 2, 450, 4000, 100)

    //drawing box
    p.stroke(0);
    p.strokeWeight(5);
    p.fill(255, 120, 0);
    p.rect(box.pos.x, box.pos.y, box.width, box.height);

    //drawing player
    p.stroke(0);
    p.fill(150, 0, 70);
    p.rect(player.pos.x, player.pos.y, player.width, player.height);

    //collisions
    if (player.pos.x >= box.pos.x - box.width / 2
      && player.pos.x <= box.pos.x + box.width / 2
      && player.pos.y + box.height >= box.pos.y - box.height / 2
      && player.pos.y + box.height <= box.pos.y + box.height / 2
      && jump == false) {
      velocity = 0;
      jumpCounter = 0;
    }
    //collision improve

    if(player.pos.x >= collisionHeight + box.width/2
      && player.pos.x <= box.pos.x + box.width/2 
      && player.pos.y + box.height/2 >= box.pos.y - box.height / 2) {
        player.pos.x = player.pos.x + 5;
      }
  }

  //creating gravity function
  function gravity() {
    if (player.pos.y >= minHeight && jump == false) {
      jumpCounter = 0;
    } else {
      player.pos.y = player.pos.y + (direction * velocity);

    }
    if (jump == true) {
      if (player.pos.y <= maxHeight || jumpCounter >= jumpPower) {
        if (player.pos.y >= minHeight) {
          player.pos.y = minHeight;
        } else {
          velocity = fallingSpeed;
        }
      } else {
        velocity = -jumpPower;
        jumpCounter = jumpCounter + 1;
      }
    } else {
      velocity = fallingSpeed;
    }

    
  }

  //player move left and right
  p.keyPressed = function () {
    if (p.keyIsDown(68)) {
      player.pos.x += 5;

    }
    if (p.keyIsDown(65)) {
      player.pos.x -= 5;

    }

  }

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
