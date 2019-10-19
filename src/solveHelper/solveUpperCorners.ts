import { Cube, Faces } from "../classes/Cube";
import { cornerOnFace } from "../solveTester/cornerOnFace";
import { allCornersOnFace } from "../solveTester/allCornersOnFace";
import { LogManager, LogLevel } from "../manager/logManager";

export function solveUpperCorners(cube: Cube): void {

	let helper = {

        positionCorner: (face: Faces): string => {
        	let faceData = cube.faces[face].data;
        	switch (face) {
        		case Faces.F:
        			if(faceData[0][0] == 'U') { cube.move('F\' D\' F D'); helper.errorCheck(face, 2, 0, 'U', 1); return 'L'; }
        			if(faceData[0][2] == 'U') { cube.move('F D F\' D\''); helper.errorCheck(face, 2, 2, 'U', 2); return 'R'; }
        			if(faceData[2][0] == 'U') { return 'L'; }
        			if(faceData[2][2] == 'U') { return 'R'; }
        			break;
        		case Faces.L:
        			if(faceData[0][0] == 'U') { cube.move('L\' D\' L D'); helper.errorCheck(face, 2, 0, 'U', 3); return 'L'; }
        			if(faceData[0][2] == 'U') { cube.move('L D L\' D\''); helper.errorCheck(face, 2, 2, 'U', 4); return 'R'; }
        			if(faceData[2][0] == 'U') { return 'L'; }
        			if(faceData[2][2] == 'U') { return 'R'; }
        			break;
        		case Faces.B:
        			if(faceData[0][0] == 'U') { cube.move('B\' D\' B D'); helper.errorCheck(face, 2, 0, 'U', 5); return 'L'; }
        			if(faceData[0][2] == 'U') { cube.move('B D B\' D\''); helper.errorCheck(face, 2, 2, 'U', 6); return 'R'; }
        			if(faceData[2][0] == 'U') { return 'L'; }
        			if(faceData[2][2] == 'U') { return 'R'; }
        			break;
        		case Faces.R:
        			if(faceData[0][0] == 'U') { cube.move('R\' D\' R D'); helper.errorCheck(face, 2, 0, 'U', 7); return 'L'; }
        			if(faceData[0][2] == 'U') { cube.move('R D R\' D\''); helper.errorCheck(face, 2, 2, 'U', 8); return 'R'; }
        			if(faceData[2][0] == 'U') { return 'L'; }
        			if(faceData[2][2] == 'U') { return 'R'; }
        			break;
        	}
   			LogManager.log('Error while positioning corner for upper face', LogLevel.error);
			return '';
        },

        errorCheck: (face: Faces, pos1: number, pos2: number, compare: string, errorId: number): void => {
        	if(cube.faces[face].data[pos1][pos2] !== compare) {
                LogManager.log('Error while solving corners. ID:' + errorId, LogLevel.error);
        	}
        },

        getColors: (face: Faces, position: string): string => {

            switch (face) {
            	case Faces.F:
            		if(position === 'L') { return cube.faces[Faces.L].data[2][2] + cube.faces[Faces.D].data[0][0]; }
            		if(position === 'R') { return cube.faces[Faces.R].data[2][0] + cube.faces[Faces.D].data[0][2]; }
            		break;
            	case Faces.L:
            		if(position === 'L') { return cube.faces[Faces.B].data[2][2] + cube.faces[Faces.D].data[2][0]; }
            		if(position === 'R') { return cube.faces[Faces.F].data[2][0] + cube.faces[Faces.D].data[0][0]; }
            		break;
            	case Faces.B:
            		if(position === 'L') { return cube.faces[Faces.R].data[2][2] + cube.faces[Faces.D].data[2][2]; }
            		if(position === 'R') { return cube.faces[Faces.L].data[2][0] + cube.faces[Faces.D].data[2][0]; }
            		break;
            	case Faces.R:
            		if(position === 'L') { return cube.faces[Faces.F].data[2][2] + cube.faces[Faces.D].data[0][2]; }
            		if(position === 'R') { return cube.faces[Faces.B].data[2][0] + cube.faces[Faces.D].data[2][2]; }
            		break;
            	case Faces.D:
            		return cube.faces[Faces.L].data[2][2] + cube.faces[Faces.F].data[2][0]; 
            		break;
            }

            LogManager.log('Error while getting corner color', LogLevel.error);
    		return '';

        },

        insertFrontCorners: (): void => {

            let position = helper.positionCorner(Faces.F),
            	colors = helper.getColors(Faces.F, position);

            LogManager.log('Inserting corner on the front face', LogLevel.info);

			if(position === 'L') {
				if(colors === 'LF') { cube.move('D L D\' L\''); helper.errorCheck(Faces.U, 2, 0, 'U', 9); }
				if(colors === 'FR') { cube.move('D D F D\' F\''); helper.errorCheck(Faces.U, 2, 2, 'U', 10); }
				if(colors === 'RB') { cube.move('D\' R D\' R\''); helper.errorCheck(Faces.U, 0, 2, 'U', 11); }
				if(colors === 'BL') { cube.move('B D\' B\''); helper.errorCheck(Faces.U, 0, 0, 'U', 12); }
			} else if(position === 'R') {
				if(colors === 'FL') { cube.move('D D F\' D F'); helper.errorCheck(Faces.U, 2, 0, 'U', 13); }
				if(colors === 'RF') { cube.move('D\' R\' D R'); helper.errorCheck(Faces.U, 2, 2, 'U', 14); }
				if(colors === 'BR') { cube.move('B\' D B'); helper.errorCheck(Faces.U, 0, 2, 'U', 15); }
				if(colors === 'LB') { cube.move('L\' D D L'); helper.errorCheck(Faces.U, 0, 0, 'U', 16); }
			}

        },

        insertLeftCorners: (): void => {

            let position = helper.positionCorner(Faces.L),
            	colors = helper.getColors(Faces.L, position);

            LogManager.log('Inserting corner on the left face', LogLevel.info);

			if(position === 'L') {
				if(colors === 'BL') { cube.move('D B D\' B\''); helper.errorCheck(Faces.U, 0, 0, 'U', 17); }
				if(colors === 'LF') { cube.move('D D L D\' L\''); helper.errorCheck(Faces.U, 2, 0, 'U', 18); }
				if(colors === 'FR') { cube.move('D\' F D\' F\''); helper.errorCheck(Faces.U, 2, 2, 'U', 19); }
				if(colors === 'RB') { cube.move('R D\' R\''); helper.errorCheck(Faces.U, 0, 2, 'U', 20); }
			} else if(position === 'R') {
				if(colors === 'LB') { cube.move('D D L\' D L'); helper.errorCheck(Faces.U, 0, 0, 'U', 21); }
				if(colors === 'FL') { cube.move('D\' F\' D F'); helper.errorCheck(Faces.U, 2, 0, 'U', 22); }
				if(colors === 'RF') { cube.move('R\' D R'); helper.errorCheck(Faces.U, 2, 2, 'U', 23); }
				if(colors === 'BR') { cube.move('B\' D D B'); helper.errorCheck(Faces.U, 0, 2, 'U', 24); }
			}

        },

        insertBackCorners: (): void => {

            let position = helper.positionCorner(Faces.B),
            	colors = helper.getColors(Faces.B, position);

            LogManager.log('Inserting corner on the back face', LogLevel.info);

			if(position === 'L') {
				if(colors === 'RB') { cube.move('D R D\' R\''); helper.errorCheck(Faces.U, 0, 2, 'U', 25); }
				if(colors === 'BL') { cube.move('D D B D\' B\''); helper.errorCheck(Faces.U, 0, 0, 'U', 26); }
				if(colors === 'LF') { cube.move('D\' L D\' L\''); helper.errorCheck(Faces.U, 2, 0, 'U', 27); }
				if(colors === 'FR') { cube.move('F D\' F\''); helper.errorCheck(Faces.U, 2, 2, 'U', 28); }
			} else if(position === 'R') {
				if(colors === 'BR') { cube.move('D D B\' D B'); helper.errorCheck(Faces.U, 0, 2, 'U', 29); }
				if(colors === 'LB') { cube.move('D\' L\' D L'); helper.errorCheck(Faces.U, 0, 0, 'U', 30); }
				if(colors === 'FL') { cube.move('F\' D F'); helper.errorCheck(Faces.U, 2, 0, 'U', 31); }
				if(colors === 'RF') { cube.move('R\' D D R'); helper.errorCheck(Faces.U, 2, 2, 'U', 32); }
			}

        },

        insertRightCorners: (): void => {

            let position = helper.positionCorner(Faces.R),
            	colors = helper.getColors(Faces.R, position);

            LogManager.log('Inserting corner on the right face', LogLevel.info);

			if(position === 'L') {
				if(colors === 'FR') { cube.move('D F D\' F\''); helper.errorCheck(Faces.U, 2, 2, 'U', 33); }
				if(colors === 'RB') { cube.move('D D R D\' R\''); helper.errorCheck(Faces.U, 0, 2, 'U', 34); }
				if(colors === 'BL') { cube.move('D\' B D\' B\''); helper.errorCheck(Faces.U, 0, 0, 'U', 35); }
				if(colors === 'LF') { cube.move('L D\' L\''); helper.errorCheck(Faces.U, 2, 0, 'U', 36); }
			} else if(position === 'R') {
				if(colors === 'RF') { cube.move('D D R\' D R'); helper.errorCheck(Faces.U, 2, 2, 'U', 37); }
				if(colors === 'BR') { cube.move('D\' B\' D B'); helper.errorCheck(Faces.U, 0, 2, 'U', 38); }
				if(colors === 'LB') { cube.move('L\' D L'); helper.errorCheck(Faces.U, 0, 0, 'U', 39); }
				if(colors === 'FL') { cube.move('F\' D D F'); helper.errorCheck(Faces.U, 2, 0, 'U', 40); }
			}

        },

        insertDownCorners: (): void => {

            LogManager.log('Inserting corner on the down face', LogLevel.info);

        	let faceData = cube.faces[Faces.D].data;

        	if(faceData[0][2] === 'U') { cube.move('D\''); } else
        	if(faceData[2][2] === 'U') { cube.move('D\' D\''); } else
        	if(faceData[2][0] === 'U') { cube.move('D'); }

        	let colors: string = helper.getColors(Faces.D, '');

        	if(cube.faces[Faces.D].data[0][0] === 'U') {
        		switch (colors) {
	        		case 'FL': cube.move('F\' D F L D\' D\' L\''); break;
	        		case 'RF': cube.move('D R\' D\' D\' R D D F D\' F\''); break;
	        		case 'BR': cube.move('D D B\' D B D\' R D\' R\''); break;
					case 'LB': cube.move('D\' L\' D\' D\' L D D B D\' B\''); break;

                    default: LogManager.log('Error while inserting bottom corner', LogLevel.error); break;
	        	}
            } else { LogManager.log('Another error while inserting bottom corners', LogLevel.error); }

        },

	};

	while(
		!allCornersOnFace(cube, 'U', Faces.U)
	) {
		if(cornerOnFace(cube, 'U', Faces.F)) { helper.insertFrontCorners(); }
		if(cornerOnFace(cube, 'U', Faces.L)) { helper.insertLeftCorners(); }
		if(cornerOnFace(cube, 'U', Faces.B)) { helper.insertBackCorners(); }
		if(cornerOnFace(cube, 'U', Faces.R)) { helper.insertRightCorners(); }
		if(cornerOnFace(cube, 'U', Faces.D)) { helper.insertDownCorners(); }
	}

	LogManager.log('Solved upper corners', LogLevel.success);


}
