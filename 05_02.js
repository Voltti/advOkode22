"use strict";

import { open } from "node:fs/promises";

const file = await open("./05_01_input");
const data = await file.readFile();
const lines = data.toString().split(/\r?\n/); // Parse line changes
let setup;

// console.log(lines); // Logging

// Let's first find the point above where 'move' instructions begin
for (let i in lines) {
  if (lines[parseInt(i)] === "") {
    setup = parseInt(i);
    break;
  }
}
const stacks = [];
stacks.push(null); // Addind first null element, so the indexes of stacks align with the 'move' instructions
// Then create stacks, according to how many colums are created on the column number line.
for (let j = 0; j < lines[setup - 1].split("   ").length; j++) {
  stacks.push([]);
}
// We'll fill the stacks according to the specs, starting from the bottom row of the specs (above colum numbering).
// and row at a time move up.
for (let j = setup - 2; j >= 0; j--) {
  let index = 1;
  lines[j].split(/\s{4}|\s{1}/).forEach((element) => {
    // Parse stack elements, 1 space between items on rows, 4 spaces if there's an empty place on the row.
    if (!element == "") stacks[index].push(element); // Discard the 'empty items'
    index++;
  });
}
// console.log(stacks); // Logging

// Then well parse the instructions line at a time and execute it
for (let i = setup + 1; i < lines.length; i++) {
  if (lines[i] === "") break; // Added a break for a empty line because otherwise slice() throws an error.
  const line = lines[i].split(" ");

  // We'll take a slice (shift) of the source stack
  const shift = stacks[parseInt(line[3])].slice(
    stacks[parseInt(line[3])].length - parseInt(line[1]),
    stacks[parseInt(line[3])].length
  );

  for (
    let j = 0;
    j < shift.length;
    j++ // Move j amount at a time from line[3] to line[5]
  ) {
    // Then add to the destination in the order of the 'shift' slice and remove an item from the source
    stacks[parseInt(line[5])].push(shift[j]);
    stacks[parseInt(line[3])].pop();
  }
}

// Create result, which is pop to top most item from every stack.
let result = "";
for (let i = 1; i < stacks.length; i++) result = result + stacks[i].pop()[1];

console.log(result);
