import { Cube, Faces } from "../Cube";
import { Face } from "../Face";
import { edgeOnFace } from "../solveTester/EdgeOnFace";
import { crossOnFace } from "../solveTester/CrossOnFace";
import { logManager } from "../manager/logManager";

export function solveWhiteCross(cube: Cube) { // solve the white cross

    let helper = {

        clearUpperFace: () => {
            let upperFace = cube.faces[Faces.U];
            while(edgeOnFace(cube, 'U', Faces.U)) {
                if(upperFace.data[0][1] === 'U') { cube.move('B'); }
                if(upperFace.data[1][0] === 'U') { cube.move('L'); }
                if(upperFace.data[1][2] === 'U') { cube.move('R'); }
                if(upperFace.data[2][1] === 'U') { cube.move('F'); }
            }
        },

        getColor: (face: Faces, position: string): string => {
            switch (face) {
                case Faces.F:
                    if(position === '01') { return cube.faces[Faces.U].data[2][1]; }
                    if(position === '10') { return cube.faces[Faces.L].data[1][2]; }
                    if(position === '12') { return cube.faces[Faces.R].data[1][0]; }
                    if(position === '21') { return cube.faces[Faces.D].data[0][1]; }
                    break;
                case Faces.R:
                    if(position === '01') { return cube.faces[Faces.U].data[1][2]; }
                    if(position === '10') { return cube.faces[Faces.F].data[1][2]; }
                    if(position === '12') { return cube.faces[Faces.B].data[1][0]; }
                    if(position === '21') { return cube.faces[Faces.D].data[1][2]; }
                    break;
                case Faces.B:
                    if(position === '01') { return cube.faces[Faces.U].data[0][1]; }
                    if(position === '10') { return cube.faces[Faces.R].data[1][2]; }
                    if(position === '12') { return cube.faces[Faces.L].data[1][0]; }
                    if(position === '21') { return cube.faces[Faces.D].data[2][1]; }
                    break;
                case Faces.L:
                    if(position === '01') { return cube.faces[Faces.U].data[1][0]; }
                    if(position === '10') { return cube.faces[Faces.B].data[1][2]; }
                    if(position === '12') { return cube.faces[Faces.F].data[1][0]; }
                    if(position === '21') { return cube.faces[Faces.D].data[1][0]; }
                    break;
            }
            console.log('[E]Error while getting color', face);
            process.exit();
            return '';
        },

        solveFontFace: () => {

            let face: Face = cube.faces[Faces.F], color: string;
            if(face.data[0][1] === 'U') {
                color = helper.getColor(Faces.F, '01');
                // console.log('Face: Front - Position:', '01');
                switch (color) {
                    case 'F': cube.move('F U\' R U'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err1' : ''); break;
                    case 'L': cube.move('F\' L\''); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err2' : ''); break;
                    case 'R': cube.move('F R'); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err3' : ''); break;
                    case 'B': cube.move('F U R U\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err4' : ''); break;
                }
            }
            if(face.data[1][0] === 'U') {
                color = helper.getColor(Faces.F, '10');
                // console.log('Face: Front - Position:', '10', color);
                switch (color) {
                    case 'F': cube.move('U L\' U\''); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err5' : ''); break;
                    case 'L': cube.move('L\''); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err6' : ''); break;
                    case 'R': cube.move('U  U L\' U\' U\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err7' : ''); break;
                    case 'B': cube.move('U U U L\' U'); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err8' : ''); break;
                }
                }
            if(face.data[1][2] === 'U') {
                color = helper.getColor(Faces.F, '12');
                // console.log('Face: Front - Position:', '12');
                switch (color) {
                    case 'F': cube.move('U\' R U'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err9' : ''); break;
                    case 'L': cube.move('U U R U U'); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err10' : ''); break;
                    case 'R': cube.move('R'); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err11' : ''); break;
                    case 'B': cube.move('U R U\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err12' : ''); break;
                }
            }
            if(face.data[2][1] === 'U') {
                color = helper.getColor(Faces.F, '21');
                // console.log('Face: Front - Position:', '21');
                switch (color) {
                    case 'F': cube.move('U F L\' F\' U\''); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err13' : ''); break;
                    case 'L': cube.move('L F L\' F\''); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err14' : ''); break;
                    case 'R': cube.move('R\' F\' R F '); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err15' : ''); break;
                    case 'B': cube.move('U F\' R F U\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err16' : ''); break;
                }
            }

        },

        solveLeftFace: () => {

            let face: Face = cube.faces[Faces.L], color: string;
            if(face.data[0][1] === 'U') {
                color = helper.getColor(Faces.L, '01');
                // console.log('Face: Left - Position:', '01');
                switch (color) {
                    case 'F': cube.move('L F'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err17' : ''); break;
                    case 'L': cube.move('L\' U B\' U\''); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err18' : ''); break;
                    case 'R': cube.move('L U F U\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err19' : ''); break;
                    case 'B': cube.move('L\' B\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err20' : ''); break;
                }
            }
            if(face.data[1][0] === 'U') {
                color = helper.getColor(Faces.L, '10');
                // console.log('Face: Left - Position:', '10', color);
                switch (color) {
                    case 'F': cube.move('U U B\' U U'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err21' : ''); break;
                    case 'L': cube.move('U B\' U\''); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err22' : ''); break;
                    case 'R': cube.move('U\' B\' U'); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err23' : ''); break;
                    case 'B': cube.move('B\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err24' : ''); break;
                }
            }
            if(face.data[1][2] === 'U') {
                color = helper.getColor(Faces.L, '12');
                // console.log('Face: Left - Position:', '12');
                switch (color) {
                    case 'F': cube.move('F'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err25' : ''); break;
                    case 'L': cube.move('U\' F U'); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err26' : ''); break;
                    case 'R': cube.move('U F U\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err27' : ''); break;
                    case 'B': cube.move('U U F U U'); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err28' : ''); break;
                }
            }
            if(face.data[2][1] === 'U') {
                color = helper.getColor(Faces.L, '21');
                // console.log('Face: Left - Position:', '21');
                switch (color) {
                    case 'F': cube.move('L\' F L'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err29' : ''); break;
                    case 'L': cube.move('U L B\' L\' U\''); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err30' : ''); break;
                    case 'R': cube.move('L U\' B\' U L\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err31' : ''); break;
                    case 'B': cube.move('L B\' L\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err32' : ''); break;
                }
            }

        },

        solveBackFace: () => {

            let face: Face = cube.faces[Faces.B], color: string;
            if(face.data[0][1] === 'U') {
                color = helper.getColor(Faces.B, '01');
                // console.log('Face: Back - Position:', '01');
                switch (color) {
                    case 'F': cube.move('B U L U\' B\''); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err33' : ''); break;
                    case 'L': cube.move('B L'); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err34' : ''); break;
                    case 'R': cube.move('B\' R\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err35' : ''); break;
                    case 'B': cube.move('B\' U R\' U\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err36' : ''); break;
                }
            }
            if(face.data[1][0] === 'U') {
                color = helper.getColor(Faces.B, '10');
                // console.log('Face: Back - Position:', '10', color);
                switch (color) {
                    case 'F': cube.move('U\' R\' U'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err37' : ''); break;
                    case 'L': cube.move('U U R\' U U'); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err38' : ''); break;
                    case 'R': cube.move('R\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err39' : ''); break;
                    case 'B': cube.move('U R\' U\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err40' : ''); break;
                }
            }
            if(face.data[1][2] === 'U') {
                color = helper.getColor(Faces.B, '12');
                // console.log('Face: Back - Position:', '12');
                switch (color) {
                    case 'F': cube.move('U L U\''); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err41' : ''); break;
                    case 'L': cube.move('L'); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err42' : ''); break;
                    case 'R': cube.move('U U L U U'); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err43' : ''); break;
                    case 'B': cube.move('U\' L U'); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err44' : ''); break;
                }
            }
            if(face.data[2][1] === 'U') {
                color = helper.getColor(Faces.B, '21');
                // console.log('Face: Back - Position:', '21');
                switch (color) {
                    case 'F': cube.move('B\' U L U\' B'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err45' : ''); break;
                    case 'L': cube.move('B\' L B'); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err46' : ''); break;
                    case 'R': cube.move('B R\' B\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err47' : ''); break;
                    case 'B': cube.move('B U R\' U\''); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err48' : ''); break;
                }
            }

        },

        solveRightFace: () => {

            let face: Face = cube.faces[Faces.R], color: string;
            if(face.data[0][1] === 'U') {
                color = helper.getColor(Faces.R, '01');
                // console.log('Face: Right - Position:', '01');
                switch (color) {
                    case 'F': cube.move('R\' F\''); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err49' : ''); break;
                    case 'L': cube.move('R\' U\' F\' U'); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err50' : ''); break;
                    case 'R': cube.move('R\' U F\' U\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err51' : ''); break;
                    case 'B': cube.move('R B'); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err52' : ''); break;
                }
            }
            if(face.data[1][0] === 'U') {
                color = helper.getColor(Faces.R, '10');
                // console.log('Face: Right - Position:', '10', color);
                switch (color) {
                    case 'F': cube.move('F\''); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err53' : ''); break;
                    case 'L': cube.move('U\' F\' U'); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err54' : ''); break;
                    case 'R': cube.move('U F\' U\''); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err55' : ''); break;
                    case 'B': cube.move('U U F\' U U'); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err56' : ''); break;
                }
            }
            if(face.data[1][2] === 'U') {
                color = helper.getColor(Faces.R, '12');
                // console.log('Face: Right - Position:', '12');
                switch (color) {
                    case 'F': cube.move('U U B U U'); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err57' : ''); break;
                    case 'L': cube.move('U B U\''); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err58' : ''); break;
                    case 'R': cube.move('U\' B U'); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err59' : ''); break;
                    case 'B': cube.move('B'); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err60' : ''); break;
                }
            }
            if(face.data[2][1] === 'U') {
                color = helper.getColor(Faces.R, '21');
                // console.log('Face: RightS - Position:', '21');
                switch (color) {
                    case 'F': cube.move('R F\' R\''); console.log(cube.faces[Faces.F].data[0][1] !== 'F' ? 'Err61' : ''); break;
                    case 'L': cube.move('U R\' B R U\''); console.log(cube.faces[Faces.L].data[0][1] !== 'L' ? 'Err62' : ''); break;
                    case 'R': cube.move('U\' R\' B R U'); console.log(cube.faces[Faces.R].data[0][1] !== 'R' ? 'Err63' : ''); break;
                    case 'B': cube.move('R\' B R'); console.log(cube.faces[Faces.B].data[0][1] !== 'B' ? 'Err64' : ''); break;
                }
            }

        },

        solveBottomFace: () => {
            let downFace = cube.faces[Faces.D];

            let solve = () => {
                downFace = cube.faces[Faces.D];
                switch (cube.faces[Faces.F].data[2][1]) {
                    case 'F': cube.move('F F'); break;
                    case 'L': cube.move('D\' L L'); break;
                    case 'B': cube.move('D D B B'); break;
                    case 'R': cube.move('D R R'); break;
                    default: console.log('[E]Error while solving bottom side ', cube.faces[Faces.F].data[2][1]); process.exit(); break;
                }
                downFace = cube.faces[Faces.D];
            };

            if(downFace.data[0][1] === 'U') { cube.move(''); solve(); }
            if(downFace.data[1][0] === 'U') { cube.move('D'); solve(); }
            if(downFace.data[1][2] === 'U') { cube.move('D\''); solve(); }
            if(downFace.data[2][1] === 'U') { cube.move('D D'); solve(); }
        }

    };
    while(!crossOnFace(cube, Faces.U)) {
        helper.solveFontFace();
        helper.solveLeftFace();
        helper.solveBackFace();
        helper.solveRightFace();
        helper.solveBottomFace();
    }

    logManager.log('Solved white cross!');

}
