"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cornerOnFace(cube, cornerFace, face) {
    var faceData = cube.faces[face].data;
    if (faceData[0][0] === cornerFace || faceData[0][2] === cornerFace ||
        faceData[2][0] === cornerFace || faceData[2][2] === cornerFace) {
        return true;
    }
    return false;
}
exports.cornerOnFace = cornerOnFace;
