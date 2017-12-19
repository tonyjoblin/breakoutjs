var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
const ballRadius = 10;
var dx = 2;
var dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var score = 0;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];

function createBrickWall() {
  for(c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(r = 0; r < brickRowCount; r++) {
      bricks[c][r] = {
        x: (c * (brickWidth + brickPadding)) + brickOffsetLeft,
        y: (r * (brickHeight + brickPadding)) + brickOffsetTop,
        destroyed: false
      };
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
    brickIterator(bricks, checkBrickCollision);
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

function checkBrickCollision(brick) {
    if (!brick.destroyed) {
        if (brick.x <= x && x <= brick.x + brickWidth) {
            if (brick.y <= y && y < brick.y + brickHeight) {
                dy = -dy;
                y += dy;
                brick.destroyed = true;
                score += 5;
            }
        }
    }
}

function drawBrick(brick) {
  if (!brick.destroyed) {
    ctx.beginPath();
    ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
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

function drawBall(x, y) {
    drawCircle(x, y, ballRadius, "#0095DD");
}

function moveBall() {
    x += dx;
    y += dy;
}

function ballHitLeftWall() {
    return x - ballRadius < 0;
}

function ballHitRightWall() {
    return canvas.width < x + ballRadius;
}

function ballHitTopWall() {
    return y - ballRadius < 0;
}

function ballHitBottomWall() {
    return canvas.height < y;
}

function bounceBall() {
    if (ballHitLeftWall() || ballHitRightWall()) {
        dx = -dx;
        x += dx;
    }
    if (ballHitTopWall()) {
        dy = -dy;
        y += dy;
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
    if (y + ballRadius > canvas.height - paddleHeight) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            y += dy;
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
    drawBall(x, y);
    drawPaddle();
    drawScore();
    checkForVictory();
}

createBrickWall();
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);
