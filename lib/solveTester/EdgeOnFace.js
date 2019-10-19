"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function edgeOnFace(cube, edgeFace, face) {
    var faceData = cube.faces[face].data;
    if (faceData[0][1] == edgeFace || faceData[1][0] == edgeFace || faceData[1][2] == edgeFace || faceData[2][1] == edgeFace) {
        return true;
    }
    else
        return false;
}
exports.edgeOnFace = edgeOnFace;
