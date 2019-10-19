"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../Cube");
function upCrossCheck(cube) {
    if (cube.faces[Cube_1.Faces.F].data[0][1] !== 'F')
        return false;
    if (cube.faces[Cube_1.Faces.L].data[0][1] !== 'L')
        return false;
    if (cube.faces[Cube_1.Faces.R].data[0][1] !== 'R')
        return false;
    if (cube.faces[Cube_1.Faces.B].data[0][1] !== 'B')
        return false;
    return true;
}
exports.upCrossCheck = upCrossCheck;
