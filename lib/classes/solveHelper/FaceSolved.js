"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function faceSolved(face) {
    var faceColor = face.data[0][0];
    for (var i = 0; i < 3; i++) {
        var row = face.data[i];
        for (var j = 0; j < 3; j++) {
            var cell = row[j];
            if (cell !== faceColor) {
                return false;
            }
        }
    }
    return true;
}
exports.faceSolved = faceSolved;
