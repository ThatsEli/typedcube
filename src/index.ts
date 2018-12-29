import { Cube } from "./classes/Cube";

let x = new Cube('LURLULDLULUDURBDFFFBBDFRLUFUFLBDDBDRDFRFLLURFBBBDBRURR');

// while(true) {
// 	let c = new Cube();
// 	c.randomize();
// 	console.log(c.solve());
// 	console.log(c.getMoves().length);
// }

console.log(x.solve());
console.log(x.getMoves());