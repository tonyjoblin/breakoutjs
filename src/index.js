var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ball = ballFactory(canvas.width / 2, canvas.height - 30);

const paddleHeight = 10;
const paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var score = 0;



var bricks = [];

function brickIterator(wall, func) {
    const columns = wall.length;
    for(c = 0; c < columns; c++) {
        const rows = wall[c].length;
        for(r = 0; r < rows; r++) {
            func(wall[c][r]);
        }
    }
}

function drawBrickWall() {
    brickIterator(bricks, drawBrick);
}

function checkForBrickCollision() {
    brickIterator(bricks, function(brick) {
        if (checkBrickCollision(brick, ball)) {
            score += 5;
        }
    });
}

function checkForVictory() {
    var bricksDestroyed = 0;
    const columns = bricks.length;
    const rows = bricks[0].length;
    brickIterator(bricks, function(brick){
        if (brick.destroyed) { bricksDestroyed += 1; }
    });
    if (rows * columns == bricksDestroyed) {
        createBrickWall();
    }
}

function drawBrick(brick) {
  if (!brick.destroyed) {
    ctx.beginPath();
    ctx.rect(brick.x, brick.y, brick.width, brick.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, canvas.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawCircle(x, y, radius, colour) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
}

function drawBall(ball) {
    drawCircle(ball.x, ball.y, ball.radius, "#0095DD");
}

function ballHitLeftWall() {
    return ball.x - ball.radius < 0;
}

function ballHitRightWall() {
    return canvas.width < ball.x + ball.radius;
}

function ballHitTopWall() {
    return ball.y - ball.radius < 0;
}

function ballHitBottomWall() {
    return canvas.height < ball.y;
}

function bounceBall() {
    if (ballHitLeftWall() || ballHitRightWall()) {
        ball.dx = -ball.dx;
        ball.x += ball.dx;
    }
    if (ballHitTopWall()) {
        ballBounceVertical(ball);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function movePaddle() {
    const paddleMove = 7;
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleMove;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= paddleMove;
    }
}

function checkGameOver() {
    if (ballHitBottomWall()) {
        alert("GAME OVER");
        document.location.reload();
    }
}

function checkForBallBouncePaddle() {
    if (ball.y + ball.radius > canvas.height - paddleHeight) {
        if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
            ballBounceVertical(ball);
        }
    }
}

function draw() {
    clearCanvas();
    drawBrickWall();
    moveBall(ball);
    bounceBall();
    checkForBrickCollision();
    checkGameOver();
    movePaddle();
    checkForBallBouncePaddle();
    drawBall(ball);
    drawPaddle();
    drawScore();
    checkForVictory();
}

function main() {
  bricks = createBrickWall();
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  setInterval(draw, 10);
}
