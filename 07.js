"use strict";

import fs from "fs";

const input = fs.readFileSync("./07_01_input").toString().split(/\r?\n/);

const sizes = [];
const temparr = [];
let current = 0;

for (let line of input) {
  if (line === "$ cd ..") {
    sizes.push(current);
    current += temparr.pop();
  } else if (/[0-9]/.test(line[0])) {
    // When enountering a file'
    current += parseInt(line.match(/([0-9])\w+/)[0]);
  } else if (/(\$ cd )([a-z])+/.test(line)) {
    // When encountering a '$ cd (somedir)'
    temparr.push(current);
    current = 0;
  }
}
// Purge the dir info in the temp array
sizes.push(current);
for (let i in temparr) {
  current += temparr.pop();
  sizes.push(current);
}
sizes.sort((a, b) => b - a);

// Part One
let total = 0;
sizes.forEach((x) => {
  if (x <= 100000) total += x;
});
console.log(total);

// Part two
let big_enough = 0;
const cutoff = 8381165;
for (let x of sizes) {
  if (x < cutoff) break;
  big_enough = x;
}
console.log(big_enough);
