import * as p5 from "p5";
import GameObject from "./GameObject";
import { Bodies, Engine } from 'matter-js';

class Spike extends GameObject {

    damaged: boolean

    constructor(
        engine: Engine,
        pos: p5.Vector,
        width: number,
        height: number) {
        super(engine, Bodies.rectangle(pos.x, pos.y, width, height, { inertia: Infinity, friction: 0.0, isStatic: true }))

        this.damaged = false;
    }
    update(p: p5) {
        let playerHealth = 3

        if(playerHealth > 0 && this.damaged === true) {
            playerHealth - 1
        }

        if (playerHealth === 0 ) {
            console.log('game over')
        }




    }

    draw(p: p5) {
        p.stroke(0);
        p.strokeWeight(5);
        p.fill(255, 0, 0);

        this.drawBody(p);
    }
}

export default Spike