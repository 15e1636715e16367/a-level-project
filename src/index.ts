import * as p5 from "p5"


let stage = 0; 


let canvasX = 800;
let canvasY = 500;



let plX = 400;
let plY = 375;
let pWidth = 30;
let pHeight = 70;


let blX = 200; 
let blY = 300;
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





let gametest = function (p : p5) {
  p.setup = function () {
    p.createCanvas(canvasX, canvasY);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER);


    







  } 




  

  p.draw = function () {

    p.keyPressed();
    p.keyTyped();
    gravity();

    if(stage == 0) {
      game();
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
    p.rect(blX, blY, bWidth, bHeight);


    p.stroke(0);
    p.fill(150, 0, 70);
    p.rect(plX, plY, pWidth, pHeight);

    if(plX >= blX - bWidth/2 && plX <= blX + bWidth/2 && plY + bHeight >= blY - bHeight/2 && plY + bHeight <= blY + bHeight/2 && jump == false ) {
      plY = plY;
      velocity = 0;
      jumpCounter = 0;



    }

    

    
  }

  function gravity() {
    if (plY >= minHeight && jump == false) {
      plY = plY;
      jumpCounter = 0;
    } else {
    plY = plY + (direction*velocity);

    }

    if (jump == true) {
      if (plY <= maxHeight || jumpCounter >= jumpPower) {
        if (plY >= minHeight) {
          plY = minHeight;
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
      plX += 5;
      
    }
    if (p.keyIsDown(65)) {
      plX = plX - 5;
      
    }
    if (p.keyIsDown(87)) {
      plY -= 5;
    }
    if (p.keyIsDown(83)) {
      plY += 5;
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
