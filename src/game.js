/// *** Lisätty ChatGPT'n luomaa koodia
// var gameWidth = canvas.width;
// var gameHeight = canvas.height;
/// ***

const gameVersion = "v0.4.2"

/// *** Lisätty ChatGPT'n luomaa koodia
var movementInterval; // Muuttuja liikkeen päivitystä varten
/// ***

/// *** Lisätty ChatGPT'n luomaa koodia
let gameDifficulty = 0;

// Määritä enimmäiskalatilanne peliruudulla
// NOTICE const alkuliite muutettu, jotta pelin vaikeutumisen yhteydessä ruudussa olevien kalojen määrää voidaan lisätä
let maxFishCount = 5; // Esimerkki: Enimmillään ruudulla voi olla 5 kalaa samanaikaisesti
/// ***

/// *** Lisätty ChatGPT'n luomaa koodia
var gameOver = false; // Alustetaan peli lopetetuksi
/// ***

/// *** Lisätty ChatGPT'n luomaa koodia
var score = 0; // Alustetaan pistemäärä nollaksi
/// ***

// NOTICE lisätty muuttuja, johon ChatGPT on viitannut luomassaan koodissa
normalSpeed = 1

// *** Lisätty ChatGPT'n luomaa koodia
// Alkuperäinen pelaajan kalan position arvo
var initialPlayerPosition = 150;
// ***

// *** Lisätty ChatGPT'n luomaa koodia
var fishCount = 0; // Alustetaan generoitujen kalojen määrä nollaksi
// ***

// Pelaajan kalan tiedot
var playerFish = {
  id: 1,
  // NOTICE lisätty muuttuja ChatGPT'n muuttuja viittauksen pohjalta 
  positionX: 40, // NOTICE arvoa muutettu, ettei kala ole pelialueen reunassa kiinni
  positionY: initialPlayerPosition, //
  position: 30,
  level: 1,
  color: "orange",
  // NOTICE nopeus arvo muutettu takaisin alkuperäiseen kuosiinsa (Viimeisin keskustelu, versio v0.2.1)
  speed: normalSpeed,
  width: 50, // Kalan leveys
  height: 30, // Kalan korkeus
};

// Luo uuden kalalistan, johon lisätään muut kalaobjektit
var fishList = [];

// NOTICE funktio lisätty ChatGPT'n viittauksen perusteella
function getVersion() {
	return gameVersion
}

