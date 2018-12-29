import { Cube, Faces } from "../classes/Cube";
import { logManager, LogLevel } from "../manager/logManager";
import { thirdLayerSolved } from "../solveTester/thirdLayerSolved";

export function solveThirdLayer(cube: Cube) {

	let helper = {

		getThirdLayer: (face: Faces): Array<string> => {
			return cube.faces[face].data[2];
		},

		positionDownFace: (): void => {
			while(helper.getThirdLayer(Faces.B)[1] !== 'B') {
				cube.move('D');
			}
			if(
				helper.getThirdLayer(Faces.L)[1] === 'L' &&
				helper.getThirdLayer(Faces.F)[1] === 'F' &&
				helper.getThirdLayer(Faces.R)[1] === 'R'
			) {
				return;
			}
			if(
				helper.getThirdLayer(Faces.L)[1] === 'L' && helper.getThirdLayer(Faces.R)[1] === 'R'
			) {
				cube.move('D');
				cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\''); // L R R L
				helper.positionDownFace();
			}
			if(
				helper.getThirdLayer(Faces.F)[1] === 'F' && helper.getThirdLayer(Faces.B)[1] === 'B'
			) {
				cube.move('D');
				cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\''); // L R R L
				helper.positionDownFace();
			}
			if(
				helper.getThirdLayer(Faces.R)[1] === 'R' && helper.getThirdLayer(Faces.B)[1] === 'B'
			) {
				cube.move('D\'');
				cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\''); // L R R L
				helper.positionDownFace();
			}
			if(
				helper.getThirdLayer(Faces.L)[1] === 'L' && helper.getThirdLayer(Faces.B)[1] === 'B'
			) {
				cube.move('D');
				cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\''); // L R R L
				helper.positionDownFace();
			}
		},

		positionEdges: (): void => {
			helper.positionDownFace();

			while(!(helper.getThirdLayer(Faces.L)[1] === 'L' && helper.getThirdLayer(Faces.F)[1] === 'F' && helper.getThirdLayer(Faces.R)[1] === 'R' && helper.getThirdLayer(Faces.B)[1] === 'B')) {
				cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\'');
			}

			if(!(helper.getThirdLayer(Faces.L)[1] === 'L' && helper.getThirdLayer(Faces.F)[1] === 'F' && helper.getThirdLayer(Faces.R)[1] === 'R' && helper.getThirdLayer(Faces.B)[1] === 'B')) {
				logManager.log('Error while positioning edges for third layer', LogLevel.error);
			}
		},

		positionFirstCorner: (): void => {
			if(helper.getThirdLayer(Faces.F)[0] === 'F' && helper.getThirdLayer(Faces.L)[2] === 'L') {
				while(!thirdLayerSolved(cube)) { cube.move('R F\' R B B R\' F R B B R R'); }
				return;
			}
			if(helper.getThirdLayer(Faces.F)[2] === 'F' && helper.getThirdLayer(Faces.R)[0] === 'R') {
				while(!thirdLayerSolved(cube)) { cube.move('B R\' B L L B\' R B L L B B'); }
				return;
			}
			if(helper.getThirdLayer(Faces.B)[2] === 'B' && helper.getThirdLayer(Faces.L)[0] === 'L') {
				while(!thirdLayerSolved(cube)) { cube.move('F L\' F R R F\' L F R R F F'); }
				return;
			}
			if(helper.getThirdLayer(Faces.B)[0] === 'B' && helper.getThirdLayer(Faces.R)[2] === 'R') {
				while(!thirdLayerSolved(cube)) { cube.move('L B\' L F F L\' B L F F L L'); }
				return;
			}
			cube.move('R F\' R B B R\' F R B B R R'); return helper.positionFirstCorner();
		},

	};

	helper.positionEdges();
	helper.positionFirstCorner();

	if(!thirdLayerSolved(cube)) {
		process.exit();
	}


}
