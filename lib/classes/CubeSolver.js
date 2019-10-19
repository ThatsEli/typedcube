"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cubeSolved_1 = require("../solveTester/cubeSolved");
var solveUpperFace_1 = require("../solveHelper/solveUpperFace");
var solveSecondLayer_1 = require("../solveHelper/solveSecondLayer");
var solveFixSecondLayer_1 = require("../solveHelper/solveFixSecondLayer");
var solveBottomFace_1 = require("../solveHelper/solveBottomFace");
var solveThirdLayer_1 = require("../solveHelper/solveThirdLayer");
var logManager_1 = require("../manager/logManager");
var CubeSolver = /** @class */ (function () {
    function CubeSolver(cube) {
        this.cube = cube;
    }
    CubeSolver.prototype.solveCube = function () {
        if (cubeSolved_1.cubeSolved(this.cube)) {
            return;
        }
        solveUpperFace_1.solveUpperFace(this.cube);
        solveSecondLayer_1.solveSecondLayer(this.cube);
        solveFixSecondLayer_1.solveFixSecondLayer(this.cube);
        solveBottomFace_1.solveBottomFace(this.cube);
        solveThirdLayer_1.solveThirdLayer(this.cube);
        if (!cubeSolved_1.cubeSolved(this.cube)) {
            logManager_1.LogManager.log('Error while solving the cube', logManager_1.LogLevel.error);
        }
        else {
            logManager_1.LogManager.log('Solved cube', logManager_1.LogLevel.success);
        }
    };
    return CubeSolver;
}());
exports.CubeSolver = CubeSolver;
