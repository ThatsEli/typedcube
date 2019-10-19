"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var faceSolved_1 = require("../solveTester/faceSolved");
var logManager_1 = require("../manager/logManager");
var solveUpperCross_1 = require("./solveUpperCross");
var solveFixUpperCross_1 = require("./solveFixUpperCross");
var solveUpperCorners_1 = require("./solveUpperCorners");
var solveFixUpperCorners_1 = require("./solveFixUpperCorners");
function solveUpperFace(cube) {
    solveUpperCross_1.solveUpperCross(cube);
    solveFixUpperCross_1.solveFixUpperCross(cube);
    solveUpperCorners_1.solveUpperCorners(cube);
    solveFixUpperCorners_1.solveFixUpperCorners(cube);
    if (!faceSolved_1.faceSolved(cube, Cube_1.Faces.U)) {
        logManager_1.LogManager.log('Error while solving upper face', logManager_1.LogLevel.error);
    }
    logManager_1.LogManager.log('Solved white face', logManager_1.LogLevel.success);
}
exports.solveUpperFace = solveUpperFace;
