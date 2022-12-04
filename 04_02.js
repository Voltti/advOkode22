'use strict'

import fs from 'fs';

const input = fs.readFileSync('./04_01_input').toString().split("\n");
let overlap = 0;

for (let line of input) {
	let id = line.split("-").join(",").split(",");
	for (let i in id) id[i] = parseInt(id[i]);
	if (isNaN(id[0])) break;
	
	// console.log(id); // Logging

	if (id[0] > id[3] || id[1] < id[2]) {
		// console.log(0); Logging
		continue;
	}
	else overlap++;
	
	// console.log(Math.min(id[1], id[3]) - Math.max(id[0], id[2]) + 1); // Logging
	// overlap += Math.min(id[1], id[3]) - Math.max(id[0], id[2]) + 1; // Accidentally tried to count how much total overlap over all pairs.
		
		// console.log("^ HIT ^"); // Logging
	
}

console.log(overlap);
