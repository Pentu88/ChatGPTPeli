// Pelaajan kalan tiedot
var playerFish = {
  id: 1,
  position: 150,
  level: 1
};

// Luo uuden kalalistan, johon lisätään muut kalaobjektit
var fishList = [];

// Lisää uusi kalaobjekti kalalistaan
function addFish(id, position, level) {
  var fish = {
    id: id,
    position: position,
    level: level
  };
  fishList.push(fish);
}

// Lisää aluksi joitakin kaloja peliin
addFish(2, 400, 1);
addFish(3, 400, 2);
addFish(4, 400, 3);

// Päivittää pelitapahtumat ja liikuttaa kaloja
function updateGame() {
  // Päivitä pelaajan kalaa
  var playerFishElement = document.getElementById("player-fish");
  playerFishElement.style.top = playerFish.position + "px";

  // Päivitä muut kalaobjektit
  for (var i = 0; i < fishList.length; i++) {
    var fish = fishList[i];
    fish.position -= fish.level * 2; // Muuta kalan liikkumisnopeutta muuttamalla kerrointa

    // Tarkista, osuuko pelaajan kala muihin kaloihin
    if (fish.position <= 60 && fish.position >= 20 && fish.level <= playerFish.level) {
      console.log("Pelaajan kala osui kalaan " + fish.id + "!");
      // Tässä voit toteuttaa tarvittavat toimenpiteet, kun kalat osuvat yhteen
    }

    // Luo kalaelementti ja aseta sen sijainti
    var fishElement = document.getElementById("fish-" + fish.id);
    if (!fishElement) {
      fishElement = document.createElement("div");
      fishElement.className = "fish";
      fishElement.id = "fish-" + fish.id;
      document.getElementById("game-container").appendChild(fishElement);
    }
    fishElement.style.right = fish.position + "px";
  }

  // Kutsu updateGame-funktiota uudelleen päivittämään peli
  requestAnimationFrame(updateGame);
}

// Aloita peli
updateGame();
