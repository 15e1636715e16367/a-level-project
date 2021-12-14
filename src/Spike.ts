import * as p5 from "p5";
import GameObject from "./GameObject";
import { Bodies, Engine } from 'matter-js';

//spike class
class Spike extends GameObject {

    //create damaged value
    damaged: boolean

    constructor(
        engine: Engine,
        pos: p5.Vector,
        width: number,
        height: number) {
        super(engine, Bodies.rectangle(pos.x, pos.y, width, height, { inertia: Infinity, friction: 0.0, isStatic: true }))

        //set damaged to false when spikes are creted
        this.damaged = false;
    }
    update(p: p5) {
        //code for if player takes damage
        let playerHealth = 3
        if(playerHealth > 0 && this.damaged === true) {
            playerHealth - 1
        }
    }

    //draw the spikes
    draw(p: p5) {
        p.stroke(0);
        p.strokeWeight(5);
        p.fill(255, 0, 0);

        this.drawBody(p);
    }
}

export default Spike