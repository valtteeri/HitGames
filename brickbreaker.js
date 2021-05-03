// Canvas
const cvs = document.getElementById("brick");
const ctx = cvs.getContext("2d");

//Variables

let score = 0;
const score_unit = 10;
let life = 3;
const paddleWidth = 75;
const paddleHeight = 10;
const paddleMarginBottom = 20;
let leftArrow = false;
let rightArrow = false;
let GAME_OVER = false;

//Paddle
const paddle = {
    x : cvs.width/2 - paddleWidth / 2,
    y : cvs.height - paddleMarginBottom - paddleHeight,
    width : paddleWidth,
    height : paddleHeight,
    dx : 3
}

function drawPaddle() {
   ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ffff";
    ctx.stroke();
    ctx.closePath();
   }

//Paddlemoving
document.addEventListener("keydown", function(event){
if(event.keyCode == 37){
  leftArrow = true;
}else if(event.keyCode == 39){
  rightArrow = true;
}
});

document.addEventListener("keyup", function(event){
if(event.keyCode == 37){
  leftArrow = false;
}   else if(event.keyCode == 39){
  rightArrow = false;
}
});


function movePaddle(){
if(rightArrow && paddle.x + paddle.width < cvs.width){
   paddle.x += paddle.dx;
}  else if(leftArrow && paddle.x > 0){
   paddle.x -= paddle.dx;
}
}
//Ball

const ballRadius = 10;

const ball = {
   x : cvs.width/2,
   y : paddle.y - ballRadius,
   radius : ballRadius,
   speed : 4,
   dx : 3 * (Math.random() * 2 - 1),
   dy : -3

}
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#ffff";
    ctx.fill();
    ctx.closePath();
   }

function moveBall(){
   ball.x += ball.dx;
   ball.y += ball.dy;
}

//Wall collision



function wallCollision(){
   if(ball.x + ball.dx > cvs.width - ball.radius || ball.x + ball.dx < ball.radius) {
       ball.dx = -ball.dx;
   }
   if(ball.y + ball.dy < ball.radius){
       ball.dy = -ball.dy;
   }
   if(ball.y + ball.radius  > cvs.height){
       life--;
       resetBall();
   }
}

function resetBall(){
   ball.x = cvs.width/2;
   ball.y = paddle.y - ball.radius;
   ball.dx = 3 * (Math.random() * 2 - 1);
   ball.dy = -3;
}

function paddleCollision(){
   if(ball.x < paddle.x + paddle.width && ball.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){

       let collidePoint = ball.x - (paddle.x + paddle.width/2);

       collidePoint = collidePoint / (paddle.width/2);

       let angle = collidePoint * Math.PI/3;

       ball.dx = ball.speed * Math.sin(angle);
       ball.dy = -ball.speed * Math.cos(angle);


   }
}
//Bricks
const brick = {
   row : 4,
   column : 6,
   width : 70,
   height : 20,
   offSetTop : 10,
   offSetLeft : 10,
   marginTop : 30,
   strokeColor : "#ffff"

}

let bricks = [];

function createBricks(){
   for(let r = 0; r < brick.row; r++){
       bricks[r] = [];
       for(let c = 0; c < brick.column; c++){
           bricks[r][c] = {
               x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
               y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
               status : true
           }
       }
   }
}

createBricks();


function drawBricks(){
   for(let r = 0; r < brick.row; r++){
       for(let c = 0; c < brick.column; c++){
           let b = bricks [r][c];
           if(b.status){
               ctx.strokeStyle = brick.strokeColor;
               ctx.strokeRect(b.x, b.y, brick.width, brick.height);
           }
       }
   }
}

function brickCollision(){
for(let r = 0; r < brick.row; r++){
   for(let c = 0; c < brick.column; c++){
       let b = bricks[r][c];
       if(b.status){
           if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
               ball.dy = - ball.dy;
               b.status = false; 
               score += score_unit;
           }
       }
   }
}
}



function drawScore(text, textX, textY){
ctx.fillStyle = "#ffff";
ctx.font = "15px Courier New";
ctx.fillText("SCORE : " +score , 8, 20);
}

function drawLife(text, textX, textY){
ctx.fillStyle = "#ffff";
ctx.font = "15px Courier New";
ctx.fillText("LIVES : " +life , cvs.width - 100, 20);
}
//Draw
function draw() {
drawBall();
drawPaddle();
drawBricks();
drawScore();
drawLife();
}


function gameover(){
   if(life <=0){
       GAME_OVER = true;
   }
}


//Update
function update(){
   movePaddle();
   moveBall();
   wallCollision();
   paddleCollision();
   brickCollision();
}

//Loop

function loop(){
   ctx.clearRect(0, 0, cvs.width, cvs.height);
   draw();
   update();
   requestAnimationFrame(loop);    
}

loop();


