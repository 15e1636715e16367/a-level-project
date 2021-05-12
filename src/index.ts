import * as p5 from "p5"


let stage = 0; 



let plX = 400;
let plY = 375;
let pWidth = 30;
let pHeight = 70;


let blX = 200; 
let blY = 300;
let bWidth = 200;
let bHeight = 40;




let gametest = function (p : p5) {
  p.setup = function () {
    p.createCanvas(800, 500);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER);


  } 




  

  p.draw = function () {

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


  }



}







let myp5 = new p5(gametest)
