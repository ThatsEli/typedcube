"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var upCrossCheck_1 = require("../solveTester/upCrossCheck");
var logManager_1 = require("../manager/logManager");
var solveUpperCross_1 = require("./solveUpperCross");
function solveFixUpperCross(cube) {
    var helper = {
        getWrongEdge: function () {
            if (cube.faces[Cube_1.Faces.F].data[0][1] !== 'F')
                return 'F';
            if (cube.faces[Cube_1.Faces.L].data[0][1] !== 'L')
                return 'L';
            if (cube.faces[Cube_1.Faces.R].data[0][1] !== 'R')
                return 'R';
            if (cube.faces[Cube_1.Faces.B].data[0][1] !== 'B')
                return 'B';
            logManager_1.LogManager.log('Error while fixing upper cross', logManager_1.LogLevel.error);
            return '';
        },
        fixWrongEdge: function () {
            var edge = helper.getWrongEdge();
            switch (edge) {
                case 'F':
                    cube.move('F F');
                    break;
                case 'L':
                    cube.move('L L D');
                    break;
                case 'R':
                    cube.move('R R D\'');
                    break;
                case 'B':
                    cube.move('B B D D');
                    break;
            }
            helper.fixPositionedEdge();
        },
        fixPositionedEdge: function () {
            var desination = cube.faces[Cube_1.Faces.F].data[2][1];
            switch (desination) {
                case 'F':
                    cube.move('F F');
                    break;
                case 'L':
                    cube.move('D\' L L');
                    break;
                case 'R':
                    cube.move('D R R');
                    break;
                case 'B':
                    cube.move('D D B B');
                    break;
                default:
                    logManager_1.LogManager.log('Error while fixing upper cross', logManager_1.LogLevel.error);
                    break;
            }
        }
    };
    var needToFix = false;
    while (!upCrossCheck_1.upCrossCheck(cube)) {
        logManager_1.LogManager.log('Cross needs to be fixed', logManager_1.LogLevel.warning);
        helper.fixWrongEdge();
        solveUpperCross_1.solveUpperCross(cube);
        needToFix = true;
    }
    if (needToFix)
        logManager_1.LogManager.log('Fixed upper cross', logManager_1.LogLevel.success);
}
exports.solveFixUpperCross = solveFixUpperCross;
