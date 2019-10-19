"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faceSolved_1 = require("./faceSolved");
function cubeSolved(cube) {
    for (var i = 0; i < 6; i++) {
        if (!faceSolved_1.faceSolved(cube, i)) {
            return false;
        }
    }
    return true;
}
exports.cubeSolved = cubeSolved;
