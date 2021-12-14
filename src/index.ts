import * as p5 from "p5"
import { Engine, Body, Vector, Events, IEventCollision, World, Composite } from 'matter-js';
import Player from "./Player";
import Box from './Box';
import End from "./End";
import Spike from './Spike';
import HighJump from "./highJump";

// Create the Physics Engine instance
const engine = Engine.create();

//starting stage
let stage = 0;
let lastStage = 0;

//canvas 
let canvasX = 1000;
let canvasY = 500;

//assigning gameobject to variables
let player: Player
let boxes: Box[] = []
let ends: End[] = []
let spikes: Spike[] = []
let highJumps: HighJump[] = []
let stages: string[] = [];
let box: Box
let box1: Box
let box2: Box
let ground: Box;
let levelEnd1: End

//set player health to 3
let playerHealth = 3;

let gametest = function (p: p5) {

  //function that starts game
  function startGame() {
    stageChange();
    levelLoad();
    this.hide()
  }

  //checks if player is dead
  function isDead() {
    if (playerHealth === 0) {
      //if player is dead clear all the objects in the game
      boxes.forEach(b => Composite.remove(engine.world, b.body));
      ends.forEach(b => Composite.remove(engine.world, b.body));
      spikes.forEach(b => Composite.remove(engine.world, b.body));
      boxes = [];
      ends = [];
      spikes = [];
    }
  }

  //changes stage
  function stageChange() {
    stage = stage + 1;
    console.log('Changing To Stage', stage)
  }

  //loads level
  function levelLoad() {
    if (stage === 0) {

      //clears all objects
      boxes.forEach(b => Composite.remove(engine.world, b.body));
      ends.forEach(b => Composite.remove(engine.world, b.body));
      spikes.forEach(b => Composite.remove(engine.world, b.body));
      highJumps.forEach(b => Composite.remove(engine.world, b.body));

      //clears all lists
      boxes = [];
      ends = [];
      spikes = [];

      //pushing new objects for the level
      boxes.push(box = new Box(engine, p.createVector(550, 350), 200, 40, 'grey'), 
        box1 = new Box(engine, p.createVector(800, 300), 200, 40, 'grey'), 
        ground = new Box(engine, p.createVector(500, 450), 4000, 100, 'green'),
        new Box(engine, p.createVector(1100, 350), 200, 40, 'grey'),
        new Box(engine, p.createVector(1500, 350), 200, 40, 'grey')    
        )
      ends.push(levelEnd1 = new End(engine, p.createVector(1850, 300), 40, 40))
      spikes.push(new Spike(engine, p.createVector(1100, 389), 1300, 20))

      //set player position
      player = new Player(engine, p.createVector(400, 375), 30, 70);
    
    } else if (stage === 1) {

      //clears all objects
      boxes.forEach(b => Composite.remove(engine.world, b.body));
      ends.forEach(b => Composite.remove(engine.world, b.body));
      spikes.forEach(b => Composite.remove(engine.world, b.body));
      highJumps.forEach(b => Composite.remove(engine.world, b.body));

      //clears all lists
      boxes = [];
      ends = [];
      spikes = [];

      //pushes new objects for new level
      boxes.push(box = new Box(engine, p.createVector(550, 350), 200, 40, 'grey'), 
        box1 = new Box(engine, p.createVector(800, 300), 200, 40, 'grey'), 
        ground = new Box(engine, p.createVector(500, 450), 4000, 100, 'green'),
        new Box(engine, p.createVector(1100, 350), 200, 40, 'grey'),
        new Box(engine, p.createVector(1500, 350), 200, 40, 'grey')    
        )
      ends.push(levelEnd1 = new End(engine, p.createVector(1850, 300), 40, 40))
      spikes.push(new Spike(engine, p.createVector(1100, 389), 1300, 20))
      //resets player position
      player = new Player(engine, p.createVector(400, 375), 30, 70);
   
    } else if (stage === 2) {
      //clears all objects
      boxes.forEach(b => Composite.remove(engine.world, b.body));
      ends.forEach(b => Composite.remove(engine.world, b.body));
      spikes.forEach(b => Composite.remove(engine.world, b.body));
      highJumps.forEach(b => Composite.remove(engine.world, b.body));

      //clears all lists
      boxes = [];
      ends = [];
      spikes = [];

      //pushes new objects for level
      boxes.push(box2 = new Box(engine, p.createVector(800, 250), 200, 40, 'grey'), 
        ground = new Box(engine, p.createVector(500, 450), 4000, 100, 'green'));
      highJumps.push(new HighJump(engine, p.createVector(1500, 300), 40, 40))
      //resetting player position
      player = new Player(engine, p.createVector(400, 375), 30, 70)
    }
  }

  p.setup = function () {
    //creating canvas
    p.createCanvas(canvasX, canvasY);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER);

    //start game button
    let button
    button = p.createButton('Start Game')
    button.position(475,200)
    button.size(50, 50)
    //if start game button pressed start the game
    button.mousePressed(startGame)
    //remove button after pressed
    if (button.mousePressed) {
      button.remove
    }
  
    player = new Player(engine, p.createVector(400, 1000), 30, 70);

    stages.push('stage 2')

    player.canJump = false;
    spikes.forEach(x => x.damaged = false)

    //collision code for if player can jump
    Events.on(engine, 'collisionActive', (event: IEventCollision<Engine>) => {
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

    //collision code for if player can jump
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

    //collision code for if player touches level end
    Events.on(engine, 'collisionStart', (event: IEventCollision<Engine>) => {
      event.pairs
        .filter(pair => pair.bodyA.id == player.body.id || pair.bodyB.id == player.body.id)
        .forEach(pair => {
          let otherBody = pair.bodyA.id == player.body.id ? pair.bodyB : pair.bodyA;
          ends.forEach(platform => {
            if (platform.body.id === otherBody.id) {
              //change the level and load the level
              stageChange();
              levelLoad();
            }
          })
        })
    })
    

    //collision code for if player touches spike
    Events.on(engine, 'collisionStart', (event: IEventCollision<Engine>) => {
      event.pairs
        .filter(pair => pair.bodyA.id == player.body.id || pair.bodyB.id == player.body.id)
        .forEach(pair => {
          let otherBody = pair.bodyA.id == player.body.id ? pair.bodyB : pair.bodyA;
          spikes.forEach(platform => {
            if (platform.body.id === otherBody.id) {
              //removes a health point and checks if player is dead
              playerHealth = playerHealth - 1
              isDead();
              player.canJump = true;
            }
          })
        })
    })

    //collision code that makes sure the player can't double jump if on spikes
    Events.on(engine, 'collisionEnd', (event: IEventCollision<Engine>) => {
      event.pairs
        .filter(pair => pair.bodyA.id == player.body.id || pair.bodyB.id == player.body.id)
        .forEach(pair => {
          let otherBody = pair.bodyA.id == player.body.id ? pair.bodyB : pair.bodyA;
          spikes.forEach(platform => {
            if (platform.body.id === otherBody.id) {
              player.canJump = false;
            }
          })
        })
    })

    //collison code for if player touches the high jump pickup
    Events.on(engine, 'collisionStart', (event: IEventCollision<Engine>) => {
      event.pairs
        .filter(pair => pair.bodyA.id == player.body.id || pair.bodyB.id == player.body.id)
        .forEach(pair => {
          let otherBody = pair.bodyA.id == player.body.id ? pair.bodyB : pair.bodyA;
          highJumps.forEach(platform => {
            if (platform.body.id === otherBody.id) {
              //allows player to high jump
              player.highJumpEnabled = true;
              //delete the high jump powerup so players can't collect it twice
              highJumps = [];
              highJumps.forEach(b => Composite.remove(engine.world, b.body));
            }
          })
        })
    })
  }

  p.draw = function () {
    // Tell the physics engine to iterate
    Engine.update(engine, p.deltaTime);

    //blue sky
    p.background(150, 230, 240);

    //lives ui
    if (stage > 0) {
      let livesLeft = "Lives: " + playerHealth;
      p.fill('black')
      p.strokeWeight(1);
      p.textSize(30)
      p.text(livesLeft, 55, 30);
    }
    

    //GameOver screen + restart level
    if (playerHealth === 0) {
      let gameOverText = "GAMEOVER";
      p.fill('black')
      p.strokeWeight(1);
      p.textSize(60)
      p.text(gameOverText, 500, 250);

      let restart = "Press K to restart";
      p.fill('black')
      p.strokeWeight(1);
      p.textSize(60)
      p.text(restart, 500, 350);

      
    }

    //side scrolling
    p.translate(-player.body.position.x + (p.width / 2), 0)

    //functions
    game();

    if (p.keyIsDown(75)) {
      playerHealth =3
      levelLoad(); 
    }
  }


  function game() {
    // grass
    // p.noStroke();
    p.stroke(1);
    p.fill(100, 200, 75);
    p.beginShape();

    p.endShape(p.CLOSE);

    // Update the game objects
    boxes.forEach(x => x.update(p))
    ends.forEach(x => x.update(p))
    spikes.forEach(x => x.update(p))
    highJumps.forEach(x => x.update(p))
    player.update(p)


    // Draw the game objects
    boxes.forEach(x => x.draw(p))
    ends.forEach(x => x.draw(p))
    spikes.forEach(x => x.draw(p))
    highJumps.forEach(x => x.draw(p))
    player.draw(p)
  }
}

//running game
new p5(gametest)


