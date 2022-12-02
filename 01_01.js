// Molemmat tehtävät samassa:

"use strict";

import fs from "fs";

const input = fs
  .readFileSync("./01_01_input.txt", { encode: "utf8" })
  .toString()
  .split("\n"); // Tehdään array rivivaihtojen perusteella

let summa = undefined;
let lista = [];
for (let i in input) {
  const line = parseInt(input[i]);
  //   console.log(line);
  if (isNaN(line) && summa === undefined) continue; //skipataan jos tulee ns. peräkkäisiä rivinvaihtoja
  if (isNaN(line)) {
    //ns. nollataan tilanne, kun tulee rivivaihto
    lista.push(summa);
    summa = undefined;
  } else if (summa === undefined) summa = line;
  else summa += line; // lisätään summaan ko. rivi (huomioidaan undefined tilanne);
}

lista.sort((a, b) => b - a);

// Vastaus 1. kohtaan:
console.log(lista[0]);

// Vastaus 2. kohtaan:
console.log(lista.slice(0, 3).reduce((a, b) => a + b));
