import { Cube } from "./classes/Cube";

// let c = new Cube('DLLFUBDRFULUURLLBDLDRRFLRFFDRUFDRBUBBUFBLUUDFBFLDBDRBR');

// let c = new Cube('FUFUUURUULRLBRLBLFBFBDFRUDDBFLFDBFRRLLDFLBDRRDBUDBLUDR');
// let c = new Cube('UUFUUULUFDRRLRFDDBUFLRFDFLBRFRDDRLBLBLFLLFBBDUBRDBBURD');
// let c = new Cube('UBRFUUDDLBRULRDDDUFRUUFUBFLDRBLDFLLLBURBLBDFRFRRLBDFBF');
// let c = new Cube();
// c.randomize();

while(true) {
	let c = new Cube();
	c.randomize();
	console.log(c.solve());
}

// console.log(c.solve());
// console.log(c.getMoves());