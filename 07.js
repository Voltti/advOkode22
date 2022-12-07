"use strict";

import fs from "fs";

const input = fs.readFileSync("./07_01_input").toString().split(/\r?\n/);

const sizes = [];
const temparr = [];
let current = 0;

for (let line of input) {
  if (line === "$ cd ..") {
    // The current folder size is final, so store it and take back the stashed higher folder's size.
    sizes.push(current);
    current += temparr.pop();
  } else if (/[0-9]/.test(line[0])) {
    // See if the line starts with a number
    // Then the catch the number part and add to the current folder size.
    current += parseInt(line.match(/([0-9])\w+/)[0]);
  } else if (/(\$ cd )([a-z])+/.test(line)) {
    // See if the line starts with '$ cd (some chars)'
    // Then stash the current folder size and start a new.
    temparr.push(current);
    current = 0;
  }
}
// Purge the remaining sizes from the temp array, adding the lower folders' sizes to the higher ones along the way.
sizes.push(current);
for (let i in temparr) {
  current += temparr.pop();
  sizes.push(current);
}
sizes.sort((a, b) => b - a);

// Part One - Total of the folder that are at most 100000 in size.
let total = 0;
sizes.forEach((x) => {
  if (x <= 100000) total += x;
});
console.log(total);

// Part two - Smallest folder size below the cutoff point.
let big_enough = 0;
const cutoff = 8381165;
for (let x of sizes) {
  if (x < cutoff) break;
  big_enough = x;
}
console.log(big_enough);
