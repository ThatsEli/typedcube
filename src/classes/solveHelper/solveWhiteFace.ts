import { Cube, Faces } from "../Cube";
import { faceSolved } from "../solveTester/FaceSolved";
import { solveWhiteCross } from "./solveWhiteCross";
import { solveFixWhiteCross } from "./solveFixWhiteCross";

export function solveWhiteFace(cube: Cube) {

    solveWhiteCross(cube);
    solveFixWhiteCross(cube);
    // solveWhiteCorners(cube);

}

function solveWhiteCorners(cube: Cube) {

    let currentFace: number;
    
    let helper = {
        clearUpperFace: () => {
            let upperFace = cube.faces[Faces.U];
            if(upperFace.data[0][0] === 'U') { cube.move('B D B\''); }
            if(upperFace.data[0][2] === 'U') { cube.move('B\' D\' B'); }
            if(upperFace.data[2][0] === 'U') { cube.move('F\' D\' F'); }
            if(upperFace.data[2][2] === 'U') { cube.move('F D F\''); }
        },
        cornerOnFace: (cornerFace: string, face: Faces): boolean => {
            let faceData = cube.faces[face].data;
            if(faceData[0][0] == cornerFace || faceData[0][2] == cornerFace || faceData[2][0] == cornerFace || faceData[2][2] == cornerFace) {
                return true;
            } else return false;
        },
        getCornerColors: (left: boolean): string => {
            let colors: string, downFace = cube.faces[Faces.D];
            switch (currentFace) {
                case Faces.F:
                    if(left) { colors = downFace.data[0][0] + cube.faces[Faces.L].data[2][2]; } else { colors = downFace.data[0][2] + cube.faces[Faces.R].data[2][0]; }
                    break;
                case Faces.R:
                    if(left) { colors = downFace.data[0][2] + cube.faces[Faces.F].data[2][2]; } else { colors = downFace.data[2][2] + cube.faces[Faces.B].data[2][0]; }
                    break;
                case Faces.B:
                    if(left) { colors = downFace.data[2][2] + cube.faces[Faces.R].data[2][2]; } else { colors = downFace.data[2][0] + cube.faces[Faces.L].data[2][0]; }
                    break;
                case Faces.L:
                    if(left) { colors = downFace.data[2][0] + cube.faces[Faces.B].data[2][2]; } else { colors = downFace.data[0][0] + cube.faces[Faces.F].data[2][0]; }
                    break;
                default:
                    console.error('[E]Could\'t get corner color');
                    colors = 'ERROR';
                    process.exit();
                    break;
            }
            return colors;
        },
        insertCorner: (direction: boolean) => {
            let colors;
            if(direction) { // true=LEFT
                colors = helper.getCornerColors(true);
                switch (colors) {
                    case 'RF': cube.move('D D F D\' F\''); break;
                    case 'FL': cube.move('D L D\' L\''); break;
                    case 'LB': cube.move('B D\' B\''); break;
                    case 'BR': cube.move('R D\' D\' R\''); break;
                }
            } else { // false=RIGHT
                colors = helper.getCornerColors(false);;
                switch (colors) {
                    case 'FR': cube.move('D\' R\' D R'); break;
                    case 'LF': cube.move('D\' D\' F\' D F'); break;
                    case 'BL': cube.move('L\' D D L'); break;
                    case 'RB': cube.move('B\' D B'); break;
                }
            }
        },
        findCorner: (): boolean => {

            

            let sideFaces = [Faces.F, Faces.R, Faces.B, Faces.L];
            for (let i = 0; i < sideFaces.length; i++) { // front, right, back, left
                currentFace = sideFaces[i];
                let faceData = cube.faces[currentFace];
                if(faceData.data[0][0] === 'U' ) { cube.move('F\' D\' F D'); return true; } else
                if(faceData.data[0][2] === 'U' ) { cube.move('F D F\' D\''); return false; } else
                if(faceData.data[2][0] === 'U' ) { return true; } else
                if(faceData.data[2][2] === 'U' ) { return false; }   
            }

            let whiteFace = cube.faces[Faces.D];

            if(whiteFace.data[0][0] === 'U') { cube.move('F\' D\' D\' F D F\' D F D\' D\''); return true; }
            if(whiteFace.data[0][2] === 'U') { cube.move('F D D F\' D\' F D\' F\' D'); return true; }
            if(whiteFace.data[2][0] === 'U') { cube.move('D D F D D F\' D\' F D\' F\' D'); return true; }
            if(whiteFace.data[2][2] === 'U') { cube.move('D D F\' D\' D\' F D F\' D F D\' D\''); return true; }

            console.log('No data left, you fu*ked up'); process.exit();
            return true; // true = left; false = right
        }
    }

    while(helper.cornerOnFace('U', Faces.U)) {
        helper.clearUpperFace();
    }
    while(!faceSolved(cube.faces[Faces.U])) {
        let direction = helper.findCorner();
         helper.insertCorner(direction);
        // console.log('x', JSON.stringify(cube.faces));
    }

    console.log('Solved white corners!');

}
