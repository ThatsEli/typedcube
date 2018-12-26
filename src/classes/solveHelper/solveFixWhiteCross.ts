import { Cube, Faces } from "../Cube";
import { upCrossCheck } from "../solveTester/UpCrossCheck";
import { logManager } from "../manager/logManager";

export function solveFixWhiteCross(cube: Cube): void {

	let helper = {
		getWrongCorner(): string {
			if(cube.faces[Faces.F].data[0][1] !== 'F') return 'F';
			if(cube.faces[Faces.L].data[0][1] !== 'L') return 'L';
			if(cube.faces[Faces.R].data[0][1] !== 'R') return 'R';
			if(cube.faces[Faces.B].data[0][1] !== 'B') return 'B';
			console.log('Error while fixing upper cross, exiting...');
			process.exit(); return '';
		},

		fixWrongCorner() {
			let corner = helper.getWrongCorner();
			console.log(corner);
			switch (corner) {
				case 'F': cube.move('F F'); break;
				case 'L': cube.move('L L D'); break;
				case 'R': cube.move('R R D\''); break;
				case 'B': cube.move('B B D D'); break;
			}
			helper.fixPositionedCorner();
		},

		fixPositionedCorner(): void {
			let desination = cube.faces[Faces.F].data[2][1];
			console.log(desination);
			switch (desination) {
				case 'F': cube.move('F F'); break;
				case 'L': cube.move('D\' L L'); break;
				case 'R': cube.move('D R R'); break;
				case 'B': cube.move('D D B B'); break;
				default: console.log('Error while fixing the upper cross.'); break;
			}
		}

	};

	let needToFix: boolean = false;

    while(!upCrossCheck(cube)) {
        logManager.log('Cross needs to be fixed...');
        helper.fixWrongCorner();
        needToFix = true;
    }

    if(needToFix) logManager.log('Fixed upper cross.');

}
