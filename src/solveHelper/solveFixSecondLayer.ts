import { Cube, Faces } from "../classes/Cube";
import { logManager, LogLevel } from "../manager/logManager";
import { layerSolved } from "../solveTester/layerSolved";
import { solveSecondLayer } from "../solveHelper/solveSecondLayer";

export function solveFixSecondLayer(cube: Cube): void {

	let helper = {

		positionFrontWrongCorners: (): void => {
			if(cube.faces[Faces.F].data[1][0] !== 'F') { cube.move('L D\' L\' D\' F\' D F'); } else
			if(cube.faces[Faces.F].data[1][2] !== 'F') { cube.move('R\' D R D F D\' F\''); }
			solveSecondLayer(cube);
		},

		positionLeftWrongCorners: (): void => {
			if(cube.faces[Faces.L].data[1][0] !== 'L') { cube.move('B D\' B\' D\' L\' D L'); } else
			if(cube.faces[Faces.L].data[1][2] !== 'L') { cube.move('F\' D F D L D\' L\''); }
			solveSecondLayer(cube);
		},

		positionBackWrongCorners: (): void => {
			if(cube.faces[Faces.B].data[1][0] !== 'B') { cube.move('R D\' R\' D\' B\' D B'); } else
			if(cube.faces[Faces.B].data[1][2] !== 'B') { cube.move('L\' D L D B D\' B\''); }
			solveSecondLayer(cube);
		},

		positionRightWrongCorners: (): void => {
			if(cube.faces[Faces.R].data[1][0] !== 'R') { cube.move('F D\' F\' D\' R\' D R'); } else
			if(cube.faces[Faces.R].data[1][2] !== 'R') { cube.move('B\' D B D R D\' R\''); }
			solveSecondLayer(cube);
		},

	};

	let needToFix: boolean = false;

	while(
		!layerSolved(cube, Faces.F, 1) || !layerSolved(cube, Faces.L, 1) ||
		!layerSolved(cube, Faces.B, 1) || !layerSolved(cube, Faces.R, 1)
	) {
		needToFix = true;
		logManager.log('Fixing second layer', LogLevel.info);
		helper.positionFrontWrongCorners();
		helper.positionLeftWrongCorners();
		helper.positionBackWrongCorners();
		helper.positionRightWrongCorners();
	}

	if(needToFix) {
		logManager.log('Fixed second layers', LogLevel.success);
	}

}
