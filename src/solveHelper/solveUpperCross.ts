import { Cube, Faces } from "../classes/Cube";
import { Face } from "../classes/Face";
import { edgeOnFace } from "../solveTester/edgeOnFace";
import { crossOnFace } from "../solveTester/crossOnFace";
import { LogManager, LogLevel } from "../manager/logManager";

export function solveUpperCross(cube: Cube) { // solve the white cross

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
            LogManager.log('Error while getting color for tile while solving white cross', LogLevel.error);
            return '';
        },

        errorCheck: (face: Faces, pos1: number, pos2: number, compare: string, errorId: number) => {
            if(cube.faces[face].data[pos1][pos2] !== compare) {
                LogManager.log('Error while solving cross. ID: ' + errorId, LogLevel.error);
            }
        },

        solveFontFace: () => {

            LogManager.log('Solving tile on the front face', LogLevel.info);

            let face: Face = cube.faces[Faces.F], color: string;
            if(face.data[0][1] === 'U') {
                color = helper.getColor(Faces.F, '01');
                switch (color) {
                    case 'F': cube.move('F U\' R U'); helper.errorCheck(Faces.F, 0, 1, 'F', 1); break;
                    case 'L': cube.move('F\' L\''); helper.errorCheck(Faces.L, 0, 1, 'L', 2); break;
                    case 'R': cube.move('F R'); helper.errorCheck(Faces.R, 0, 1, 'R', 3); break;
                    case 'B': cube.move('F U R U\''); helper.errorCheck(Faces.B, 0, 1, 'B', 4); break;
                }
            }
            if(face.data[1][0] === 'U') {
                color = helper.getColor(Faces.F, '10');
                switch (color) {
                    case 'F': cube.move('U L\' U\''); helper.errorCheck(Faces.F, 0, 1, 'F', 5); break;
                    case 'L': cube.move('L\''); helper.errorCheck(Faces.L, 0, 1, 'L', 6); break;
                    case 'R': cube.move('U  U L\' U\' U\''); helper.errorCheck(Faces.R, 0, 1, 'R', 7); break;
                    case 'B': cube.move('U U U L\' U'); helper.errorCheck(Faces.B, 0, 1, 'B', 8); break;
                }
                }
            if(face.data[1][2] === 'U') {
                color = helper.getColor(Faces.F, '12');
                switch (color) {
                    case 'F': cube.move('U\' R U'); helper.errorCheck(Faces.F, 0, 1, 'F', 9); break;
                    case 'L': cube.move('U U R U U'); helper.errorCheck(Faces.L, 0, 1, 'L', 10); break;
                    case 'R': cube.move('R');     helper.errorCheck(Faces.R, 0, 1, 'R', 11); break;
                    case 'B': cube.move('U R U\''); helper.errorCheck(Faces.B, 0, 1, 'B', 12); break;
                }
            }
            if(face.data[2][1] === 'U') {
                color = helper.getColor(Faces.F, '21');
                switch (color) {
                    case 'F': cube.move('U F L\' F\' U\''); helper.errorCheck(Faces.F, 0, 1, 'F', 13); break;
                    case 'L': cube.move('L F L\' F\''); helper.errorCheck(Faces.L, 0, 1, 'L', 14); break;
                    case 'R': cube.move('R\' F\' R F '); helper.errorCheck(Faces.R, 0, 1, 'R', 15); break;
                    case 'B': cube.move('U F\' R F U\''); helper.errorCheck(Faces.B, 0, 1, 'B', 16); break;
                }
            }

        },

        solveLeftFace: () => {

            LogManager.log('Solving tile on the left face', LogLevel.info);

            let face: Face = cube.faces[Faces.L], color: string;
            if(face.data[0][1] === 'U') {
                color = helper.getColor(Faces.L, '01');
                switch (color) {
                    case 'F': cube.move('L F'); helper.errorCheck(Faces.F, 0, 1, 'F', 17); break;
                    case 'L': cube.move('L\' U B\' U\''); helper.errorCheck(Faces.L, 0, 1, 'L', 18); break;
                    case 'R': cube.move('L U F U\''); helper.errorCheck(Faces.R, 0, 1, 'R', 19); break;
                    case 'B': cube.move('L\' B\''); helper.errorCheck(Faces.B, 0, 1, 'B', 20); break;
                }
            }
            if(face.data[1][0] === 'U') {
                color = helper.getColor(Faces.L, '10');
                switch (color) {
                    case 'F': cube.move('U U B\' U U'); helper.errorCheck(Faces.F, 0, 1, 'F', 21); break;
                    case 'L': cube.move('U B\' U\''); helper.errorCheck(Faces.L, 0, 1, 'L', 22); break;
                    case 'R': cube.move('U\' B\' U'); helper.errorCheck(Faces.R, 0, 1, 'R', 23); break;
                    case 'B': cube.move('B\''); helper.errorCheck(Faces.B, 0, 1, 'B', 24); break;
                }
            }
            if(face.data[1][2] === 'U') {
                color = helper.getColor(Faces.L, '12');
                switch (color) {
                    case 'F': cube.move('F'); helper.errorCheck(Faces.F, 0, 1, 'F', 125); break;
                    case 'L': cube.move('U\' F U'); helper.errorCheck(Faces.L, 0, 1, 'L', 26); break;
                    case 'R': cube.move('U F U\''); helper.errorCheck(Faces.R, 0, 1, 'R', 27); break;
                    case 'B': cube.move('U U F U U'); helper.errorCheck(Faces.B, 0, 1, 'B', 28); break;
                }
            }
            if(face.data[2][1] === 'U') {
                color = helper.getColor(Faces.L, '21');
                switch (color) {
                    case 'F': cube.move('L\' F L'); helper.errorCheck(Faces.F, 0, 1, 'F', 29); break;
                    case 'L': cube.move('U L B\' L\' U\''); helper.errorCheck(Faces.L, 0, 1, 'L', 30); break;
                    case 'R': cube.move('L U\' B\' U L\''); helper.errorCheck(Faces.R, 0, 1, 'R', 31); break;
                    case 'B': cube.move('L B\' L\''); helper.errorCheck(Faces.B, 0, 1, 'B', 32); break;
                }
            }

        },

        solveBackFace: () => {

            LogManager.log('Solving tile on the back face', LogLevel.info);

            let face: Face = cube.faces[Faces.B], color: string;
            if(face.data[0][1] === 'U') {
                color = helper.getColor(Faces.B, '01');
                switch (color) {
                    case 'F': cube.move('B U L U\' B\''); helper.errorCheck(Faces.F, 0, 1, 'F', 33); break;
                    case 'L': cube.move('B L'); helper.errorCheck(Faces.L, 0, 1, 'L', 34); break;
                    case 'R': cube.move('B\' R\''); helper.errorCheck(Faces.R, 0, 1, 'R', 35); break;
                    case 'B': cube.move('B\' U R\' U\''); helper.errorCheck(Faces.B, 0, 1, 'B', 36); break;
                }
            }
            if(face.data[1][0] === 'U') {
                color = helper.getColor(Faces.B, '10');
                switch (color) {
                    case 'F': cube.move('U\' R\' U'); helper.errorCheck(Faces.F, 0, 1, 'F', 37); break;
                    case 'L': cube.move('U U R\' U U'); helper.errorCheck(Faces.L, 0, 1, 'L', 38); break;
                    case 'R': cube.move('R\''); helper.errorCheck(Faces.R, 0, 1, 'R', 39); break;
                    case 'B': cube.move('U R\' U\''); helper.errorCheck(Faces.B, 0, 1, 'B', 40); break;
                }
            }
            if(face.data[1][2] === 'U') {
                color = helper.getColor(Faces.B, '12');
                switch (color) {
                    case 'F': cube.move('U L U\''); helper.errorCheck(Faces.F, 0, 1, 'F', 41); break;
                    case 'L': cube.move('L'); helper.errorCheck(Faces.L, 0, 1, 'L', 42); break;
                    case 'R': cube.move('U U L U U'); helper.errorCheck(Faces.R, 0, 1, 'R', 43); break;
                    case 'B': cube.move('U\' L U'); helper.errorCheck(Faces.B, 0, 1, 'B', 44); break;
                }
            }
            if(face.data[2][1] === 'U') {
                color = helper.getColor(Faces.B, '21');
                switch (color) {
                    case 'F': cube.move('B\' U L U\' B'); helper.errorCheck(Faces.F, 0, 1, 'F', 45); break;
                    case 'L': cube.move('B\' L B'); helper.errorCheck(Faces.L, 0, 1, 'L', 46); break;
                    case 'R': cube.move('B R\' B\''); helper.errorCheck(Faces.R, 0, 1, 'R', 47); break;
                    case 'B': cube.move('B U R\' U\''); helper.errorCheck(Faces.B, 0, 1, 'B', 48); break;
                }
            }

        },

        solveRightFace: () => {

            LogManager.log('Solving tile on the right face', LogLevel.info);

            let face: Face = cube.faces[Faces.R], color: string;
            if(face.data[0][1] === 'U') {
                color = helper.getColor(Faces.R, '01');
                switch (color) {
                    case 'F': cube.move('R\' F\''); helper.errorCheck(Faces.F, 0, 1, 'F', 49); break;
                    case 'L': cube.move('R\' U\' F\' U'); helper.errorCheck(Faces.L, 0, 1, 'L', 50); break;
                    case 'R': cube.move('R\' U F\' U\''); helper.errorCheck(Faces.R, 0, 1, 'R', 51); break;
                    case 'B': cube.move('R B'); helper.errorCheck(Faces.B, 0, 1, 'B', 52); break;
                }
            }
            if(face.data[1][0] === 'U') {
                color = helper.getColor(Faces.R, '10');
                switch (color) {
                    case 'F': cube.move('F\''); helper.errorCheck(Faces.F, 0, 1, 'F', 53); break;
                    case 'L': cube.move('U\' F\' U'); helper.errorCheck(Faces.L, 0, 1, 'L', 54); break;
                    case 'R': cube.move('U F\' U\''); helper.errorCheck(Faces.R, 0, 1, 'R', 55); break;
                    case 'B': cube.move('U U F\' U U'); helper.errorCheck(Faces.B, 0, 1, 'B', 56); break;
                }
            }
            if(face.data[1][2] === 'U') {
                color = helper.getColor(Faces.R, '12');
                switch (color) {
                    case 'F': cube.move('U U B U U'); helper.errorCheck(Faces.F, 0, 1, 'F', 57); break;
                    case 'L': cube.move('U B U\''); helper.errorCheck(Faces.L, 0, 1, 'L', 58); break;
                    case 'R': cube.move('U\' B U'); helper.errorCheck(Faces.R, 0, 1, 'R', 59); break;
                    case 'B': cube.move('B'); helper.errorCheck(Faces.B, 0, 1, 'B', 60); break;
                }
            }
            if(face.data[2][1] === 'U') {
                color = helper.getColor(Faces.R, '21');
                switch (color) {
                    case 'F': cube.move('R F\' R\''); helper.errorCheck(Faces.F, 0, 1, 'F', 61); break;
                    case 'L': cube.move('U R\' B R U\''); helper.errorCheck(Faces.L, 0, 1, 'L', 62); break;
                    case 'R': cube.move('U\' R\' B R U'); helper.errorCheck(Faces.R, 0, 1, 'R', 63); break;
                    case 'B': cube.move('R\' B R'); helper.errorCheck(Faces.B, 0, 1, 'B', 64); break;
                }
            }

        },

        solveBottomFace: () => {

            LogManager.log('Solving tile on the bottom face', LogLevel.info);

            let downFace = cube.faces[Faces.D];

            let solve = () => {
                downFace = cube.faces[Faces.D];
                switch (cube.faces[Faces.F].data[2][1]) {
                    case 'F': cube.move('F F'); break;
                    case 'L': cube.move('D\' L L'); break;
                    case 'B': cube.move('D D B B'); break;
                    case 'R': cube.move('D R R'); break;
                    default: LogManager.log('Error while solving bottom side', LogLevel.error); break;
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

    LogManager.log('Solved upper cross', LogLevel.success);

}
