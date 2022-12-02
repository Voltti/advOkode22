"use strict";
import { open } from "node:fs/promises";

const file = await open("./02_01_input.txt");
let pisteet = 0;
const trans = (x) => x.charCodeAt(2) - 89;

for await (const line of file.readLines()) {
  const p1 = line.charCodeAt(0) - 64; // Vastustaja
  const p2 = ((trans(line) + p1 + 2) % 3) + 1; // Pelaaja

  if (p1 - p2 === 0) pisteet += p2 + 3;
  else if (p1 - p2 === -1 || p1 - p2 === 2) pisteet += p2 + 6;
  else pisteet += p2;
}

console.log(pisteet);
