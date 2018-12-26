import { Cube } from "./classes/Cube";

let x = new Cube('RLUFUURBLUBFFRUBFBUDFUFDLRLFDUBDRRLDDLBULFDRDRBFRBLLDB');

while(true) {
	let c = new Cube();
	c.randomize();
	console.log(c.solve());
}

console.log(x.solve());
// console.log(x.getMoves());