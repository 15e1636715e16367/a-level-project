import * as p5 from "p5"

console.log('hi')

let sketch = function (p: p5) {
  let x = 400;
  let y = 400;

  p.setup = function() {
    p.createCanvas(700, 410);
  };

  p.draw = function () {
    p.background(220);
    p.fill(0);
    p.ellipse(x, y, 50, 50);

    


    if (x >= 400) {
      x = 0;
    }

  }


  p.keyTyped = function() {
    if (p.key === 'w') {
      y = y - 10;
    } else if (p.key !== 'w') {
      y = y;
    }
    if (p.key === 's') {
      y = y + 10;
    } else if (p.key !== 's') {
      y = y
    }
    if (p.key === 'a') {
      x = x - 5;
    } else if (p.key !== 'a') {
      x = x + 5;
    }
    if (p.key === 'd') {
      x = x + 5;
    } else if (p.key !== 'd') {
      x = x
    }

  }
}
let myp5 = new p5(sketch);
