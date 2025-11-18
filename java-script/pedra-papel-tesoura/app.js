let userScore = 0;
let computerScore = 0;

function play(userChoice) {
  const choices = ['pedra', 'papel', 'tesoura'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];  //Math.floor(...) → Arredonda o número para baixo, sempre para o inteiro mais próximo menor ou igual.

  // Mostrar imagens
  document.querySelector('#user-choice').src = `/images/${userChoice}.png`;
  document.querySelector('#computer-choice').src = `/images/${computerChoice}.png`;

  // Ver resultado
  const result = getResult(userChoice, computerChoice);

  // Atualizar pontuação
  if (result === "Você ganhou!") {
    userScore++;
  } else if (result === "Computador ganhou!") {
    computerScore++;
  }

  // Mostrar mensagem e pontos
  document.querySelector('#result-message').textContent = result;
  document.querySelector('#user-score').textContent = userScore;
  document.querySelector('#computer-score').textContent = computerScore;

  // Verificar vencedor
  if (userScore === 5) {
    alert("🎉 Parabéns! Você venceu o jogo!");
    resetGame();
  } else if (computerScore === 5) {
    alert("😞 O computador venceu o jogo. Tente novamente!");
    resetGame();
  }
}

function getResult(user, computer) {
  if (user === computer) {
    return "Empate!";
  }

  if (
    (user === 'pedra' && computer === 'tesoura') ||
    (user === 'papel' && computer === 'pedra') ||
    (user === 'tesoura' && computer === 'papel')
  ) {
    return "Você ganhou!";
  } else {
    return "Computador ganhou!";
  }
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  document.querySelector('#user-score').textContent = "0";
  document.querySelector('#computer-score').textContent = "0";
  document.querySelector('#result-message').textContent = "";
  document.querySelector('#user-choice').src = "/images/interrogacao.png";
  document.querySelector('#computer-choice').src = "/images/interrogacao.png";
}
