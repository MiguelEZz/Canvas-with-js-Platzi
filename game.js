const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", startGame)

function updateWindowWidth() {
    // Actualizar el contenido del elemento HTML con el ancho de la ventana
    document.getElementById("windowWidth").textContent = window.innerWidth + "px";
  }

  // Llamar a la función inicialmente para mostrar el ancho actual de la ventana
  updateWindowWidth();

  // Agregar un evento 'resize' para actualizar el ancho de la ventana en tiempo real
  window.addEventListener("resize", updateWindowWidth);

  // Agregar un evento 'resize' para actualizar el ancho de la ventana en tiempo real


  
function startGame(){

    let medida;

    function updateWindowWidth() {

        if (window.innerWidth > 800){
            medida = 500;
        }else{
            medida = window.innerWidth* 0.63
        }
         
        canvas.setAttribute("width", medida)
        canvas.setAttribute("height", medida)

        const elementsSize = medida/10;

        game.font = elementsSize + "px Verdana";
        game.textAlign = "end"

     game.fillText(emojis["X"],elementsSize,elementsSize)

     for (let i = 1; i <= 10; i++){
        let derecha =elementsSize * i
        game.fillText(emojis["X"], derecha, elementsSize ) 
        console.log("caca")
        for (let i = 1; i <= 10; i++){
        game.fillText(emojis["X"], derecha, elementsSize * i)
        console.log("pene")
        }
    }
      }

    updateWindowWidth();

    window.addEventListener("resize", updateWindowWidth);
    // if(window.innerWidth > 800){
    //     canvasSize = 500
    // } else{
    //     canvasSize = window.innerWidth * 0.6
    // }

    // game.fillRect(0,0,100,100);
    // game.clearRect(50,50,100,100);

    // game.font = "25px Verdana";
    // game.fillStyle = "purple";
    // game.textAlign = "center"
    // game.fillText("platzi", 100,100)
}