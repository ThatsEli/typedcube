import { Cube, Faces } from "../classes/Cube";
import { logManager, LogLevel } from "../manager/logManager";
import { layerSolved } from "../solveTester/layerSolved";
import { solveUpperCorners } from "./solveUpperCorners";

export function solveFixUpperCorners(cube: Cube): void {

	let helpers = {

		getWrongCorners: (): string => {
			if(cube.faces[Faces.F].data[0][0] !== 'F' || cube.faces[Faces.L].data[0][2] !== 'L') { return 'FL'; }
			if(cube.faces[Faces.F].data[0][2] !== 'F' || cube.faces[Faces.R].data[0][0] !== 'R') { return 'FR'; }

			if(cube.faces[Faces.B].data[0][2] !== 'B' || cube.faces[Faces.L].data[0][2] !== 'L') { return 'BL'; }
			if(cube.faces[Faces.B].data[0][0] !== 'B' || cube.faces[Faces.R].data[0][0] !== 'R') { return 'BR'; }

			logManager.log('Error while fixing first layer', LogLevel.error);
			process.exit(); return '';
		},

		fixWrongCorner: (position: string): void => {
			switch (position) {
				case 'FL': cube.move('L D L\''); solveUpperCorners(cube); break;
				case 'FR': cube.move('R\' D\' R'); solveUpperCorners(cube); break;
				
				case 'BL': cube.move('L\' D\' L'); solveUpperCorners(cube); break;
				case 'BR': cube.move('R D R\''); solveUpperCorners(cube); break;

				default: logManager.log('Error 2 while fixing first layer', LogLevel.error) break;
			}
		},

	};

	let needToFix: boolean = false;

	while(
		!layerSolved(cube, Faces.F, 0) || !layerSolved(cube, Faces.L, 0) ||
		!layerSolved(cube, Faces.B, 0) || !layerSolved(cube, Faces.R, 0)
	) {
		needToFix = true;
		logManager.log('Fixing upper corners', LogLevel.info);
		let position = helpers.getWrongCorners();
		helpers.fixWrongCorner(position);
	}

	if(needToFix) logManager.log('Fixed upper corners', LogLevel.success);

}
