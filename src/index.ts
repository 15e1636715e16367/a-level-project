import * as p5 from "p5"


let stage = 0; 


let canvasX = 800;
let canvasY = 500;


let plPos : p5.Vector;
let pWidth = 30;
let pHeight = 70;

let blPos : p5.Vector;
let bWidth = 200;
let bHeight = 40;

let jump = false;
let direction = 1;
let velocity = 2;
let jumpPower = 15;
let fallingSpeed = 2;
let minHeight = 375;
let maxHeight = 50;
let jumpCounter = 0;

let MOVE_LEFT : p5.Vector;

let gametest = function (p : p5) {
  p.setup = function () {
    p.createCanvas(canvasX, canvasY);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER);

    plPos = p.createVector (400, 375)
    blPos = p.createVector (200,300)

    MOVE_LEFT = p.createVector(-1, 0)

  } 

  p.draw = function () {

    p.keyPressed();
    p.keyTyped();
    gravity();

    if(stage == 0) {
      game();
    }

    blPos.add(MOVE_LEFT)
    if (blPos.x < 0) {
      blPos.x = p.width
    } 
    

  } 


  function game() {
    p.background(150, 230, 240);

    p.noStroke();
    p.fill(100, 200, 75);
    p.rect(p.width/2, 450, p.width, 100)

    p.noFill();
    p.stroke(0);
    p.strokeWeight(15);
    p.rect(p.width/2, p.height/2, p.width, p.height);


    p.stroke(0);
    p.strokeWeight(5);
    p.fill(255, 120, 0);
    p.rect(blPos.x, blPos.y, bWidth, bHeight);


    p.stroke(0);
    p.fill(150, 0, 70);
    p.rect(plPos.x, plPos.y, pWidth, pHeight);

    if(plPos.x >= blPos.x - bWidth/2 && plPos.x <= blPos.x + bWidth/2 && plPos.y + bHeight >= blPos.y - bHeight/2 && plPos.y + bHeight <= blPos.y + bHeight/2 && jump == false ) {
      // plPos.y = plPos.y;
      velocity = 0;
      jumpCounter = 0;



    }

    
  }

  function gravity() {
    if (plPos.y >= minHeight && jump == false) {
      // plPos.y = plPos.y;
      jumpCounter = 0;
    } else {
    plPos.y = plPos.y + (direction*velocity);

    }

    if (jump == true) {
      if (plPos.y <= maxHeight || jumpCounter >= jumpPower) {
        if (plPos.y >= minHeight) {
          plPos.y = minHeight;
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


  p.keyPressed = function() {
    if (p.keyIsDown(68)) {
      plPos.x += 5;
      
    }
    if (p.keyIsDown(65)) {
      plPos.x = plPos.x - 5;
      
    }
    if (p.keyIsDown(87)) {
      plPos.y -= 5;
    }
    if (p.keyIsDown(83)) {
      plPos.y += 5;
    }


  }



  p.keyTyped = function() {
    if (p.keyIsDown(32)) {
      jump = true;
    } else {
      jump = false;
    }
  }


}







let myp5 = new p5(gametest)
