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
  
  // drawTriangle2(playerFish.positionX, playerFish.positionY, playerFish.height)
  // drawHalfCircle(playerFish.positionX, playerFish.positionY, playerFish.height / 2)
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
  
  // drawRoundedSquare(fish.positionX, fish.positionY, fish.height, fish.height, 12);
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
    bubble.positionX + (bubble.width / 2),
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
// DEBUG
function drawHexagon1(x, y, width, height) {
  const angleDeg = 30;
  const angleRad = (Math.PI / 180) * angleDeg;

  const x1 = x + width / 2;
  const y1 = y;
  const x2 = x + width;
  const y2 = y + height / 2;
  const x3 = x + width / 2;
  const y3 = y + height;
  const x4 = x - width / 2;
  const y4 = y + height;
  const x5 = x - width;
  const y5 = y + height / 2;
  const x6 = x - width / 2;
  const y6 = y;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.lineTo(x5, y5);
  ctx.lineTo(x6, y6);
  ctx.closePath();
  ctx.fill();
}

function drawHexagon2(x, y, size) {
  const angleRad = (Math.PI / 180) * 30;
  const sideLength = size / 2;

  ctx.beginPath();
  ctx.moveTo(x + sideLength * Math.cos(0), y + sideLength * Math.sin(0));

  for (let i = 1; i <= 6; i++) {
    ctx.lineTo(
      x + sideLength * Math.cos(angleRad * i),
      y + sideLength * Math.sin(angleRad * i)
    );
  }

  ctx.closePath();
  ctx.fill();
}

function drawHexagon3(x, y, size) {
  ctx.strokeStyle = "green";
  ctx.strokeRect(x, y, 50, size);	
  
ctx.strokeStyle = "blue";  
ctx.beginPath();
ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
ctx.stroke();

  // drawTriangle2(x, y, size)
  drawHalfCircle(x, y, size / 2)

  x += (40 - size)
  ctx.fillStyle = "orange";  	
  const angleRad = (Math.PI / 180) * 30;
  const sideLength = size / 2;
  const height = Math.sqrt(3) * sideLength;

  
  ctx.beginPath();
  ctx.moveTo(x + sideLength / 2, y);
  // NOTICE lisätty
  ctx.lineTo(x + sideLength * 1.5, y);
  ctx.lineTo(x + size, y + size / 2);
  ctx.lineTo(x + sideLength * 1.5, y + size);
  // NOTICE lisätty
  ctx.lineTo(x + sideLength / 2, y + size);
  ctx.lineTo(x, y + size / 2);
  ctx.closePath();
  ctx.fill();

}

function drawTriangle1(x, y, size) {
  const height = (Math.sqrt(3) / 2) * size;
  
  ctx.beginPath();
  ctx.moveTo(x, y + size);
  ctx.lineTo(x + size / 2, y + size - height);
  ctx.lineTo(x + size, y + size);
  ctx.closePath();
  ctx.fill();
}

function drawTriangle2(x, y, size) {
  ctx.fillStyle = "red";
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size, y + size / 2);
  ctx.lineTo(x, y + size)
  
  // ctx.lineTo(x + size, y + size);
  ctx.closePath();
  ctx.fill();
}

function drawTriangle3(x, y, width, size) {
  ctx.fillStyle = "red";
  
  ctx.beginPath();
  ctx.moveTo(x + width, y);
  ctx.lineTo(x + width - size * 0.6, y + size / 2);
  ctx.lineTo(x + width, y + size)
  
  // ctx.lineTo(x + size, y + size);
  ctx.closePath();
  ctx.fill();
}

function drawHalfCircle(x, y, radius) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x, y + radius, radius,  Math.PI / 2 , Math.PI + Math.PI / 2, true);
  ctx.closePath();
  ctx.fill();
}

function drawRoundedSquare( x, y, width, height, cornerRadius) {
  // drawTriangle2(x, y, 56, height)
  // drawTriangle2(x, y, 56, height)
  
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(x + cornerRadius, y);
  ctx.arcTo(x, y, x, y + cornerRadius, cornerRadius);
  ctx.lineTo(x, y + height - cornerRadius);
  ctx.arcTo(x, y + height, x + cornerRadius, y + height, cornerRadius);
  ctx.lineTo(x + cornerRadius + 15, y + height);
  //ctx.lineTo(x + width, y);
  ctx.arcTo(x + cornerRadius * 2 + 15, y + height, x + cornerRadius * 3 + 15, y + height / 2, height / 2);
  ctx.arcTo(x + cornerRadius * 3 + 15, y, x + cornerRadius * 2 + 15 , y, height / 2);
  ctx.closePath();
  ctx.fill();
}

function drawRoundedSquare2( x, y, width, height, cornerRadius) {
  ctx.beginPath();
  ctx.moveTo(x + cornerRadius, y);
  ctx.arcTo(x, y, x, y + cornerRadius, cornerRadius);
  ctx.lineTo(x, y + height - cornerRadius);
  ctx.arcTo(x, y + height, x + cornerRadius, y + height, cornerRadius);
  ctx.lineTo(x + width, y + height);
  //ctx.lineTo(x + width, y);
  ctx.arcTo(x + width * 1.5, y + height, x + width * 1.5, y + height / 2, height / 2);
  ctx.arcTo(x + width * 1.5, y, x + width , y, height / 2);
  ctx.closePath();
  ctx.fill();
}

// ***

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
  // Piirrä muut tarvittavat visuaaliset elementit
  
  // DEBUG
  // drawHalfCircle(playerFish.positionX,playerFish.positionY - playerFish.height - 10, playerFish.height / 2)
  // drawHexagon1(playerFish.positionX, playerFish.positionY - playerFish.height - 10, playerFish.width, playerFish.height);
  // drawHexagon3(playerFish.positionX, playerFish.positionY + playerFish.height + 10, playerFish.height);
}
