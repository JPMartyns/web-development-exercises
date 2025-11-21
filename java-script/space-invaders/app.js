// --- SELETORES E VARIÁVEIS GLOBAIS ---
const grid = document.querySelector(".grid");
const displayResultado = document.querySelector("#result");
// Precisas de ter um botão no HTML com id="botao-reiniciar"
const botaoReiniciar = document.querySelector("#botao-reiniciar"); 

let currentShooterIndex = 202;
const width = 15; // Largura da grelha (15x15)
let direction = 1; // 1 = direita, -1 = esquerda
let invadersId; // Para controlar o intervalo de movimento dos aliens
let isGoingRight = true;
let aliensRemoved = []; // Lista de aliens mortos
let results = 0; // A tua pontuação

// Criar os quadrados da grelha (15 * 15 = 225 div)
for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
}

// Selecionar os quadrados que acabámos de criar
const squares = Array.from(document.querySelectorAll(".grid div"));

// Posições iniciais dos invasores
// Usamos 'let' para poder redefinir isto ao reiniciar
let alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

// --- FUNÇÕES DO JOGO ---

// Função para desenhar os aliens na grelha
function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        // Só desenha se o alien não tiver sido removido (morto)
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invaders");
        }
    }
}

// Função para remover visualmente os aliens (útil antes de os mover)
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invaders");
    }
}

// Função principal: Move os aliens e verifica se o jogo acabou
function moveAliens() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    
    remove(); // Remove da posição atual

    // Lógica para descer e mudar de direção quando batem na borda
    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1; // Desce uma linha e ajusta
            direction = -1; // Muda direção para esquerda
            isGoingRight = false;
        }
    }

    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1; // Desce uma linha e ajusta
            direction = 1; // Muda direção para direita
            isGoingRight = true;
        }
    }

    // Atualiza a posição de cada alien
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    draw(); // Desenha na nova posição

    // --- VERIFICAÇÕES DE FIM DE JOGO ---
    
    // 1. Se os aliens tocarem no atirador
    if (squares[currentShooterIndex].classList.contains("invaders", "shooter")) {
        displayResultado.innerHTML = "GAME OVER";
        clearInterval(invadersId); // Para o movimento
        document.removeEventListener('keydown', moveShooter); // Bloqueia controlos
        document.removeEventListener('keydown', shoot);
    }

    // 2. Se destruíste todos os aliens (Vitória)
    if (aliensRemoved.length === alienInvaders.length) {
        displayResultado.innerHTML = "GANHASTE PAH!!!";
        clearInterval(invadersId);
        document.removeEventListener('keydown', moveShooter);
        document.removeEventListener('keydown', shoot);
    }
}

// Função para mover o atirador (Nave)
function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

// Função de disparo (Laser)
function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        // Remove laser da posição anterior
        if (currentLaserIndex >= 0 && currentLaserIndex < squares.length) {
             squares[currentLaserIndex].classList.remove("laser");
        }

        currentLaserIndex -= width; // O laser sobe uma linha

        // Verifica se o laser ainda está dentro da grelha
        if (currentLaserIndex < 0) {
            clearInterval(laserId);
            return;
        }

        // Adiciona o laser na nova posição
        squares[currentLaserIndex].classList.add("laser");

        // Se o laser acertar num alien
        if (squares[currentLaserIndex].classList.contains("invaders")) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invaders");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);
            clearInterval(laserId);

            // Descobrir qual alien foi atingido
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            
            // ATUALIZAR PONTUAÇÃO
            results++;
            displayResultado.innerHTML = results;
        }
    }

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100);
    }
}

// --- FUNÇÃO REINICIAR ---
function reiniciarJogo() {
    // 1. Parar quaisquer intervalos ativos
    clearInterval(invadersId);
    
    // 2. Limpar classes da grelha (tirar aliens, naves, lasers antigos)
    squares.forEach(square => {
        square.classList.remove("invaders", "shooter", "laser", "boom");
    });

    // 3. Repor variáveis
    aliensRemoved = [];
    results = 0;
    displayResultado.innerHTML = results;
    currentShooterIndex = 202;
    direction = 1;
    isGoingRight = true;
    
    // Repor a lista original de aliens
    alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];

    // 4. Adicionar os Event Listeners novamente
    document.addEventListener("keydown", moveShooter);
    document.addEventListener("keydown", shoot);

    // 5. Desenhar e começar
    squares[currentShooterIndex].classList.add("shooter");
    draw();
    invadersId = setInterval(moveAliens, 600);
}

// --- INICIAR O JOGO ---
// Ouve o clique no botão
if(botaoReiniciar) {
    botaoReiniciar.addEventListener('click', reiniciarJogo);
}

// Começa o jogo a primeira vez
draw();
squares[currentShooterIndex].classList.add("shooter");
document.addEventListener("keydown", moveShooter);
document.addEventListener("keydown", shoot);
invadersId = setInterval(moveAliens, 600);