const gameBoard=document.querySelector('#gameBoard')
const ctx=gameBoard.getContext("2d")
const resetBtn=document.querySelector('#resetBtn')
const gameWidth=gameBoard.width
const gameHeight=gameBoard.height
const boardBackground='black'
const paddle1Color='white'
const paddle2Color='white'
const paddleBorder='white'
const ballColor='white'
const ballBorder='white'
const ballRadius=12.5
const paddleDistance=25
let unitSize=25
let intervalID
let ballSpeed=1
let ballX=gameWidth/2
let ballY=gameHeight/2
let ballXDirection=0
let ballYDirection=0
let player1Score=0
let player2Score=0
let paddle1={
  width:25,
  height:100,
  x:0,
  y:gameHeight/2-2*unitSize,

}
let paddle2={
  width:25,
  height:100,
  x:gameWidth-unitSize,
  y:gameHeight/2-2*unitSize,
}

window.addEventListener('keypress',changeDirection)
resetBtn.addEventListener('click',gameReset)

gameStart()

function gameStart(){
  createBall()
  nextTick()
  
}
function nextTick(){
  intervalID=setTimeout(()=>{
    clearBoard()
    drawPaddles()
    moveBall()
    drawBall(ballX,ballY)
    checkCollisions()
    nextTick()
  },10)
}
function clearBoard(){
  ctx.fillStyle=boardBackground
  ctx.fillRect(0,0,gameWidth,gameHeight)
  ctx.strokeStyle = 'white'
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(250,5);
  ctx.lineTo(250,500);
  ctx.stroke();
  updateScoreOnGameboard(player1Score,player2Score)
  
}
function drawPaddles(){
  ctx.setLineDash([])
  ctx.strokeStyle = paddleBorder;
  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall(){
  ballSpeed=1
  if((Math.round(Math.random()))==1){
    ballXDirection=1
  }
  else{
    ballXDirection=-1
  }
  if((Math.round(Math.random()))==1){
    ballYDirection = Math.random() * 1;
  }
  else{
    ballYDirection = Math.random() * -1;
  }
  ballX=gameWidth/2
  ballY=gameWidth/2
}
function moveBall(){
  ballX+=(ballSpeed*ballXDirection)
  ballY+=(ballSpeed*ballYDirection)
}
function drawBall(ballX,ballY){
  ctx.fillStyle=ballColor
  ctx.strokeStyle=ballBorder
  ctx.beginPath()
  ctx.arc(ballX,ballY,ballRadius,0,2*Math.PI)
  ctx.stroke()
  ctx.fill()
}
function checkCollisions(){
  if(ballY<=0+ballRadius){
    ballYDirection*=-1
  }
  if(ballY>=gameHeight-ballRadius){
    ballYDirection*=-1
  }
  if(ballX<0){
    player2Score++
    
    createBall()
    return
  }
  if(ballX>=gameWidth){
    player1Score++
    
    createBall()
    return
  }

  if(ballX<=paddle1.x+paddle1.width+ballRadius){
    if(ballY>paddle1.y&&ballY<paddle1.y+paddle1.height){
      ballX=paddle1.x+paddle1.width+ballRadius
      ballXDirection*=-1
      ballSpeed+=1
    }
  }
  if(ballX>=paddle2.x-ballRadius){
    if(ballY>paddle2.y&&ballY<paddle2.y+paddle2.height){
      ballX=paddle2.x-ballRadius
      ballXDirection*=-1
      ballSpeed+=1
    }
  }
  
}
function changeDirection(event){
  const keyPressed=event.keyCode
  console.log(keyPressed)
  const paddle1Up=119
  const paddle1Down=115
  const paddle2Up=105
  const paddle2Down=107

  switch(keyPressed){
    case(paddle1Up):
      if(paddle1.y>0){
        paddle1.y-=paddleDistance
      }
      break
    case(paddle1Down):
      if(paddle1.y<gameHeight-paddle1.height){
        paddle1.y+=paddleDistance
      }
      break
    case(paddle2Up):
      if(paddle2.y>0){
        paddle2.y-=paddleDistance
      }
      break
    case(paddle2Down):
      if(paddle2.y<gameHeight-paddle1.height){
        paddle2.y+=paddleDistance
      }
      break
  }

}

function updateScoreOnGameboard(score1,score2){
  ctx.font="150px Wallpoet"
  ctx.fillStyle="rgba(234, 234, 234, 0.65)"
  ctx.textAlign="center"
  ctx.fillText(`${score1}`, gameWidth/2-100,100)
  ctx.fillText(`${score2}`, gameWidth/2+100,100)
}

function gameReset(){
  clearInterval(intervalID)
  player1Score=0
  player2Score=0
  paddle1={
    width:25,
    height:100,
    x:0,
    y:gameHeight/2-2*unitSize,
  } 
  paddle2={
    width:25,
    height:100,
    x:gameWidth-unitSize,
    y:gameHeight/2-2*unitSize,
  }
  ballX=gameWidth/2
  ballY=gameHeight/2
  gameStart()
}
