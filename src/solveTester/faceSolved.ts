import { Cube, Faces } from "../classes/Cube";

export function faceSolved(cube: Cube, face: Faces): boolean {

    let faceData = cube.faces[face].data,
        faceColor = faceData[1][1];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(faceData[i][j] !== faceColor) {
                return false;
            }
        }
    }
    return true;

}
