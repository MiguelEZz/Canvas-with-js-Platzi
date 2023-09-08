const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnDown = document.querySelector("#down")
const btnright = document.querySelector("#right")
const spanLives = document.querySelector("#lives")
const spanTime = document.querySelector("#time")
const spanRecord= document.querySelector("#record")
const pResult= document.querySelector("#result")

const playerPosition = {
  x: undefined,
  y: undefined
};

const gifPosition = {
  x:undefined,
  y:undefined
};

let enemyPositions=[];
let canvasSize;
let elementsSize;
let timeStart;
let nuMapa = 0;
let lives = 3;
let timePlayer;
let timeInterval;

function  fixNumber(n){
  return Number(n.toFixed(1))
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = parseFloat((window.innerWidth * 0.6).toFixed(0));
  } else {
    canvasSize = 400;
  }
  
  canvasSize = Number(canvasSize.toFixed(0))  

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  playerPosition.y = undefined;
  playerPosition.x = undefined;
  
  startGame();
}

function startGame() {
  // console.log({ canvasSize, elementsSize });
  
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[nuMapa]
  
  if(!map){
    gameWin();
    return;
  }

  if (!timeStart){
    timeStart = Date.now();
    timeInterval = setInterval(showTime , 100)
    showRecord();
  }

  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map(row=>row.trim().split(""))
  // console.log({map, mapRows, mapRowCols})
  // console.log(playerPosition)

  showLives();

  enemyPositions = [];
  game.clearRect(0, 0, 524,canvasSize, canvasSize);
  
  mapRowCols.forEach((row , rowi)=>{
    row.forEach((col,coli)=>{
     const emoji = emojis[col]
     const posX =elementsSize * (coli+1);
     const posY =elementsSize * (rowi+1);
     game.fillText(emoji,posX , posY)
      
     if (col == "O" ){
      if(!playerPosition.y && !playerPosition.y){
        playerPosition.x = parseFloat(posX.toFixed(0))
        playerPosition.y = parseFloat(posY.toFixed(0))
     
      }
     }else if(col == "I"){
      gifPosition.x  = posX;
      gifPosition.y  = posY;
     }else if(col=="X"){
      enemyPositions.push({
        x:posX,
        y:posY
      })
     }

    //  console.log(col,coli,row,rowi)
    });
  });

 movePlayer()
  
}

function movePlayer(){
  const giftColisionX = playerPosition.x.toFixed(3 ) == gifPosition.x.toFixed(3 )
  const giftColisionY = playerPosition.y.toFixed(3 ) == gifPosition.y.toFixed(3 )
 
  if(giftColisionX && giftColisionY){
    console.log("GANASTE MALDITA RAMERA SUCIA PUTA DE")
    nuMapa += 1;
    startGame()
  }

  const enemyCollision  = enemyPositions.find(enemy =>{
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  })

  if(enemyCollision){
    levelFail();

  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
}

function levelFail (){
  lives--;

  if(lives <= 0){
    nuMapa = 0;
    lives = 3;
    timeStart = undefined
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function showTime(){
  spanTime.innerHTML = Date.now() - timeStart;
}

function showLives(){
  spanLives.innerHTML = emojis["HEART"].repeat(lives)
}

function gameWin() {
  console.log('¡Terminaste el juego!');
  clearInterval(timeInterval);

  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = 'SUPERASTE EL RECORD :)';
      
    } else {
      pResult.innerHTML = 'lo siento, no superaste el records :(';
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    pResult.innerHTML = 'Primera vez? Muy bien, pero ahora trata de superar tu tiempo :)';
  }

  console.log({recordTime, playerTime});
}
function showRecord(){
  spanRecord.innerHTML = localStorage.getItem("record_time");
}

btnUp.addEventListener("click", moveup)
btnLeft.addEventListener("click", moveleft)
btnDown.addEventListener("click", movedown)
btnright.addEventListener("click", moveright)
window.addEventListener("keydown", PressBtn)

function PressBtn(boton){
  //console.log(boton)
  boton.key == "w"|| boton.key == "ArrowUp" ? moveup():null;
  boton.key == "a"||boton.key =="ArrowLeft"? moveleft():null;
  boton.key == "s"||boton.key =="ArrowDown"? movedown():null;
  boton.key == "d"||boton.key =="ArrowRight"? moveright():null;
  
}

function moveup (){
 // console.log("me voy a mover pa arriva");
  if(playerPosition.y > elementsSize){
    playerPosition.y -= elementsSize;
    startGame()
  }
  
}
function moveleft (){
 // console.log("me voy a mover pa la izquierda");
  if (playerPosition.x > elementsSize) {
    playerPosition.x -= elementsSize;
  startGame()
  }
  
}
function movedown (){
 // console.log("me voy a mover pabajo ");
  if(playerPosition.y < canvasSize){
  playerPosition.y += elementsSize;
  startGame()
  }
}
function moveright (){
  //console.log("me voy a mover pa la derecha");
  if(playerPosition.x < canvasSize){
  playerPosition.x += elementsSize;
  startGame()
  }
}

