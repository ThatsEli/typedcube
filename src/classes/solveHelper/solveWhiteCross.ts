import { Cube, Faces } from "../Cube";
import { Face } from "../Face";
import { logManager } from "../manager/logManager";

export function solveWhiteCross(cube: Cube) { // solve the white cross

    let helper = {

        edgeOnFace: (edgeFace: string, face: Faces): boolean => {
            let faceData = cube.faces[face].data;
            if(faceData[0][1] == edgeFace || faceData[1][0] == edgeFace || faceData[1][2] == edgeFace || faceData[2][1] == edgeFace) {
                return true;
            } else return false;
        },

        clearUpperFace: () => {
            let upperFace = cube.faces[Faces.U];
            while(helper.edgeOnFace('U', Faces.U)) {
                if(upperFace.data[0][1] === 'U') { cube.move('B'); }
                if(upperFace.data[1][0] === 'U') { cube.move('L'); }
                if(upperFace.data[1][2] === 'U') { cube.move('R'); }
                if(upperFace.data[2][1] === 'U') { cube.move('F'); }
            }
        },

        // clearDownFace: () => {
        //     let downFace = cube.faces[Faces.D];
        //     while(helper.edgeOnFace('U', Faces.D)) {
        //         if(downFace.data[0][1] === 'U') { cube.move('F F'); }
        //         if(downFace.data[1][0] === 'U') { cube.move('L L'); }
        //         if(downFace.data[1][2] === 'U') { cube.move('R R'); }
        //         if(downFace.data[2][1] === 'U') { cube.move('B B'); }
        //     }
        // },

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

        solveSideFaces: () => {

            let faces = [Faces.F, Faces.R, Faces.B, Faces.L];

            for (let i = 0; i < faces.length; i++) {

                if(faces[i] === Faces.R) { cube.move('U\''); }
                if(faces[i] === Faces.B) { cube.move('U\' U\''); }
                if(faces[i] === Faces.L) { cube.move('U'); }

                if(faces[i] === Faces.L) {
                    console.log(8, cube.faces[faces[i]].data, cube.faces[faces[i]].data[0][1]);
                }

                let face: Face = cube.faces[faces[i]], color: string;
                if(face.data[0][1] === 'U') {
                    color = helper.getColor(faces[i], '01');
                    switch (color) {
                        case 'F': cube.move('F U\' R U'); break;
                        case 'L': cube.move('F\' L\''); break;
                        case 'R': cube.move('F R'); break;
                        case 'B': cube.move('F U R U\''); break;
                    }
                }
                if(face.data[1][0] === 'U') {
                    color = helper.getColor(faces[i], '10');
                    switch (color) {
                        case 'F': cube.move('U L\' U\''); break;
                        case 'L': cube.move('L\''); break;
                        case 'R': cube.move('U U L\' U U'); break;
                        case 'B': cube.move('U\' L\' U'); break;
                    }
                }
                if(face.data[1][2] === 'U') {
                    color = helper.getColor(faces[i], '12');
                    switch (color) {
                        case 'F': cube.move('U\' R U'); break;
                        case 'L': cube.move('U U R U U'); break;
                        case 'R': cube.move('R'); break;
                        case 'B': cube.move('U R U\''); break;
                    }
                }
                if(face.data[2][1] === 'U') {
                    color = helper.getColor(faces[i], '21');
                    switch (color) {
                        case 'F': cube.move('F\' U\' R U'); break;
                        case 'L': cube.move('F L\' F\''); break;
                        case 'R': cube.move('F\' R F'); break;
                        case 'B': cube.move('D R\' B R'); break;
                    }
                }

                if(faces[i] === Faces.R) { cube.move('U'); }
                if(faces[i] === Faces.B) { cube.move('U U'); }
                if(faces[i] === Faces.L) { cube.move('U\''); }

            }

            
        },

        solveBottomSide: () => {
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

            if(downFace.data[0][1] === 'U') { console.log('[0][1]'); cube.move(''); solve(); }
            if(downFace.data[1][0] === 'U') { console.log('[1][0]'); cube.move('D'); solve(); }
            if(downFace.data[1][2] === 'U') { console.log('[1][2]'); cube.move('D\''); solve(); }
            if(downFace.data[2][1] === 'U') { console.log('[2][1]'); cube.move('D D'); solve(); }
        }

    };

    // helper.clearDownFace();
    // helper.clearUpperFace();

    while(helper.edgeOnFace('U', Faces.F) || helper.edgeOnFace('U', Faces.R) || helper.edgeOnFace('U', Faces.B) || helper.edgeOnFace('U', Faces.L) || helper.edgeOnFace('U', Faces.D)) {
        helper.solveSideFaces();
        helper.solveBottomSide();


        console.log(
            (helper.edgeOnFace('U', Faces.F) ? 'F er ' + cube.faces[Faces.F].data + '|' : 'F ok|'),
            (helper.edgeOnFace('U', Faces.R) ? 'R er ' + cube.faces[Faces.R].data + '|' : 'R ok|'),
            (helper.edgeOnFace('U', Faces.B) ? 'B er ' + cube.faces[Faces.B].data + '|' : 'B ok|'),
            (helper.edgeOnFace('U', Faces.L) ? 'L er ' + cube.faces[Faces.L].data + '|' : 'L ok|'),
            (helper.edgeOnFace('U', Faces.D) ? 'D er ' + cube.faces[Faces.D].data + '|' : 'D ok|'),
            cube.originalState
        );

    }

    console.log('Solved white edges!', cube.faces[Faces.U]);

}
