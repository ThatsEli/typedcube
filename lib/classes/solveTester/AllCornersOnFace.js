"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function allCornersOnFace(cube, corner, face) {
    var faceData = cube.faces[face].data;
    if (faceData[0][0] !== corner)
        return false;
    if (faceData[0][2] !== corner)
        return false;
    if (faceData[2][0] !== corner)
        return false;
    if (faceData[2][2] !== corner)
        return false;
    return true;
}
exports.allCornersOnFace = allCornersOnFace;
