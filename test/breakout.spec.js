describe("ball colides with a brick", function(){
  it("the brick is destroyed", function(){
    var brick = brickFactory(100, 100);
    var ball = ballFactory(120, 110);

    checkBrickCollision(brick, ball);

    expect(brick.destroyed).toBe(true);
  });
  it("the ball bounces off the brick", function(){
    var brick = brickFactory(100, 100);
    var ball = ballFactory(120, 110);
    ball.dy = 5;

    checkBrickCollision(brick, ball);

    expect(ball.dy).toBe(-5);
    expect(ball.y).toBe(105);
  });
  it("ball cannot collide with a brick that is already destroyed", function(){
    var brick = brickFactory(100, 100);
    brick.destroyed = true;
    var ball = ballFactory(120, 110);
    ball.dy = 5;

    checkBrickCollision(brick, ball);

    expect(ball.dy).toBe(5);
    expect(ball.y).toBe(110);
  });
});
describe("brick factory", function(){
  const brick = brickFactory(1, 2);
  it("returns a brick object", function(){
    expect(brick).toBeDefined();
    expect(typeof brick).toBe("object");
  });
  it("bricks have a position", function(){
    expect(brick.x).toBeDefined();
    expect(brick.x).toBe(1);
    expect(brick.y).toBeDefined();
    expect(brick.y).toBe(2);
  });
  it("bricks have width", function(){
    expect(brick.width).toBeDefined();
    expect(brick.width).toBe(75);
  });
  it("bricks have height", function(){
    expect(brick.height).toBeDefined();
    expect(brick.height).toBe(20);
  });
  it("bricks have a destroyed flag", function(){
    expect(brick.destroyed).toBeDefined();
    expect(typeof brick.destroyed).toBe("boolean");
    expect(brick.destroyed).toBe(false);
  });
});
describe("ball factory", function(){
  const ball = ballFactory(1, 2);
  it("returns a ball object", function(){
    expect(ball).toBeDefined();
    expect(typeof ball).toBe("object");
  });
  it("balls have a position", function(){
    expect(ball.x).toBeDefined();
    expect(typeof ball.x).toBe("number");
    expect(ball.x).toBe(1);
    expect(ball.y).toBeDefined();
    expect(typeof ball.y).toBe("number");
    expect(ball.y).toBe(2);
  });
  it("balls have a velocity", function(){
    expect(ball.dx).toBeDefined();
    expect(typeof ball.dx).toBe("number");
    expect(ball.dy).toBeDefined();
    expect(typeof ball.dy).toBe("number");
  });
  it("balls have a radius", function(){
    expect(ball.radius).toBeDefined();
    expect(typeof ball.radius).toBe("number");
    expect(ball.radius).toBe(10);
  });
});