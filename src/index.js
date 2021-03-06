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

function drawBrickWall() {
    brickIterator(bricks, drawBrick);
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
    score = checkForBrickCollision(bricks, ball, score);
    checkGameOver();
    movePaddle();
    checkForBallBouncePaddle();
    drawBall(ball);
    drawPaddle();
    drawScore();
    if (checkForVictory(bricks)) {
        bricks = createBrickWall();
    }
}

function main() {
  bricks = createBrickWall();
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  setInterval(draw, 10);
}
