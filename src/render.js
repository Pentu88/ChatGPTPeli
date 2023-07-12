// NOTICE siirretty game.js tiedostosta
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var gameWidth = canvas.width;
var gameHeight = canvas.height;

function drawBackground(ctx, canvasWidth, canvasHeight) {
  // Piirrä pelialueen tausta
  ctx.fillStyle = "lightblue"; // Aseta taustan väri
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

// NOTICE drawGameStart ja drawGameOver funktiot siirretty game.js -tiedostosta
// *** Lisätty ChatGPT'n luomaa koodia
// Piirrä "Aloita peli" -nappi
function drawStartGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Tyhjennä canvas

  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 - 25, 160, 50);

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Aloita peli", canvas.width / 2, canvas.height / 2 + 8);

  canvas.addEventListener("click", startGame);
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
// Piirrä "Peli loppui" -viesti ja "Aloita peli" -nappi
function drawGameOver() {
  ctx.save(); // Tallenna piirtotila

  ctx.globalAlpha = 0.5; // Aseta läpinäkyvyys
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 1; // Palauta täysi läpinäkyvyys
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Peli loppui!", canvas.width / 2, canvas.height / 2 - 20);

  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 + 10, 160, 50);

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Aloita peli", canvas.width / 2, canvas.height / 2 + 40);

  ctx.restore(); // Palauta piirtotila

  canvas.addEventListener("click", startGame);
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
// NOTICE ctx parametri poistettu, koska muuttuja on siirretty tähän tiedostoon
function drawPlayerFish(playerFish) {
  // NOTICE Haetaan kalan väri parametrina syötetystä kala objektista, updateGame -funktiossa olleen koodin mukaisesti
  ctx.fillStyle = playerFish.color; // Aseta pelaajan kalan väri (esim. oranssi)
  ctx.fillRect(
    playerFish.positionX,
    playerFish.positionY - playerFish.height / 2,
    playerFish.width,
    playerFish.height
  );
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
// NOTICE "ctx" -parametri poistettu
function drawRedFish(fish) {
  ctx.fillStyle = "red";
  ctx.fillRect(
	// NOTICE poistettu kalan koon vähentäminen X sijainnista
    fish.positionX,
    fish.positionY - fish.height / 2,
    fish.width,
    fish.height
  );
}

// NOTICE "ctx" -parametri poistettu
function drawYellowFish(fish) {
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    // NOTICE poistettu kalan koon vähentäminen X sijainnista
    fish.positionX,
    fish.positionY - fish.height / 2,
    fish.width,
    fish.height
  );
}

// NOTICE "ctx" -parametri poistettu
function drawBubble(bubble) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(
    bubble.positionX,
    bubble.positionY, // TODO pitäisikö korkeus muutta samankaltaiseksi kuin muissa kaloissa? fish.height / 2
	// NOTICE "radius" ominaisuus muutettu "height" muotoon
    bubble.height / 2,
    0,
    Math.PI * 2,
    false
  );
  ctx.closePath();
  ctx.fill();
}

// NOTICE kalan ominaisuus "type" muutettu muotoon "color"
function drawFishList(fishList) {
  fishList.forEach((fish) => {
    if (fish.color === "red") {
      drawRedFish(fish);
    } else if (fish.color === "yellow") {
      drawYellowFish(fish);
	// NOTICE muutettu vastaamaan "fish" objektissa olevaa väriä
    } else if (fish.color === "blue") {
      drawBubble(fish);
    }
  });
}
// ***

function drawFish(fish){
	// Piirrä kala
    ctx.fillStyle = fish.color;
	// NOTICE kalan kokoa muutettu
    ctx.fillRect(canvas.width - fish.position, fish.height, 50, 30);
}

// Piirtämiseen liittyvä funktio
function renderGame(fishList, playerFish) {
  // Tyhjennä canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Piirrä pelialueen tausta
  // NOTICE funktiokutsu lisätty
  drawBackground(ctx, gameWidth, gameHeight)
  
  // Piirrä kalat
  drawFishList(fishList); // Piirrä kaikki kalat

  // Piirrä pelaajan ohjaama kala
  drawPlayerFish(playerFish);

  // Piirrä muut tarvittavat visuaaliset elementit
}