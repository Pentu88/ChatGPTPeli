// NOTICE siirretty game.js tiedostosta
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var gameWidth = canvas.width;
var gameHeight = canvas.height;

function drawBackground(ctx, canvasWidth, canvasHeight) {
  // Luodaan sinisen liukuvärin alkaen pohjasta (tummempi) ja päättyen yläosaan (vaaleampi)
  const gradient = ctx.createLinearGradient(0, gameHeight, 0, 0);
  gradient.addColorStop(0, "#003366"); // Tumma sininen
  gradient.addColorStop(1, "#66ccff"); // Vaalea sininen

  // Piirretään liukuväri taustalle
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
  
  // Piirrä pohjan hiekanvärisen alueen alareuna
  // NOTICE "context" muuttuja viittaukset vaihdettu muotoon "ctx"
  // ctx.fillStyle = "sandybrown";
  // ctx.fillRect(0, gameHeight - 10, gameWidth, 10);
  drawSand3(time)
  
  // NOTICE lisätty viittaus funktioon
  drawGameVersion();
}

// NOTICE parametrit muutettu 
function drawSand3(time = 0) {
  const sandHeight = gameHeight * 0.12; // Voit muuttaa hiekkapohjan korkeutta täällä
  const sandWidth = gameWidth * 1.2; // Muuta tätä arvoa tarvittaessa
  
  // Luodaan liukuvärjätty alue
  const gradient = ctx.createLinearGradient(0, gameHeight, 0, gameHeight - sandHeight);
  gradient.addColorStop(0, "SaddleBrown"); // Yläreuna väri (sandybrown)
  gradient.addColorStop(1, "sandybrown"); // Alareuna väri (white)

  // Piirrä liukuvärjätty alue
  ctx.fillStyle = gradient;
  ctx.fillRect(0, gameHeight - sandHeight, gameWidth, sandHeight);

  // Piirrä liukuvärjätty alue
  ctx.fillStyle = gradient;
  ctx.fillRect(-sandWidth / 2, gameHeight - sandHeight, sandWidth, sandHeight);

  // Aaltoileva yläreuna
  const waveHeight = 5;
  const waveLength = 100;
  const yOffset = 2 * Math.sin(time / 100);

  ctx.beginPath();
  ctx.moveTo(-sandWidth / 2, gameHeight - sandHeight);
  for (let x = -sandWidth / 2; x < gameWidth + sandWidth / 2; x += 10) {
    const y = gameHeight - sandHeight + waveHeight * Math.sin((x + time) / waveLength) + yOffset;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(gameWidth + sandWidth / 2, gameHeight - sandHeight);
  ctx.closePath();
  
  ctx.fillStyle = "peru"; // (sandybrown) -> (Chocolate)
  ctx.fill();
}

// NOTICE pelin versionumeron piirtämisestä tehty funktio
// NOTICE piirtämistä fixattu hieman, väri, fontti koko ja kohta
// NOTICE "context" muuttuja viittaukset vaihdettu muotoon "ctx"
function drawGameVersion() {
  // Piirrä pelin versionumero
  const version = getVersion(); // Oletetaan, että game.js-tiedostossa on metodi getVersion() palauttamaan versionumeron

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

// NOTICE "playerFish" muuttuja viittaukset muutettu "fish" -muotoon, kuten muissakin kaloissa
function drawPlayerFish(fish) {
  ctx.fillStyle = playerFish.color; // Aseta pelaajan kalan väri (esim. oranssi)
 
  // Pyrstö
  ctx.beginPath();
  ctx.arc(fish.positionX, fish.positionY, fish.height / 2,  Math.PI / 2 , Math.PI + Math.PI / 2, true);
  ctx.closePath();
  ctx.fill();
  
  // Lasketaan etäisyys keskeltä kärkeen
  const sideLength = 14 // (fish.height / 2) / Math.cos(Math.PI / 6);
  
  ctx.beginPath();
  ctx.moveTo(fish.positionX + fish.width - fish.height / 2, fish.positionY - fish.height / 2);

  ctx.arc(fish.positionX + fish.width - fish.height / 2, fish.positionY, fish.height / 2, Math.PI * 1.5, Math.PI * 0.5, false);
  // NOTICE lisätty
  ctx.lineTo(fish.positionX + fish.width - sideLength - sideLength / 2, fish.positionY + fish.height / 2);
  ctx.arc(fish.positionX + fish.width - sideLength - sideLength / 2, fish.positionY, fish.height / 2,  Math.PI * 0.5, Math.PI * 1.5, false);
  ctx.closePath();
  ctx.fill();
  
  // Piirrä silmä
  ctx.fillStyle = "white"; // Silmän väri
  ctx.beginPath();
  ctx.arc(
    fish.positionX + fish.eye.x,
    fish.positionY + fish.eye.y,
    fish.eye.radius,
    0,
    2 * Math.PI
  );
  ctx.fill();

  // Piirrä pupilli
  ctx.fillStyle = "black"; // Pupillin väri
  ctx.beginPath();
  ctx.arc(
    fish.positionX + fish.eye.x + fish.pupil.x,
    fish.positionY + fish.eye.y + fish.pupil.y,
    fish.pupil.radius,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function drawRedFish(fish) {
  ctx.fillStyle = "red";

  // Pyrstö
  ctx.beginPath();
  ctx.moveTo(fish.positionX + fish.width, fish.positionY - fish.height / 2);
  ctx.lineTo(fish.positionX + fish.width - fish.height * 0.6, fish.positionY);
  ctx.lineTo(fish.positionX + fish.width, fish.positionY + fish.height / 2)
  ctx.closePath();
  ctx.fill();

  // Kala
  let cornerRadius = 12;
  
  ctx.beginPath();
  ctx.moveTo(fish.positionX + cornerRadius, fish.positionY - fish.height / 2);
  ctx.arcTo(fish.positionX, fish.positionY  - fish.height / 2, fish.positionX, fish.positionY + cornerRadius, cornerRadius);
  ctx.lineTo(fish.positionX, fish.positionY + fish.height / 2 - cornerRadius);
  ctx.arcTo(fish.positionX, fish.positionY + fish.height / 2, fish.positionX + cornerRadius, fish.positionY + fish.height / 2, cornerRadius);
  ctx.lineTo(fish.positionX + cornerRadius + 15, fish.positionY + fish.height / 2);
  //ctx.lineTo(x + width, y);
  // NOTICE lisätty puoli pyöreä takaosa
  // ctx.arcTo(fish.positionX + cornerRadius * 2 + 15, fish.positionY + fish.height, fish.positionX + cornerRadius * 3 + 15, fish.positionY + fish.height / 2, fish.height / 2);
  // ctx.arcTo(fish.positionX + cornerRadius * 3 + 15, fish.positionY, fish.positionX + cornerRadius * 2 + 15 , fish.positionY, fish.height / 2);
  ctx.arc(fish.positionX + cornerRadius + 15, fish.positionY, fish.height / 2, Math.PI * 1.5, Math.PI * 0.5, false);
  ctx.lineTo(fish.positionX + cornerRadius + 15, fish.positionY - fish.height / 2);
  ctx.closePath();
  ctx.fill();
  
  // Piirrä silmä
  ctx.fillStyle = "hotpink"; // Silmän väri
  ctx.beginPath();
  ctx.arc(
    fish.positionX + fish.eye.x,
    fish.positionY + fish.eye.y,
    fish.eye.radius,
    0,
    2 * Math.PI
  );
  ctx.fill();

  // Piirrä pupilli
  ctx.fillStyle = "black"; // Pupillin väri
  ctx.beginPath();
  ctx.arc(
    fish.positionX + fish.eye.x + fish.pupil.x,
    fish.positionY + fish.eye.y + fish.pupil.y,
    fish.pupil.radius,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function drawYellowFish(fish) {
  ctx.fillStyle = "yellow";
 
  // Pyrstö
  ctx.beginPath();
  ctx.arc(fish.positionX + fish.width, fish.positionY, fish.height / 2,  Math.PI / 2 , Math.PI + Math.PI / 2, false);
  ctx.closePath();
  ctx.fill();
  
  // Kala  
  // Lasketaan etäisyys keskeltä kärkeen
  const side = (fish.height / 2) / Math.cos(Math.PI / 6);
  // console.log(side); // Tulostaa etäisyyden keskeltä kärkeen    	

  const sideLength = (fish.height / 2) / Math.cos(Math.PI / 6);
  
  ctx.beginPath();
  ctx.moveTo(fish.positionX + sideLength / 2, fish.positionY - fish.height / 2);
  ctx.lineTo(fish.positionX + sideLength + sideLength / 2, fish.positionY - fish.height / 2);
  ctx.lineTo(fish.positionX + sideLength * 2, fish.positionY);
  ctx.lineTo(fish.positionX + sideLength + sideLength / 2, fish.positionY + fish.height / 2);
  ctx.lineTo(fish.positionX + sideLength / 2, fish.positionY + fish.height / 2);
  ctx.lineTo(fish.positionX, fish.positionY);
  
  ctx.closePath();
  ctx.fill();
  
  // Piirrä silmä
  ctx.fillStyle = "white"; // Silmän väri
  ctx.beginPath();
  ctx.arc(
    fish.positionX + fish.eye.x,
    fish.positionY + fish.eye.y,
    fish.eye.radius,
    0,
    2 * Math.PI
  );
  ctx.fill();

  // Piirrä pupilli
  ctx.fillStyle = "black"; // Pupillin väri
  ctx.beginPath();
  ctx.arc(
    fish.positionX + fish.eye.x + fish.pupil.x,
    fish.positionY + fish.eye.y + fish.pupil.y,
    fish.pupil.radius,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

// NOTICE "ctx" -parametri poistettu
function drawBubble(bubble) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(
    // bubble.positionX + (bubble.width / 4), // piirretään kupla hieman eteen sijainnista, osumisen parantamisen vuoksi 
    bubble.positionX,
    // bubble.positionY + bubble.height / 2, // NOTICE kupla siirretty korkeus suunnasssa (jotta törmäys voidaan laskea oikein)
    bubble.positionY,
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