// *** Lisätty ChatGPT'n luomaa koodia
// Aloita peli
function startGame() {
  // NOTICE Muuttujat on säästetty funktion edellisestä versiosta
  fishList = [];
  score = 0;
  
  // *** Lisätty ChatGPT'n luomaa koodia
  fishCount = 0; // Nollaa generoitujen kalojen määrä
  // ***
  
  // NOTICE lisätty nollauksia
  gameDifficulty = 0;
  maxFishCount = 5;
  normalSpeed = 1;
  
  // *** Lisätty ChatGPT'n luomaa koodia
  // Palauta pelaajan kalan position alkuperäiseen arvoon
  playerFish.positionY = initialPlayerPosition;
  // ***
  
  // *** Lisätty ChatGPT'n luomaa koodia
  // Päivitä pistemäärän näyttö
  document.getElementById("score-display").textContent = score;
  // ***
  
  canvas.removeEventListener("click", startGame);
  gameOver = false;
  updateGame();
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
function getRandomColor() {
  const colors = ["red", "yellow", "blue"];
  // NOTICE arvonnan todennäköisyyksiä muutettu
  const probabilities = [0.45, 0.45, 0.1]; // Punainen 40%, keltainen 40%, sininen 20%

  // Arvotaan satunnainen indeksi painotetulla todennäköisyydellä
  const random = Math.random();
  let cumulativeProbability = 0;
  for (let i = 0; i < colors.length; i++) {
    cumulativeProbability += probabilities[i];
    if (random < cumulativeProbability) {
      return colors[i];
    }
  }

  return colors[0]; // Oletusarvo punainen, jos jotain menee pieleen
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
// NOTICE yhdistelty aikaisemmista versioista sopivammaksi
function generateFish() {
  // NOTICE arvoja muutettu
  let width = 40; // Aseta kalan leveys
  let height = 20; // Aseta kalan korkeus

  // const colors = ["red", "yellow"];
  // const color = colors[Math.floor(Math.random() * colors.length)];
  const color = getRandomColor();
  
  // NOTICE Satunnaisen nopeamman kalan arpomista muuteettu
  let speed = Math.random() < 0.12 ? 1.5 : 1;
  
  // *** Lisätty ChatGPT'n luomaa koodia
  if (color === "blue") {
    // Kuplia esiintyy harvemmin
	// Notice arvoja muutettu
    speed = Math.random() < 0.08 ? .8 : 1;

    // Sinisille kaloille pienempi koko
    width = 40;
    height = 40;
  } else if (color === "red") {
    // Punaisille kaloille suurempi koko
    width = 56;
    height = 36;
  }
  
  const positionX = gameWidth;
  //NOTICE Arvontaa muutettu kalan piirron muutoksen vuoksi + sijanti tiedot siirretty myöhemmälle kalojen vaihtelevan koon vuoksi
  const positionY = Math.floor(Math.random() * (gameHeight - height)); // Satunnainen korkeus (20-260); // Arvo satunnainen sijainti pystysuunnassa

  // ***
  
  const fish = {
	// DEBUG pidetään toistaiseksi kalan ominaisuutena  
	level: Math.floor(Math.random() * playerFish.level) + 1, // Satunnainen taso (1-pelaajan taso)
    	
	// NOTICE Säästetty aikaisempi versio
    id: fishCount + 2, // Lisää 2 id:hen, jotta huomioi pelaajan kalan
    positionX,
    positionY,
    width,
    height,
    color,
    speed,
  };

  // Lisää uusi kalaobjekti kalalistaan
  fishList.push(fish);
  
  // *** Lisätty ChatGPT'n luomaa koodia
  // fishList.push(fish);
  fishCount++; // Kasvata generoitujen kalojen määrää yhdellä
  // ***
  
  // *** Lisätty ChatGPT'n luomaa koodia
  // Päivitä pelin vaikeustaso, kun kaloja on generoitu 25 lisää
  if (fishCount % 25 === 0) {
    updateGameDifficulty();
  }
  // ***
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
// Määritä pistemäärärajat eri vaikeustasoille
const difficultyThresholds = {
  1: 10, // Esimerkki: 10 pistettä vaaditaan vaikeustason 1 saavuttamiseen
  2: 25, // Esimerkki: 20 pistettä vaaditaan vaikeustason 2 saavuttamiseen
  3: 40  // Esimerkki: 30 pistettä vaaditaan vaikeustason 3 saavuttamiseen
};

// Päivitä pelin vaikeustaso ja pelinopeus pelaajan pisteiden perusteella
function updateGameDifficulty(score) {
  // Tarkista, onko saavutettu uusi vaikeustaso
  for (const difficultyLevel in difficultyThresholds) {
    if (score >= difficultyThresholds[difficultyLevel] && difficultyLevel > gameDifficulty) {
      // Päivitä vaikeustaso ja pelinopeus
	  // NOTICE muuteettu nostamaan vaikeus tasoa
      gameDifficulty += 1 // = parseInt(difficultyLevel);
      normalSpeed += 0.5; // Esimerkki: Kasvata pelinopeutta 0.5 yksikköä uutta vaikeustasoa kohti
      console.log(`Uusi vaikeustaso: ${gameDifficulty}`);
      break; // Poistu silmukasta, kun ensimmäinen uusi vaikeustaso on löytynyt
    }
  }
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
function checkCollision(playerFish, fish) {	
  // Tarkista, osuvatko kalojen rajat toisiinsa
  // NOTICE törmäys tarkastusta hienosäädetty
  if (
    playerFish.positionX < fish.positionX + fish.width &&
    playerFish.positionX + playerFish.width > fish.positionX &&
    playerFish.positionY < fish.positionY + fish.height  &&
    playerFish.positionY + playerFish.height > fish.positionY
  ) {
    return true; // Osuvat yhteen
  }

  return false; // Eivät osu yhteen
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
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

// Pelin päätyttyä tarkista tulosennätys
// NOTICE funktion nimi muutettu sekannuksen välttämiseksi
function updateGameOver() {
  // NOTICE funktio kutsu muutettu muuttuja kutsuksi	
  const finalScore = score; // Oletetaan, että game.js-tiedostossa on metodi getScore() palauttamaan pelaajan pisteet
  const highScore = checkHighScore(finalScore);
  saveHighScore(highScore);
  updateHighScoreElement();
  // Muut pelin lopettamiseen liittyvät toimenpiteet...
}
// ***

// Päivittää pelitapahtumat ja liikuttaa kaloja
function updateGame() {
  // Päivitä muut kalaobjektit
  for (var i = 0; i < fishList.length; i++) {
    var fish = fishList[i];
	// NOTICE Kalan "fish.level" ominaisuus vaihdettu pelin perus nopeuteen "normalSpeed"
	fish.positionX -= normalSpeed * fish.speed * 2;
	
	// *** Lisätty ChatGPT'n luomaa koodia
	// Tarkista, onko kala edennyt pelialueen reunan ohi
    if (fish.positionX < -fish.width) {
      // Poista kala listalta
      fishList.splice(i, 1);
	}
	// ***
	
	// Tarkista, osuuko pelaajan kala muihin kaloihin
	// NOTICE alkuperäinen törmäys tarkastus vaihdettu funktio kutsuun
    if (checkCollision(playerFish, fish)) {
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
        var fishIndex = fishList.indexOf(fish);
        if (fishIndex !== -1) {
          fishList.splice(fishIndex, 1);
        }
	  // ***
	  // ***
	  
	  // *** Lisätty ChatGPT'n luomaa koodia
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
  }
  
  // NOTICE funktio kutsu lisätty
  renderGame(fishList, playerFish)
  
  // *** Lisätty ChatGPT'n luoma koodia
  // NOTICE muuttuja viittausta muokattu vastaamaan aiempaa koodia
  updateGameDifficulty(score);
  // ***

  // Generoi uusi kala satunnaisesti
  // NOTICE generointi tiheyttä muutettu
  if (Math.random() < 0.013) { // Voit säätää generointitiheyttä muuttamalla lukua
	//  && fishList.length < maxFishCount ChatGPT'n luomaa ominaisuutta ei vielä lisätty
    generateFish();
  }
  /// ***
  // Tarkista, onko peli päättynyt
  if (!gameOver) {
    requestAnimationFrame(updateGame);
  } else {
	// NOTICE drawGameOver metodin paikkaa muutettu
	drawGameOver(); 
	updateGameOver()
  }
  // ***
}

// *** Lisätty ChatGPT'n luomaa koodia
function startMoving(direction) {
  // Tarkista, että liike ei ole jo käynnissä
  if (!movementInterval) {
    movementInterval = setInterval(function () {
      // Päivitä pelaajan kalan sijaintia haluttuun suuntaan
      updatePlayerFishPosition(direction);
    }, 10); // Päivitä liike pienellä aikavälillä (esim. 10 ms)
  }
}

function stopMoving() {
  // Pysäytä liike ja tyhjennä interval-muuttuja
  clearInterval(movementInterval);
  movementInterval = null;
}

document.addEventListener("keydown", function (event) {
  // Tarkista, minkä nuolinäppäimen tapahtuma laukaisi
  switch (event.keyCode) {
    case 38: // Nuolinäppäin ylös
      startMoving("up");
      break;
    case 40: // Nuolinäppäin alas
      startMoving("down");
      break;
  }
});

document.addEventListener("keyup", function (event) {
  // Tarkista, minkä nuolinäppäimen tapahtuma laukaisi
  switch (event.keyCode) {
    case 38: // Nuolinäppäin ylös
    case 40: // Nuolinäppäin alas
      stopMoving();
      break;
  }
});

// NOTICE Muutettu "playerFish.position" viittaus muotoon "playerFish.positionY" 
function updatePlayerFishPosition(direction) {
  // Päivitä pelaajan kalan sijaintia haluttuun suuntaan
  if (direction === "up") {
    playerFish.positionY -= playerFish.speed;
  } else if (direction === "down") {
    playerFish.positionY += playerFish.speed;
  }

  // Varmista, että pelaajan kala pysyy pelialueella
  // NOTICE pelaajan kalan liikettä säädetty piirrossa tehdyn muutoksen vuoksi
  if (playerFish.positionY < 1) {
    playerFish.positionY = 1;
  } else if (playerFish.positionY > gameHeight - playerFish.height) {
    playerFish.positionY = gameHeight - playerFish.height;
  }
}
// ***

// *** Lisätty ChatGPT'n luomaa koodia
// Kutsu drawGameOver-funktiota pelin alussa
// NOTICE "updateHighScore" -funktio kutsu lisätty
updateHighScoreElement()
drawStartGame();
// ***