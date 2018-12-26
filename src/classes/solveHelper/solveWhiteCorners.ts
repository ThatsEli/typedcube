import { Cube, Faces } from "../Cube";
import { Face } from "../Face";
import { cornerOnFace } from "../solveTester/CornerOnFace";

export function solveWhiteCorners(cube: Cube): void {

	let helper = {

        solveFontFace: (): void => {

        },

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
        		console.log('CornersErr' + errorId)
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
            }

            console.log('Error while getting corner color', face, position, 'x');
    		process.exit(); return '';

        },

        insertFrontCorners: (): void => {

            let position = helper.positionCorner(Faces.F),
            	colors = helper.getColors(Faces.F, position);

            console.log('Face: Front Pos:', position, 'Colors:', colors);

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

            console.log('Face: Left Pos:', position, 'Colors:', colors);

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



	};

	while(cornerOnFace(cube, 'U', Faces.L)) {
		// console.clear();
		console.log('Positioning corner');
		helper.insertLeftCorners();
		// process.exit();
	}

}
