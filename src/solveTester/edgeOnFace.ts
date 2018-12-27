import { Cube, Faces } from '../classes/Cube';

export function edgeOnFace(cube: Cube, edgeFace: string, face: Faces): boolean  {
    let faceData = cube.faces[face].data;
    if(faceData[0][1] == edgeFace || faceData[1][0] == edgeFace || faceData[1][2] == edgeFace || faceData[2][1] == edgeFace) {
        return true;
    } else return false;
}
