import * as p5 from "p5"

console.log('hi')

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


    if (p.keyIsPressed) {
      if (p.key == 'd') {
        x += 5;
      } else if (p.key == 'a') {
        x -= 5;
      } else if (p.key == 'w') {
        y -= 5;
      } else if (p.key == 's') {
        y += 5;
      }
    }




    if (x >= 400) {
      x = 0;
    }

  }



}
let myp5 = new p5(sketch);
