# Kalapeli

## 0.4.1

### Bugeja korjattu
- muuttujien nollaus ennen uutta peliä (normalSpeed, gameDifficulty, maxFishCount)

## [v0.4.0](https://github.com/Pentu88/ChatGPTPeli/tree/9e9f60e91f2db1be53e98e16a00bb0a194732f4b)

### Uusia ominaisuuksia
- Peli alkaa vaikeutua pelin kulun myötä
- Ruudusta pois uineet kalat poistetaan pelistä, eivätkä ne päivity enää turhaan
- Pelialueelle lisätty hiekka pohja
- Ruutuun lisätty tieto pelin versiosta
- Ennätyksen seuranta

## [v0.3.0](https://github.com/Pentu88/ChatGPTPeli/tree/61072c4023107518d30854019b1af42918fa7571)

### Uusia ominaisuuksia
- Uusi elementti, kuplat
- Kalojen kokoja muutettu

### Muutoksia
- Kalojen arvonnasta vastaava "generateFish" -funktio uudistettu
- Kalojen törmäyksen tarkistus uudistettu
- Kalojen värin arvonnasta vastaava koodi siirretty "getRandomColor" -funktion vastuulle
- Piirtäminen siirretty kokonaisuudessaan "render.js"'n vastuulle

### Poistettu
- Vanhaa kommentteihin piilotettua koodia

### Bugeja korjattu
- Pelaajan ohjaaaman kala hahmon liikkuvuutta parannettu

## [v0.2.1](https://github.com/Pentu88/ChatGPTPeli/tree/897639ee4d0f9da9425443b69f6c022864ecf858)

### Bugeja korjattu
- Pelin suoritusta ei aloiteta sivun päivittämisen yhteydessä. 
- Peliin lisätty "game over" -näkymä
- Kalojen määrän laskentaa korjattu
- Kalan ohjausta korjattu jouhevammaksi

## [v0.2.0](https://github.com/Pentu88/ChatGPTPeli/tree/cdb9ff904b597dce4161118cc1ff1b85fa4904b6)

### Uusia ominaisuuksia
- Peliin lisätty erivärisiä kaloja
- Pisteiden keräys ja esittäminen pelaajalle
- pelin päättyminen

### Bugeja korjattu
- Kalojen kulku suuntaa vaihdettu
- Pelaajan ohjaaman kala hahmon siirtäminen korjattu
- Reagoidaan jos kala osuu pelaajan ohjaamaan kala hahmoon

## [v0.1.0](https://github.com/Pentu88/ChatGPTPeli/tree/17f92c913d44805d12e8e561cf1be9e173fab6e2)
- Ensimmäinen raaka versio pelistä
