// Pelaajan kalan tiedot
var playerFish = {
  id: 1,
  position: 150,
  level: 1,
  color: "orange"
};

// Luo uuden kalalistan, johon lisätään muut kalaobjektit
var fishList = [];

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
    if (fish.position <= 60 && fish.position >= 20 && fish.level <= playerFish.level) {
      console.log("Pelaajan kala osui kalaan " + fish.id + "!");
      // Tässä voit toteuttaa tarvittavat toimenpiteet, kun kalat osuvat yhteen
    }

    // Piirrä kala
    ctx.fillStyle = fish.color;
	// NOTICE kalan kokoa muutettu
    ctx.fillRect(canvas.width - fish.position, fish.height, 50, 30);
  }

  // Generoi uusi kala satunnaisesti
  if (Math.random() < 0.02) { // Voit säätää generointitiheyttä muuttamalla lukua
    generateFish();
  }

  // Kutsu updateGame-funktiota uudelleen päivittämään peli
  requestAnimationFrame(updateGame);
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

// Aloita peli
updateGame();
