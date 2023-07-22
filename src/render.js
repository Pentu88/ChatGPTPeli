// NOTICE siirretty game.js tiedostosta
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var gameWidth = canvas.width;
var gameHeight = canvas.height;

function drawBackground(ctx, canvasWidth, canvasHeight) {
  // Piirrä pelialueen tausta
  ctx.fillStyle = "lightblue"; // Aseta taustan väri
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Piirrä pohjan hiekanvärisen alueen alareuna
  // NOTICE "context" muuttuja viittaukset vaihdettu muotoon "ctx"
  ctx.fillStyle = "sandybrown";
  ctx.fillRect(0, gameHeight - 10, gameWidth, 10);
  
  // NOTICE lisätty viittaus funktioon
  drawGameVersion();
}

// NOTICE pelin versionumeron piirtämisestä tehty funktio
// NOTICE piirtämistä fixattu hieman, väri, fontti koko ja kohta
function drawGameVersion() {
  // Piirrä pelin versionumero
  const version = getVersion(); // Oletetaan, että game.js-tiedostossa on metodi getVersion() palauttamaan versionumeron
  // NOTICE "context" muuttuja viittaukset vaihdettu muotoon "ctx"
  ctx.fillStyle = "Black";
  ctx.font = "10px Arial";
  ctx.fillText(version, gameWidth - 20, 10);
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
  /* 
  ctx.fillRect(
    playerFish.positionX,
	// NOTICE kalan korkeutta säädetty (jotta törmäys voidaan laskea oikein)
    playerFish.positionY, // - playerFish.height / 2,
    playerFish.width,
    playerFish.height
  );*/
  
  // NOTICE Muokattu ja yhdistelty ChatGPT'n luomista kuvioista (kokeile ja erehdy menetelmällä)
  // Pyrstö
  ctx.beginPath();
  ctx.arc(playerFish.positionX + playerFish.width - playerFish.height / 2, playerFish.positionY + playerFish.height / 2, playerFish.height / 2,  Math.PI / 2 , Math.PI + Math.PI / 2, true);
  ctx.closePath();
  ctx.fill();
  
  // Pää
  ctx.beginPath();
  ctx.arc(playerFish.positionX, playerFish.positionY + playerFish.height / 2, playerFish.height / 2,  Math.PI / 2 , Math.PI + Math.PI / 2, true);
  ctx.closePath();
  ctx.fill();
  
  // Kala
  let size = playerFish.height
  let more = size / 2 - 2
    	
  const angleRad = (Math.PI / 180) * 30;
  const sideLength = size / 2;
  const height = Math.sqrt(3) * sideLength;
  
  ctx.beginPath();
  ctx.moveTo(more + playerFish.positionX + sideLength / 2, playerFish.positionY);
  // NOTICE lisätty
  ctx.lineTo(more + playerFish.positionX + sideLength * 1.5, playerFish.positionY);
  ctx.lineTo(more + playerFish.positionX + size, playerFish.positionY + size / 2);
  ctx.lineTo(more + playerFish.positionX + sideLength * 1.5, playerFish.positionY + size);
  // NOTICE lisätty
  ctx.lineTo(more + playerFish.positionX + sideLength / 2, playerFish.positionY + size);
  ctx.lineTo(more + playerFish.positionX, playerFish.positionY + size / 2);
  ctx.closePath();
  ctx.fill();
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
// NOTICE "ctx" -parametri poistettu
function drawRedFish(fish) {
  /*ctx.fillStyle = "red";
  ctx.fillRect(
	// NOTICE poistettu kalan koon vähentäminen X sijainnista
    fish.positionX,
	// NOTICE kalan korkeutta säädetty (jotta törmäys voidaan laskea oikein)
    fish.positionY, // - fish.height / 2,
    fish.width,
    fish.height
  );*/
 
  // NOTICE Muokattu ja yhdistelty ChatGPT'n luomista kuvioista (kokeile ja erehdy menetelmällä)
  ctx.fillStyle = "red";

  // Pyrstö
  ctx.beginPath();
  ctx.moveTo(fish.positionX + fish.width, fish.positionY);
  ctx.lineTo(fish.positionX + fish.width - fish.height * 0.6, fish.positionY + fish.height / 2);
  ctx.lineTo(fish.positionX + fish.width, fish.positionY + fish.height)
  // ctx.lineTo(x + size, y + size);
  ctx.closePath();
  ctx.fill();

  // Kala
  let cornerRadius = 12;
  
  ctx.beginPath();
  ctx.moveTo(fish.positionX + cornerRadius, fish.positionY);
  ctx.arcTo(fish.positionX, fish.positionY, fish.positionX, fish.positionY + cornerRadius, cornerRadius);
  ctx.lineTo(fish.positionX, fish.positionY + fish.height - cornerRadius);
  ctx.arcTo(fish.positionX, fish.positionY + fish.height, fish.positionX + cornerRadius, fish.positionY + fish.height, cornerRadius);
  ctx.lineTo(fish.positionX + cornerRadius + 15, fish.positionY + fish.height);
  //ctx.lineTo(x + width, y);
  // NOTICE lisätty puoli pyöreä takaosa
  ctx.arcTo(fish.positionX + cornerRadius * 2 + 15, fish.positionY + fish.height, fish.positionX + cornerRadius * 3 + 15, fish.positionY + fish.height / 2, fish.height / 2);
  ctx.arcTo(fish.positionX + cornerRadius * 3 + 15, fish.positionY, fish.positionX + cornerRadius * 2 + 15 , fish.positionY, fish.height / 2);
  ctx.closePath();
  ctx.fill();
}

// NOTICE "ctx" -parametri poistettu
function drawYellowFish(fish) {
  ctx.fillStyle = "yellow";
  /*
  ctx.fillRect(
    // NOTICE poistettu kalan koon vähentäminen X sijainnista
    fish.positionX,
	// NOTICE kalan korkeutta säädetty (jotta törmäys voidaan laskea oikein)
    fish.positionY, // - fish.height / 2,
    fish.width,
    fish.height
  );*/
  
  // NOTICE Muokattu ja yhdistelty ChatGPT'n luomista kuvioista (kokeile ja erehdy menetelmällä)
  // Pyrstö
  ctx.beginPath();
  ctx.arc(fish.positionX + fish.width, fish.positionY + fish.height / 2, fish.height / 2,  Math.PI / 2 , Math.PI + Math.PI / 2, false);
  ctx.closePath();
  ctx.fill();
  
  // Kala
  let size = fish.height
    	
  const angleRad = (Math.PI / 180) * 30;
  const sideLength = size / 2;
  const height = Math.sqrt(3) * sideLength;

  ctx.beginPath();
  ctx.moveTo(fish.positionX + sideLength / 2, fish.positionY);
  // NOTICE lisätty
  ctx.lineTo(fish.positionX + sideLength * 1.5, fish.positionY);
  ctx.lineTo(fish.positionX + size, fish.positionY + size / 2);
  ctx.lineTo(fish.positionX + sideLength * 1.5, fish.positionY + size);
  // NOTICE lisätty
  ctx.lineTo(fish.positionX + sideLength / 2, fish.positionY + size);
  ctx.lineTo(fish.positionX, fish.positionY + size / 2);
  ctx.closePath();
  ctx.fill();
}

// NOTICE "ctx" -parametri poistettu
function drawBubble(bubble) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(
    bubble.positionX + (bubble.width / 4), // piirretään kupla hieman eteen sijainnista, osumisen parantamisen vuoksi 
    bubble.positionY + bubble.height / 2, // NOTICE kupla siirretty korkeus suunnasssa (jotta törmäys voidaan laskea oikein)
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

// *** Lisätty ChatGPT'n luomaa koodia
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
  // Piirrä muut tarvittavat visuaaliset elementi
}
