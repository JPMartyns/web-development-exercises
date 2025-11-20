const grid = document.querySelector(".grid");
const width = 10;
let squares = [];
// Selecionar o botão de reinício
const restartButton = document.getElementById("restartButton"); 

// Variáveis de estado do jogo (estas precisam de ser redefinidas)
let snake; 
let direction; 
let intervalTime = 500;
let timerId;
let appleIndex;
let score;

// criar a grelha (Esta parte só precisa ser executada uma vez)
for (let i = 0; i < width * width; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
  squares.push(square);
}

function drawSnake() {
  snake.forEach(index => squares[index].classList.add("snake"));
}

function eraseSnake() {
  snake.forEach(index => squares[index].classList.remove("snake"));
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (snake.includes(appleIndex));

  squares[appleIndex].classList.add("apple");
}

function moveSnake() {
  const head = snake[0] + direction;

  // colisões
  if (
    (direction === 1 && head % width === 0) ||
    (direction === -1 && snake[0] % width === 0) ||
    (direction === width && head >= width * width) ||
    (direction === -width && head < 0) ||
    squares[head].classList.contains("snake")
  ) {
    clearInterval(timerId);
    alert("Game Over! Pontuação final: " + score);
    // Podemos adicionar uma classe para mostrar que o jogo acabou
    return;
  }

  eraseSnake();
  snake.unshift(head);

  if (squares[head].classList.contains("apple")) {
    squares[head].classList.remove("apple");
    generateApple();
    score++;
    document.getElementById("result").textContent = score;
    // Opcional: Acelerar um pouco o jogo
    // clearInterval(timerId);
    // intervalTime *= 0.9; 
    // timerId = setInterval(moveSnake, intervalTime);
  } else {
    snake.pop();
  }

  drawSnake();
}

function keyRoute(e) {
  // Evitar que o jogador mude a direção para a oposta de imediato
  // Opcional: Adicionar lógica para evitar movimentos impossíveis
  switch (e.key) {
    case "ArrowUp":
      if (direction !== width) direction = -width;
      break;
    case "ArrowDown":
      if (direction !== -width) direction = width;
      break;
    case "ArrowLeft":
      if (direction !== 1) direction = -1;
      break;
    case "ArrowRight":
      if (direction !== -1) direction = 1;
      break;
  }
}


/**
 * Função principal para inicializar ou reiniciar o jogo.
 */
function startGame() {
    // 1. Limpar qualquer estado anterior do jogo
    clearInterval(timerId);
    
    if (snake) {
        eraseSnake();
    }

    // Remover a maçã antiga, se existir
    if (appleIndex !== undefined) {
        squares[appleIndex].classList.remove("apple");
    }

    // 2. Redefinir as variáveis de estado
    snake = [75, 74, 73]; // Posição inicial
    direction = 1; // Começa para a direita
    intervalTime = 500; // Velocidade
    score = 0; // Pontuação

    // 3. Atualizar a pontuação no ecrã
    document.getElementById("result").textContent = score;

    // 4. Desenhar a cobra e a primeira maçã
    drawSnake();
    generateApple();

    // 5. Iniciar o movimento
    timerId = setInterval(moveSnake, intervalTime);
}


// Eventos
document.addEventListener("keydown", keyRoute);

// Novo evento: Ligar o botão de Reiniciar à função startGame
restartButton.addEventListener("click", startGame); 


// Iniciar o jogo pela primeira vez
startGame();