var canvas;
var canvasContext;

var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;


var paddle1Y = 250;
var paddle2Y = 250;
const paddleThickness = 10;
const paddleHeigth = 100;


var p1Score = 0;
var p2Score = 0;
const winningScore = 3;
var showWinScreen = false

const framesPerSecond = 30


window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    
    drawCanvas();
    setInterval(()=>{
        move();
        drawCanvas();
    }, 1000/framesPerSecond)

    canvas.addEventListener('mousedown', clickHandler);
    
    canvas.addEventListener('mousemove', (e)=> {
        var mousePos = calculateMousePos(e);
        paddle1Y = mousePos.y - (paddleHeigth /2);
    })
    
}

function clickHandler(){
    if(showWinScreen){
        p1Score = 0;
        p2Score = 0;
        showWinScreen = false;

    }
}

function computerMovement(){
    paddle2YCenter = paddle2Y + (paddleHeigth/2)
    paddle2YCenter < ballY-35 ? paddle2Y +=5 : paddle2YCenter > ballY+35 ? paddle2Y -= 5 : '';
}

function calculateMousePos(e){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    }
}


function move(){
    if(showWinScreen){

        return;
    }

    computerMovement()
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX<0){
        if(ballY>paddle1Y && ballY<paddle1Y+paddleHeigth){
            ballSpeedX = -ballSpeedX
            
            var deltaY = ballY - (paddle1Y+paddleHeigth/2)
            ballSpeedY = deltaY * 0.35
        }else{
            p2Score++; // agrego puntos antes de resetear la pelota, por si alguien gano
            ballReset()
        }
    }
    if(ballX>canvas.width){
        if(ballY>paddle2Y && ballY<paddle2Y+paddleHeigth){
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (paddle2Y+paddleHeigth/2)
            ballSpeedY = deltaY * 0.35
        }else{
            p1Score++;
            ballReset()
        }
    }
    if(ballY<0){
        ballSpeedY = -ballSpeedY
    }
    if(ballY>canvas.height){
        ballSpeedY = -ballSpeedY
    }
    
}

function ballReset(){
    p1Score >= winningScore || p2Score >= winningScore  ?  showWinScreen = true  : '' // Chequeo si alguien gano
    ballSpeedX = -ballSpeedX
    ballX= canvas.width/2;
    ballY= canvas.height/2;
}

function drawNet(){
    for (let i = 0; i < canvas.height; i +=40){
        drawRect(canvas.width/2-1, i, 2, 20, 'white');
    }
}


function drawCanvas(){
    drawRect(0, 0, canvas.width, canvas.height, 'black'); // Dibujo la cancha
    
    canvasContext.fillStyle='white';
    canvasContext.fillText(p1Score, 100, 100)
    canvasContext.fillText(p2Score, canvas.width-100, 100)
    
    if(showWinScreen){

        if(p1Score>p2Score){
            canvasContext.fillText('Player 1 won', canvas.width/2-25, canvas.height/4-15);
        }else{
            canvasContext.fillText('Player 2 won', canvas.width/2-25, canvas.height/4-15);
        }

        canvasContext.fillText('Click to continue', canvas.width/2-30, canvas.height/4);
    
        return;
    }
    
    drawNet();
    
    drawRect(0, paddle1Y, paddleThickness, paddleHeigth, 'white');     // Dibujo la raqueta del player 1
    drawRect(canvas.width-paddleThickness, paddle2Y, paddleThickness, paddleHeigth, 'white');     // Dibujo la raqueta de la pc
    drawCircle(ballX, ballY, 10, 'white')                 // Dibujo la pelota
   

}
function drawCircle(centerX, centerY, radius, color){
    canvasContext.fillStyle=color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true )
    canvasContext.fill()
}

function drawRect(leftX, topY, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

