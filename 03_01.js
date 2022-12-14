'use strict';

// import { open } from 'node:fs/promises';
import fs from 'fs';

// const file = await open('./03_01_test');
let file = fs.readFileSync('./03_01_input');
file = file.toString().split('\n');
const duplicates = [];
let priorities = 0;
for (let line of file) {
//for await (const line of file.readLines() ) { // Needs node > v18
	const comp1 = line.slice(0, line.length / 2).split("").sort( (a,b) => a.charCodeAt(0) - b.charCodeAt(0));
	const comp2 = line.slice(line.length / 2).split("").sort( (a,b) => a.charCodeAt(0) - b.charCodeAt(0));

	let counter1 = 0, counter2 = 0;
	
	while (counter1 < comp1.length && counter2 < comp2.length) {
		if (comp1[counter1] === comp2[counter2]) {
			duplicates.push(comp1[counter1])
			break;
		}
		if (comp1[counter1].charCodeAt(0) < comp2[counter2].charCodeAt(0))
			counter1++;
		else counter2++;

	}
}

for (let i of duplicates) {
	if (i.charCodeAt(0) <= 90) priorities += i.charCodeAt(0) - 65 + 27;
	else priorities += i.charCodeAt(0) - 96;
}
console.log(priorities);



