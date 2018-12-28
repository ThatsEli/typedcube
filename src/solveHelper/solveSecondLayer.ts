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
					return cube.faces[Faces.L].data[2][1] + cube.faces[Faces.D].data[1][0];
					break;
				case Faces.B: 
					return cube.faces[Faces.B].data[2][1] + cube.faces[Faces.D].data[2][1];
					break;
				case Faces.R: 
					return cube.faces[Faces.R].data[2][1] + cube.faces[Faces.D].data[1][2];
					break;
			}
			logManager.log('Error while getting colors for solving the second layer', LogLevel.error);
			return '';
		},

		errorCheck: (face1: Faces, pos11: number, pos12: number,
					 face2: Faces, pos21: number, pos22: number, errorId: number): void => {
        	if(cube.faces[face1].data[pos11][pos12] !== Tools.faceToString(face1) ||
        	   cube.faces[face2].data[pos21][pos22] !== Tools.faceToString(face2)) {
        		logManager.log('Error while positioning edge on second layer. ID:' + errorId, LogLevel.error);
        	}
        },	

		positionFrontCorners: (): void => {

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

		positionLeftCorners: (): void => {

        	switch (helper.getColors(Faces.L)) {
        		case 'FL':  /* --- */
	        		cube.move('D D L D\' L\' D\' F\' D F');
	        		helper.errorCheck(Faces.F, 1, 0, Faces.L, 1, 2, 9);
	        		break;
	        	case 'LF': 
	        		cube.move('D\' F\' D F D L D\' L\'');
	        		helper.errorCheck(Faces.F, 1, 0, Faces.L, 1, 2, 10);
	        		break;
	        	case 'FR':  /* --- */
	        		cube.move('D D\'  R\' D R D F D\' F\'');
	        		helper.errorCheck(Faces.F, 1, 2, Faces.R, 1, 0, 11);
	        		break;
	        	case 'RF': 
	        		cube.move('D\' F D\' F\' D\' R\' D R');
	        		helper.errorCheck(Faces.F, 1, 2, Faces.R, 1, 0, 12);
	        		break;
        		case 'LB':  /* --- */
	        		cube.move('D B D\' B\' D\' L\' D L ');
	        		helper.errorCheck(Faces.L, 1, 0, Faces.B, 1, 2, 13);
	        		break;
	        	case 'BL': 
	        		cube.move('D D L\' D L D B D\' B\'');
	        		helper.errorCheck(Faces.L, 1, 0, Faces.B, 1, 2, 14);
	        		break;
	        	case 'RB':  /* --- */
	        		cube.move('D\' D\' D\' B\' D B D R D\' R\'');
	        		helper.errorCheck(Faces.R, 1, 2, Faces.B, 1, 0, 15);
	        		break;
	        	case 'BR': 
	        		cube.move('D\' D R D\' R\' D\' B\' D B');
	        		helper.errorCheck(Faces.R, 1, 2, Faces.B, 1, 0, 16);
	        		break;
        	}
        	
        },

        positionBackCorners: (): void => {

        	switch (helper.getColors(Faces.B)) {
        		case 'FL':  /* --- */
	        		cube.move('D D D L D\' L\' D\' F\' D F');
	        		helper.errorCheck(Faces.F, 1, 0, Faces.L, 1, 2, 17);
	        		break;
	        	case 'LF': 
	        		cube.move('D D\' F\' D F D L D\' L\'');
	        		helper.errorCheck(Faces.F, 1, 0, Faces.L, 1, 2, 18);
	        		break;
	        	case 'FR':  /* --- */
	        		cube.move('D D D\'  R\' D R D F D\' F\'');
	        		helper.errorCheck(Faces.F, 1, 2, Faces.R, 1, 0, 19);
	        		break;
	        	case 'RF': 
	        		cube.move('F D\' F\' D\' R\' D R');
	        		helper.errorCheck(Faces.F, 1, 2, Faces.R, 1, 0, 20);
	        		break;
        		case 'LB':  /* --- */
	        		cube.move('D D B D\' B\' D\' L\' D L');
	        		helper.errorCheck(Faces.L, 1, 0, Faces.B, 1, 2, 21);
	        		break;
	        	case 'BL':
	        		cube.move('D\' L\' D L D B D\' B\'');
	        		helper.errorCheck(Faces.L, 1, 0, Faces.B, 1, 2, 22);
	        		break;
	        	case 'RB':  /* --- */
	        		cube.move('D\' D\' B\' D B D R D\' R\'');
	        		helper.errorCheck(Faces.R, 1, 2, Faces.B, 1, 0, 23);
	        		break;
	        	case 'BR': 
	        		cube.move('D R D\' R\' D\' B\' D B');
	        		helper.errorCheck(Faces.R, 1, 2, Faces.B, 1, 0, 24);
	        		break;
        	}
        	
        },

        positionRightCorners: (): void => {

        	switch (helper.getColors(Faces.R)) {
        		case 'FL':  /* --- */
	        		cube.move('D\' D L D\' L\' D\' F\' D F');
	        		helper.errorCheck(Faces.F, 1, 0, Faces.L, 1, 2, 25);
	        		break;
	        	case 'LF': 
	        		cube.move('D F\' D F D L D\' L\'');
	        		helper.errorCheck(Faces.F, 1, 0, Faces.L, 1, 2, 26);
	        		break;
	        	case 'FR':  /* --- */
	        		cube.move('D\' D\' R\' D R D F D\' F\'');
	        		helper.errorCheck(Faces.F, 1, 2, Faces.R, 1, 0, 27);
	        		break;
	        	case 'RF': 
	        		cube.move('D F D\' F\' D\' R\' D R');
	        		helper.errorCheck(Faces.F, 1, 2, Faces.R, 1, 0, 28);
	        		break;
        		case 'LB':  /* --- */
	        		cube.move('D\' B D\' B\' D\' L\' D L');
	        		helper.errorCheck(Faces.L, 1, 0, Faces.B, 1, 2, 29);
	        		break;
	        	case 'BL':
	        		cube.move('L\' D L D B D\' B\'');
	        		helper.errorCheck(Faces.L, 1, 0, Faces.B, 1, 2, 30);
	        		break;
	        	case 'RB':  /* --- */
	        		cube.move('D\' B\' D B D R D\' R\'');
	        		helper.errorCheck(Faces.R, 1, 2, Faces.B, 1, 0, 31);
	        		break;
	        	case 'BR': 
	        		cube.move('D D R D\' R\' D\' B\' D B');
	        		helper.errorCheck(Faces.R, 1, 2, Faces.B, 1, 0, 32);
	        		break;
        	}
        	
        },

        layerCornerOnFace: (face: Faces): boolean => {
		let layerCorners = ['FL', 'LF', 'FR', 'RF', 'LB', 'BL', 'RB', 'BR'];

        	return layerCorners.indexOf(helper.getColors(face)) > -1;
        },

	};	

	while(
		helper.layerCornerOnFace(Faces.F) || helper.layerCornerOnFace(Faces.L) ||
		helper.layerCornerOnFace(Faces.B) || helper.layerCornerOnFace(Faces.R)
	) {
		logManager.log('Positioning corner on second layer', LogLevel.info);
		helper.positionFrontCorners();
		helper.positionLeftCorners();
		helper.positionBackCorners();
		helper.positionRightCorners();
	}

	logManager.log('Solved second layer', LogLevel.success);

}
