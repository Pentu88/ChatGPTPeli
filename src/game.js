/// *** Lisätty ChatGPT'n luomaa koodia
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
/// ***

/// *** Lisätty ChatGPT'n luomaa koodia
var gameOver = false; // Alustetaan peli lopetetuksi
/// ***

/// *** Lisätty ChatGPT'n luomaa koodia
var score = 0; // Alustetaan pistemäärä nollaksi
/// ***

// Pelaajan kalan tiedot
var playerFish = {
  id: 1,
  position: 150,
  level: 1,
  color: "orange"
};

// Luo uuden kalalistan, johon lisätään muut kalaobjektit
var fishList = [];

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

  ctx.globalAlpha = 0.2; // Aseta läpinäkyvyys
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
// Aloita peli
function startGame() {
  // NOTICE Muuttujat on säästetty funktion edellisestä versiosta
  fishList = [];
  score = 0;
  
  canvas.removeEventListener("click", startGame);
  gameOver = false;
  updateGame();
}
// ***

// Generoi uusi kalaobjekti satunnaisella korkeudella, tasolla, värillä ja nopeudella
function generateFish() {
  var id = fishList.length + 2; // Generoidaan uniikki ID
  // NOTICE kalan aloitus kohtaa muutettu
  var position = 0; // Kala alkaa liikkua pelialueen oikeasta reunasta
  var height = Math.floor(Math.random() * 240) + 20; // Satunnainen korkeus (20-260)
  var level = Math.floor(Math.random() * playerFish.level) + 1; // Satunnainen taso (1-pelaajan taso)
  var color = Math.random() < 0.5 ? "red" : "yellow"; // Satunnainen väri (punainen tai keltainen)
  // NOTICE satunnaisen nopeamman kalan arpomista muuteettu
  var speed = Math.random() < 0.15 ? 1.5 : 1; // Satunnainen nopeus (2 tai 1)
  addFish(id, position, height, level, color, speed);
}

// Lisää uusi kalaobjekti kalalistaan
function addFish(id, position, height, level, color, speed) {
  var fish = {
    id: id,
    position: position,
    height: height,
    level: level,
    color: color,
    speed: speed
  };
  fishList.push(fish);
}

// Alusta Canvas-elementti
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

// Päivittää pelitapahtumat ja liikuttaa kaloja
function updateGame() {
  // Tyhjennä canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Päivitä pelaajan kalaa
  ctx.fillStyle = playerFish.color;
  // NOTICE kalan kokoa muutettu
  ctx.fillRect(0, playerFish.position, 50, 30);

  // Päivitä muut kalaobjektit
  for (var i = 0; i < fishList.length; i++) {
    var fish = fishList[i];
	// NOTICE kalan kulkusuuntaa muutettu.
    fish.position += fish.level * fish.speed * 2; // Muuta kalan liikkumisnopeutta muuttamalla kerrointa

    // Tarkista, osuuko pelaajan kala muihin kaloihin
    /* if (fish.position <= 60 && fish.position >= 20 && fish.level <= playerFish.level) {
      console.log("Pelaajan kala osui kalaan " + fish.id + "!");
      // Tässä voit toteuttaa tarvittavat toimenpiteet, kun kalat osuvat yhteen
    } */
	
	// Tarkista, osuuko pelaajan kala muihin kaloihin
    if (
      // NOTICE arvoja säädetty jotta tunnistetaan osuminen paremmin, mikäli ns. kalojen päät ovat ohittaneet toisensa, kumpikaan kala ei syö toista.
      fish.position <= 560 && // Kala on pelaajan kalan lähellä vaakasuunnassa
      fish.position >= 550 && // Kala on pelaajan kalan lähellä vaakasuunnassa
      fish.height <= playerFish.position + 30 && // Kala on pelaajan kalan korkeuden alueella
      fish.height + 30 >= playerFish.position && // Kala on pelaajan kalan korkeuden alueella
      fish.level <= playerFish.level // Kala on pelaajan tasoa pienempi tai yhtä suuri
    ) {
      console.log("Pelaajan kala osui kalaan " + fish.id + "!");
      // Tässä voit toteuttaa tarvittavat toimenpiteet, kun kalat osuvat yhteen
	  // *** Lisätty ChatGPT'n luomaa koodia
	  if (fish.color === "red") {
		
		// *** Lisätty ChatGPT'n luomaa koodia
		console.log("Peli päättyi! Punainen kala osui pelaajan kalaa.");
		gameOver = true;
		// NOTICE drawGameOver suorittaminen siirretty myöhemmäksi, jotta kaloja ei piirretä lopetus ruudun päälle
		// drawGameOver();
		// ***
		
		// *** Lisätty ChatGPT'n luomaa koodia
      } else if (fish.color === "yellow") {
        console.log("Pelaaja sai pisteen!");
        score++; // Lisätään pistemäärään yksi
		
		// *** Lisättiin ChatGPT'n luomaa koodia
		// Poista kala fishList-listalta
		// TODO poistettavan kalan lähdettä muutettu
        var fishIndex = fishList.indexOf(fish);
        if (fishIndex !== -1) {
          fishList.splice(fishIndex, 1);
        }
	  // ***
	  // ***
	  
	  // *** Lisätty ChatGPT'n luomaa koodia
	  // TODO Myöhempä käyttöä varten
      } else if (fish.color === "blue") {
        console.log("Pelaaja sai kolme pistettä kuplasta!");
        score += 3; // Lisätään pistemäärään kolme

        // Poista kupla fishList-listalta
        var fishIndex = fishList.indexOf(fish);
        if (fishIndex !== -1) {
          fishList.splice(fishIndex, 1);
        }
      } else {
        // Tässä voit toteuttaa toimenpiteet, kun kalat osuvat yhteen, mutta kala ei ole punainen.
	  }
	  // ***
	  
	  // *** Lisätty ChatGPT'n luomaa koodia
	  // Päivitä pistemäärän näyttö
	  document.getElementById("score-display").textContent = score;
	  // ***
    }

    // Piirrä kala
    ctx.fillStyle = fish.color;
	// NOTICE kalan kokoa muutettu
    ctx.fillRect(canvas.width - fish.position, fish.height, 50, 30);
  }

  // Generoi uusi kala satunnaisesti
  // NOTICE generointi tiheyttä muutettu
  if (Math.random() < 0.013) { // Voit säätää generointitiheyttä muuttamalla lukua
    generateFish();
  }

  // Kutsu updateGame-funktiota uudelleen päivittämään peli
  // *X* requestAnimationFrame(updateGame);
  /// ***
  // Tarkista, onko peli päättynyt
  if (!gameOver) {
    requestAnimationFrame(updateGame);
  } else {
	// NOTICE drawGameOver metodin paikkaa muutettu
	drawGameOver(); 
  }
  // ***
}

// Liikuta pelaajan kalaa pystysuunnassa
function movePlayerFish(event) {
  var keyCode = event.keyCode;
  if (keyCode === 38) { // Ylöspäin
    playerFish.position -= 10;
  } else if (keyCode === 40) { // Alaspäin
    playerFish.position += 10;
  }
}

// Kuuntele nuolinäppäimiä pelaajan kalan liikuttamiseksi
document.addEventListener("keydown", movePlayerFish);

// *** Lisätty ChatGPT'n luomaa koodia
// Kutsu drawGameOver-funktiota pelin alussa
drawStartGame();
// ***