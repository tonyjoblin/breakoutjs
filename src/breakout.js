function brickFactory(x, y) {
  return {
    x: x,
    y: y,
    width: 75,
    height: 20,
    destroyed: false
  };
}

function ballFactory(x, y) {
  return {
    x: x,
    y: y,
    dx: 2,
    dy: -2,
    radius: 10
  };
}

function checkBrickCollision(brick, ball) {
  var hadCollision = false;
  if (!brick.destroyed) {
    if (brick.x <= ball.x && ball.x <= brick.x + brick.width) {
        if (brick.y <= ball.y && ball.y < brick.y + brick.height) {
          ballBounceVertical(ball);
          brick.destroyed = true;
          hadCollision = true;
        }
    }
  }
  return hadCollision;
}

function ballBounceVertical(ball) {
  ball.dy = -ball.dy;
  ball.y += ball.dy;
}

function moveBall(ball) {
  ball.x += ball.dx;
  ball.y += ball.dy;
}


function createBrickWall() {
  const brickRowCount = 3;
  const brickColumnCount = 5;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;
  const width = 75;
  const height = 20;
  var bricks = [];
  for(c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for(r = 0; r < brickRowCount; r++) {
          var x = c * (width + brickPadding) + brickOffsetLeft;
          var y = r * (height + brickPadding) + brickOffsetTop;
          bricks[c][r] = brickFactory(x, y);
      }
  }
  return bricks;
}

function brickIterator(wall, func) {
  wall.forEach(function(row) {
    row.forEach(func);
  });
}
