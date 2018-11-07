import { Cube, Faces } from "../Cube";

export function solveWhiteFace(cube: Cube) {

    solveWhiteCross(cube);

}

function solveWhiteCross(cube: Cube) {

    let helpers = {

        bottomFaceSideCheck: () => {
            console.log(cube.faces[Faces.F].data[2][1]);
            switch (cube.faces[Faces.F].data[2][1]) {
                case 'F': cube.move('F F'); break;
                case 'R': cube.move('D R R'); break;
                case 'B': cube.move('D D B B'); break;
                case 'L': cube.move('D\' L L'); break;
            }
        },

        edgeOnFace: (edgeFace: string, face: Faces): boolean => {
            let faceData = cube.faces[face].data;
            if(faceData[0][1] == edgeFace || faceData[1][0] == edgeFace || faceData[1][2] == edgeFace || faceData[2][1] == edgeFace) {
                return true;
            } else return false;
        },

        bottomFace: () => {
            let bottomFace = cube.faces[Faces.D];
    
            if(bottomFace.data[0][1] === 'U') {
                console.log('Found! [0][1]');
                helpers.bottomFaceSideCheck();
            }
            if(bottomFace.data[1][0] === 'U') {
                console.log('Found! [1][0]');
                cube.move('D');
                helpers.bottomFaceSideCheck();
            }
            if(bottomFace.data[1][2] === 'U') {
                console.log('Found! [1][2]');
                cube.move('D\'');
                helpers.bottomFaceSideCheck();
            }
            if(bottomFace.data[2][1] === 'U') {
                console.log('Found! [2][1]');
                cube.move('D D');
                helpers.bottomFaceSideCheck();
            }
        }

    };

    

    while(helpers.edgeOnFace('U', Faces.D)) {
        console.log(cube.faces[Faces.U]);
        helpers.bottomFace();
        console.log(cube.faces[Faces.U]);
    }

    console.log(cube.faces[Faces.B]);

}
