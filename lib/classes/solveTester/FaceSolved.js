"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function faceSolved(cube, face) {
    var faceData = cube.faces[face].data, faceColor = faceData[1][1];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (faceData[i][j] !== faceColor) {
                return false;
            }
        }
    }
    return true;
}
exports.faceSolved = faceSolved;
