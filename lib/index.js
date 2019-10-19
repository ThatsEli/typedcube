"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("./classes/Cube");
var x = new Cube_1.Cube('LURLULDLULUDURBDFFFBBDFRLUFUFLBDDBDRDFRFLLURFBBBDBRURR');
// while(true) {
// 	let c = new Cube();
// 	c.randomize();
// 	console.log(c.solve());
// 	console.log(c.getMoves().length);
// }
console.log(x.solve());
console.log(x.getMoves());
