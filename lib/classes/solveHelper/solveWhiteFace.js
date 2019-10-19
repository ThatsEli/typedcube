"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../Cube");
var FaceSolved_1 = require("../solveTester/FaceSolved");
var solveWhiteCross_1 = require("./solveWhiteCross");
var solveFixWhiteCross_1 = require("./solveFixWhiteCross");
var solveWhiteCorners_1 = require("./solveWhiteCorners");
var logManager_1 = require("../manager/logManager");
function solveWhiteFace(cube) {
    solveWhiteCross_1.solveWhiteCross(cube);
    solveFixWhiteCross_1.solveFixWhiteCross(cube);
    solveWhiteCorners_1.solveWhiteCorners(cube);
    if (!FaceSolved_1.faceSolved(cube, Cube_1.Faces.U)) {
        logManager_1.logManager.log('Error while solving upper face', logManager_1.LogLevel.error);
        process.exit();
    }
    logManager_1.logManager.log('Solved white face', logManager_1.LogLevel.success);
}
exports.solveWhiteFace = solveWhiteFace;
