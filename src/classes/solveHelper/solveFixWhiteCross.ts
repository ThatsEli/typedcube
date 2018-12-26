import { Cube, Faces } from "../Cube";
import { upCrossCheck } from "../solveTester/UpCrossCheck";
import { logManager, LogLevel } from "../manager/logManager";
import { solveWhiteCross } from "./solveWhiteCross";

export function solveFixWhiteCross(cube: Cube): void {

	let helper = {
		getWrongCorner(): string {
			if(cube.faces[Faces.F].data[0][1] !== 'F') return 'F';
			if(cube.faces[Faces.L].data[0][1] !== 'L') return 'L';
			if(cube.faces[Faces.R].data[0][1] !== 'R') return 'R';
			if(cube.faces[Faces.B].data[0][1] !== 'B') return 'B';
			logManager.log('Error while fixing upper cross', LogLevel.error);
			process.exit(); return '';
		},

		fixWrongCorner() {
			let corner = helper.getWrongCorner();
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
			switch (desination) {
				case 'F': cube.move('F F'); break;
				case 'L': cube.move('D\' L L'); break;
				case 'R': cube.move('D R R'); break;
				case 'B': cube.move('D D B B'); break;
				default: logManager.log('Error while fixing upper cross', LogLevel.error); break;
			}
		}

	};

	let needToFix: boolean = false;

    while(!upCrossCheck(cube)) {
        logManager.log('Cross needs to be fixed', LogLevel.warning);
        helper.fixWrongCorner();
        solveWhiteCross(cube);
        needToFix = true;
    }

    if(needToFix) logManager.log('Fixed upper cross', LogLevel.success);

}
