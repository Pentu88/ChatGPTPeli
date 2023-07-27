// NOTICE Ennätyksen ylläpito siirretty omaan tiedostoonsa
// Tallenna tulosennätys
function saveHighScore(score) {
  const highScore = localStorage.getItem('highScore');
  if (!highScore || score > highScore) {
    localStorage.setItem('highScore', score);
  }
}

// Tarkista tulosennätys
function checkHighScore(score) {
  const highScore = localStorage.getItem('highScore');
  if (!highScore || score > highScore) {
    return score;
  }
  return highScore;
}

function getHighScore() {
  return localStorage.getItem('highScore') || 0;
}

// Päivitä HTML-elementti ennätyspisteillä
function updateHighScoreElement() {
  const highScoreElement = document.getElementById('high-score');
  const highScore = getHighScore();
  highScoreElement.textContent = `${highScore}`;
}