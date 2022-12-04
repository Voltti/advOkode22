'use strict';

import fs from 'fs';

let file = fs.readFileSync('./03_01_input');
let lines = file.toString().split('\n');
const badges = [];
let priorities = 0;
function bag(index, content) {
	this.index = index;
	this.length = content.length;
	this.content = content;
	this.item = () => this.content[this.index];
	this.value = () => this.content[this.index].charCodeAt(0);
}
for (let i = 0; i < lines.length; i += 3) {
if (lines[i] == undefined || lines[i+1] == undefined || lines[i+2] == undefined) continue;
	const list = [];

	list.push(new bag(0,lines[i].split("").sort( (a,b) => a.charCodeAt(0) - b.charCodeAt(0))));
	list.push(new bag(0,lines[i+1].split("").sort( (a,b) => a.charCodeAt(0) - b.charCodeAt(0))));
	list.push(new bag(0,lines[i+2].split("").sort( (a,b) => a.charCodeAt(0) - b.charCodeAt(0))));
	list.sort( (a,b) => a.value() - b.value());
	
	while (list[0].index < list[0].length && list[1].index < list[1].length && list[2].index < list[2].length) {
		// console.log("----------\n", list[0].index, list[0].value(), list[0].item, "\n", list[1].index, list[1].value(),list[1].item, "\n", list[2].index, list[2].value(), list[2].item); // Logging

		if (list[0].value() === list[1].value() && list[1].value() === list[2].value() ) {
			// console.log("BINGO! ", list[0].item()); // Logging
			badges.push(list[0].item())
			break;
		}
		else while ((list[0].value() < list[1].value() || list[0].value() < list[2].value()) && list[0].index < list[0].length) {
			list[0].index++;
		}
		list.sort( (a,b) => a.value() - b.value());
	}	
}
for (let i of badges) {
	if (i.charCodeAt(0) <= 90) priorities += i.charCodeAt(0) - 65 + 27;
	else priorities += i.charCodeAt(0) - 96;
}
console.log(priorities);

