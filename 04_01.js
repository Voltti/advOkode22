'use strict'

import fs from 'fs';

const input = fs.readFileSync('./04_01_input').toString().split("\n");
let conts = 0;

for (let line of input) {
	let id = line.split("-").join(",").split(",");
	for (let i in id) id[i] = parseInt(id[i]);
	
	// console.log(id); // Logging

	if ((id[0] >= id[2] && id[1] <= id[3]) || (id[0] <= id[2] && id[1] >= id[3])) {
		conts++;
		// console.log("^ HIT ^"); // Logging
	}
}

console.log(conts);
