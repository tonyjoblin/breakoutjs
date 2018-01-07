var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ball = ballFactory(canvas.width / 2, canvas.height - 30);

const paddleHeight = 10;
const paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var score = 0;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];

function createBrickWall() {
    const width = 75;
    const height = 20;
    for(c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for(r = 0; r < brickRowCount; r++) {
            var x = c * (width + brickPadding) + brickOffsetLeft;
            var y = r * (height + brickPadding) + brickOffsetTop;
            bricks[c][r] = brickFactory(x, y);
        }
    }
}

function brickIterator(wall, func) {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {
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
    brickIterator(bricks, function(brick){
        if (brick.destroyed) { bricksDestroyed += 1; }
    });
    if (brickRowCount * brickColumnCount == bricksDestroyed) {
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

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
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
    moveBall();
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
  createBrickWall();
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  setInterval(draw, 10);
}
