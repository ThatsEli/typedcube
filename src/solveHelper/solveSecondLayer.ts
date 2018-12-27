import { Cube, Faces } from "../classes/Cube";
import { logManager, LogLevel } from "../manager/logManager";
import { Tools } from "../classes/Tools";

export function solveSecondLayer(cube: Cube): void {

	let helper = {

		colorValid: (color: string): boolean => {
			return !color.includes('D');
		},

		getColors: (face: Faces): string => {
			switch (face) {
				case Faces.F: 
					return cube.faces[Faces.F].data[2][1] + cube.faces[Faces.D].data[0][1];
					break;
				case Faces.L: 
					return cube.faces[Faces.L].data[2][1] + cube.faces[Faces.D].data[2][0];
					break;
				case Faces.B: 
					return cube.faces[Faces.B].data[2][1] + cube.faces[Faces.D].data[2][1];
					break;
				case Faces.R: 
					return cube.faces[Faces.R].data[2][1] + cube.faces[Faces.D].data[2][2];
					break;
			}
			logManager.log('Error while getting colors for solving the second layer', LogLevel.error);
			process.exit();
			return '';
		},

		errorCheck: (face1: Faces, pos11: number, pos12: number,
					 face2: Faces, pos21: number, pos22: number, errorId: number): void => {
        	if(cube.faces[face1].data[pos11][pos12] !== Tools.faceToString(face1) ||
        	   cube.faces[face2].data[pos21][pos22] !== Tools.faceToString(face2)) {
        		logManager.log('Error while positioning edge on second layer. ID:' + errorId, LogLevel.error);
        		process.exit();
        	}
        },	

		positionFrontCorner: (): void => {
        	switch (helper.getColors(Faces.F)) {
        		case 'FL':  /* --- */
	        		cube.move('D L D\' L\' D\' F\' D F');
	        		helper.errorCheck(Faces.F, 1, 0, Faces.L, 1, 2, 1);
	        		break;
	        	case 'LF': 
	        		cube.move('D\' D\' F\' D F D L D\' L\'');
	        		helper.errorCheck(Faces.F, 1, 0, Faces.L, 1, 2, 1);
	        		break;
	        	case 'FR':  /* --- */
	        		cube.move('D\' R\' D R D F D\' F\'');
	        		helper.errorCheck(Faces.F, 1, 2, Faces.R, 1, 0, 3);
	        		break;
	        	case 'RF': 
	        		cube.move('D D F D\' F\' D\' R\' D R');
	        		helper.errorCheck(Faces.F, 1, 2, Faces.R, 1, 0, 4);
	        		break;
        		case 'LB':  /* --- */
	        		cube.move('D\' D B D\' B\' D\' L\' D L ');
	        		helper.errorCheck(Faces.L, 1, 0, Faces.B, 1, 2, 5);
	        		break;
	        	case 'BL': 
	        		cube.move('D D D\' L\' D L D B D\' B\'');
	        		helper.errorCheck(Faces.L, 1, 0, Faces.B, 1, 2, 6);
	        		break;
	        	case 'RB':  /* --- */
	        		cube.move('D D\' B\' D B D R D\' R\'');
	        		helper.errorCheck(Faces.R, 1, 2, Faces.B, 1, 0, 7);
	        		break;
	        	case 'BR': 
	        		cube.move('D D D R D\' R\' D\' B\' D B');
	        		helper.errorCheck(Faces.R, 1, 2, Faces.B, 1, 0, 8);
	        		break;
        	}
        },

	};

	while(['FL', 'LF', 'FR', 'RF', 'LB', 'BL', 'RB', 'BR'].indexOf(helper.getColors(Faces.F)) > -1) {
		console.log('positioning front corner' + helper.getColors(Faces.F));
		helper.positionFrontCorner();
	}


}
