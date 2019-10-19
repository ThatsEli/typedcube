"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function crossOnFace(cube, face) {
    var faceData = cube.faces[face].data, color = faceData[0][1];
    if (faceData[1][0] !== color)
        return false;
    if (faceData[1][1] !== color)
        return false;
    if (faceData[1][2] !== color)
        return false;
    if (faceData[2][1] !== color)
        return false;
    return true;
}
exports.crossOnFace = crossOnFace;
