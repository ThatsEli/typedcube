"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../Cube");
var UpCrossCheck_1 = require("../solveTester/UpCrossCheck");
var logManager_1 = require("../manager/logManager");
var solveWhiteCross_1 = require("./solveWhiteCross");
function solveFixWhiteCross(cube) {
    var helper = {
        getWrongCorner: function () {
            if (cube.faces[Cube_1.Faces.F].data[0][1] !== 'F')
                return 'F';
            if (cube.faces[Cube_1.Faces.L].data[0][1] !== 'L')
                return 'L';
            if (cube.faces[Cube_1.Faces.R].data[0][1] !== 'R')
                return 'R';
            if (cube.faces[Cube_1.Faces.B].data[0][1] !== 'B')
                return 'B';
            logManager_1.logManager.log('Error while fixing upper cross', logManager_1.LogLevel.error);
            process.exit();
            return '';
        },
        fixWrongCorner: function () {
            var corner = helper.getWrongCorner();
            switch (corner) {
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
            helper.fixPositionedCorner();
        },
        fixPositionedCorner: function () {
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
                    logManager_1.logManager.log('Error while fixing upper cross', logManager_1.LogLevel.error);
                    break;
            }
        }
    };
    var needToFix = false;
    while (!UpCrossCheck_1.upCrossCheck(cube)) {
        logManager_1.logManager.log('Cross needs to be fixed', logManager_1.LogLevel.warning);
        helper.fixWrongCorner();
        solveWhiteCross_1.solveWhiteCross(cube);
        needToFix = true;
    }
    if (needToFix)
        logManager_1.logManager.log('Fixed upper cross', logManager_1.LogLevel.success);
}
exports.solveFixWhiteCross = solveFixWhiteCross;
