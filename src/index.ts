import * as p5 from "p5"

let sketch = function (p: p5) {
  let x = 400;
  let y = 400;

  p.setup = function () {
    p.createCanvas(700, 410);
  };

  p.draw = function () {
    p.background(220);
    p.fill(0);
    p.ellipse(x, y, 50, 50);


    if (p.keyIsDown(68)) {
      x += 5;
    }
    if (p.keyIsDown(65)) {
      x -= 5;
    }
    if (p.keyIsDown(87)) {
      y -= 5;
    }
    if (p.keyIsDown(83)) {
      y += 5;
    }
  }

}




let myp5 = new p5(sketch);
