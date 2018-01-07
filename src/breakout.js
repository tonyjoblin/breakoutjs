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
  if (!brick.destroyed) {
    if (brick.x <= ball.x && ball.x <= brick.x + brick.width) {
        if (brick.y <= ball.y && ball.y < brick.y + brick.height) {
            ball.dy = -ball.dy;
            ball.y += ball.dy;
            brick.destroyed = true;
        }
    }
  }
}