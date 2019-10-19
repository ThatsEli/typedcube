"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var logManager_1 = require("../manager/logManager");
var layerSolved_1 = require("../solveTester/layerSolved");
var solveSecondLayer_1 = require("../solveHelper/solveSecondLayer");
function solveFixSecondLayer(cube) {
    var helper = {
        positionFrontWrongCorners: function () {
            if (cube.faces[Cube_1.Faces.F].data[1][0] !== 'F') {
                cube.move('L D\' L\' D\' F\' D F');
            }
            else if (cube.faces[Cube_1.Faces.F].data[1][2] !== 'F') {
                cube.move('R\' D R D F D\' F\'');
            }
            solveSecondLayer_1.solveSecondLayer(cube);
        },
        positionLeftWrongCorners: function () {
            if (cube.faces[Cube_1.Faces.L].data[1][0] !== 'L') {
                cube.move('B D\' B\' D\' L\' D L');
            }
            else if (cube.faces[Cube_1.Faces.L].data[1][2] !== 'L') {
                cube.move('F\' D F D L D\' L\'');
            }
            solveSecondLayer_1.solveSecondLayer(cube);
        },
        positionBackWrongCorners: function () {
            if (cube.faces[Cube_1.Faces.B].data[1][0] !== 'B') {
                cube.move('R D\' R\' D\' B\' D B');
            }
            else if (cube.faces[Cube_1.Faces.B].data[1][2] !== 'B') {
                cube.move('L\' D L D B D\' B\'');
            }
            solveSecondLayer_1.solveSecondLayer(cube);
        },
        positionRightWrongCorners: function () {
            if (cube.faces[Cube_1.Faces.R].data[1][0] !== 'R') {
                cube.move('F D\' F\' D\' R\' D R');
            }
            else if (cube.faces[Cube_1.Faces.R].data[1][2] !== 'R') {
                cube.move('B\' D B D R D\' R\'');
            }
            solveSecondLayer_1.solveSecondLayer(cube);
        },
    };
    var needToFix = false;
    while (!layerSolved_1.layerSolved(cube, Cube_1.Faces.F, 1) || !layerSolved_1.layerSolved(cube, Cube_1.Faces.L, 1) ||
        !layerSolved_1.layerSolved(cube, Cube_1.Faces.B, 1) || !layerSolved_1.layerSolved(cube, Cube_1.Faces.R, 1)) {
        needToFix = true;
        logManager_1.LogManager.log('Fixing second layer', logManager_1.LogLevel.info);
        helper.positionFrontWrongCorners();
        helper.positionLeftWrongCorners();
        helper.positionBackWrongCorners();
        helper.positionRightWrongCorners();
    }
    if (needToFix) {
        logManager_1.LogManager.log('Fixed second layers', logManager_1.LogLevel.success);
    }
}
exports.solveFixSecondLayer = solveFixSecondLayer;
