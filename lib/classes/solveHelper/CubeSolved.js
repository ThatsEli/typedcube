"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FaceSolved_1 = require("./FaceSolved");
function cubeSolved(cube) {
    for (var i = 0; i < 6; i++) {
        if (!FaceSolved_1.faceSolved(cube.faces[i])) {
            return false;
        }
    }
    return true;
}
exports.cubeSolved = cubeSolved;
