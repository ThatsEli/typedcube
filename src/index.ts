import { Cube } from "./classes/Cube";

let c = new Cube('RUFFULURFLBRURDDBDLUUBFLDLLLFBBDDBDRBDBRLUURFUFDRBFFLR');

while(true) {
	let c = new Cube();
	c.randomize();
	console.log(c.solve());
}

console.log(c.solve());
// console.log(c.getMoves());