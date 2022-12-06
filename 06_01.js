'use strict';

import fs from 'fs';

const data = fs.readFileSync('./06_01_input', 'utf-8').toString().split("\n");

// Function to find a sequence of unique characters with lenght of 'seq_lenght';

function findSequence(data, seq_length) {
	
	for (let stream of data) {
		if (stream === '') break; // Deals with an empty line
		let head = 0;
		let tail = 0;
		const seq = new Set();

		// console.log("Start stream",head < stream.length && head - tail < 4, parseInt(stream.length), stream.length); // Logging

		// Size of desired sequence
		while ( seq.size < seq_length ) {

			// When the character in position 'head' not already in the set
			if (!seq.has(stream[head])) {
				seq.add(stream[head]);
				head++;
			}
			else {
				// Move the 'tail' position past the duplicate character and remove the characters along the way from the set
			 	while (stream[tail] !== stream[head]) {
					seq.delete(stream[tail]);
					tail++;
				}
				tail++;
				head++;
			}

		}	
		return head;
	}
}

console.log(findSequence(data, 4));
console.log(findSequence(data, 14));
