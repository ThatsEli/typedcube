import { Cube, Faces } from "../Cube";
import { Face } from "../Face";
import { cornerOnFace } from "../solveTester/CornerOnFace";
import { allCornersOnFace } from "../solveTester/AllCornersOnFace";
import { logManager } from "../manager/logManager";
import { faceSolved } from "../solveTester/FaceSolved";

export function solveWhiteCorners(cube: Cube): void {

	let helper = {

        positionCorner: (face: Faces): string => {
        	let faceData = cube.faces[face].data;
        	switch (face) {
        		case Faces.F:
        			if(faceData[0][0] == 'U') { cube.move('F\' D\' F D'); console.log(cube.faces[face].data[2][0] !== 'U' ? 'Err1' : ''); return 'L'; }
        			if(faceData[0][2] == 'U') { cube.move('F D F\' D\''); console.log(cube.faces[face].data[2][2] !== 'U' ? 'Err2' : ''); return 'R'; }
        			if(faceData[2][0] == 'U') { return 'L'; }
        			if(faceData[2][2] == 'U') { return 'R'; }
        			break;
        		case Faces.L:
        			if(faceData[0][0] == 'U') { cube.move('L\' D\' L D'); console.log(cube.faces[face].data[2][0] !== 'U' ? 'Err3' : ''); return 'L'; }
        			if(faceData[0][2] == 'U') { cube.move('L D L\' D\''); console.log(cube.faces[face].data[2][2] !== 'U' ? 'Err4' : ''); return 'R'; }
        			if(faceData[2][0] == 'U') { return 'L'; }
        			if(faceData[2][2] == 'U') { return 'R'; }
        			break;
        		case Faces.B:
        			if(faceData[0][0] == 'U') { cube.move('B\' D\' B D'); console.log(cube.faces[face].data[2][0] !== 'U' ? 'Err5' : ''); return 'L'; }
        			if(faceData[0][2] == 'U') { cube.move('B D B\' D\''); console.log(cube.faces[face].data[2][2] !== 'U' ? 'Err6' : ''); return 'R'; }
        			if(faceData[2][0] == 'U') { return 'L'; }
        			if(faceData[2][2] == 'U') { return 'R'; }
        			break;
        		case Faces.R:
        			if(faceData[0][0] == 'U') { cube.move('R\' D\' R D'); console.log(cube.faces[face].data[2][0] !== 'U' ? 'Err7' : ''); return 'L'; }
        			if(faceData[0][2] == 'U') { cube.move('R D R\' D\''); console.log(cube.faces[face].data[2][2] !== 'U' ? 'Err8' : ''); return 'R'; }
        			if(faceData[2][0] == 'U') { return 'L'; }
        			if(faceData[2][2] == 'U') { return 'R'; }
        			break;
        	}
   			console.log(face, 'Error while positioning corners.');
			process.exit(); return '';
        },

        errorCheck: (face: Faces, pos1: number, pos2: number, compare: string, errorId: number): void => {
        	if(cube.faces[face].data[pos1][pos2] !== compare) {
        		console.log('CornersErr' + errorId);
        		console.log(face, pos1, pos2, compare);

        		process.exit();
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

            console.log('Error while getting corner color', face, position, 'x');
    		process.exit(); return '';

        },

        insertFrontCorners: (): void => {

            let position = helper.positionCorner(Faces.F),
            	colors = helper.getColors(Faces.F, position);

            // console.log('Face: Front Pos:', position, 'Colors:', colors);

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

            // console.log('Face: Left Pos:', position, 'Colors:', colors);

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

            // console.log('Face: Back Pos:', position, 'Colors:', colors);

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

            // console.log('Face: Right Pos:', position, 'Colors:', colors);

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

	        		default: console.log('Error while inserting bottom corners'); process.exit(); break;
	        	}
        	} else { console.log('Another error while inserting bottom corners'); process.exit(); }

        },

	};

	while(
		!allCornersOnFace(cube, 'U', Faces.U)
	) {
		// console.log('Positioning corner');
		if(cornerOnFace(cube, 'U', Faces.F)) { helper.insertFrontCorners(); }
		if(cornerOnFace(cube, 'U', Faces.L)) { helper.insertLeftCorners(); }
		if(cornerOnFace(cube, 'U', Faces.B)) { helper.insertBackCorners(); }
		if(cornerOnFace(cube, 'U', Faces.R)) { helper.insertRightCorners(); }
		if(cornerOnFace(cube, 'U', Faces.D)) { helper.insertDownCorners(); }
	}

	logManager.log('Solved white corners!' + cube.faces[Faces.U].data);


}
