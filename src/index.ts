import * as p5 from "p5"

console.log('hi')

let sketch = function (p: p5) {
  let x = 400;
  let y = 400;


  p.draw = function () {
    p.background(220);
    p.fill(0);
    p.ellipse(x, y, 50, 50);

    


    if (x >= 400) {
      x = 0;
    }

  }


  function keyPressed() {
    if (p.keyCode === p.UP_ARROW) {
      y = y - 10;
    } else if (p.keyCode === p.DOWN_ARROW) {
      y = y + 10;
    }
    if (p.keyCode === p.LEFT_ARROW) {
      x = x - 5;
    } else if (p.keyCode === p.RIGHT_ARROW) {
      x = x + 5;
    }

  }
}
let myp5 = new p5(sketch);
