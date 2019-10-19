"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var logManager_1 = require("../manager/logManager");
var layerSolved_1 = require("../solveTester/layerSolved");
var solveUpperCorners_1 = require("./solveUpperCorners");
function solveFixUpperCorners(cube) {
    var helpers = {
        getWrongCorners: function () {
            if (cube.faces[Cube_1.Faces.F].data[0][0] !== 'F' || cube.faces[Cube_1.Faces.L].data[0][2] !== 'L') {
                return 'FL';
            }
            if (cube.faces[Cube_1.Faces.F].data[0][2] !== 'F' || cube.faces[Cube_1.Faces.R].data[0][0] !== 'R') {
                return 'FR';
            }
            if (cube.faces[Cube_1.Faces.B].data[0][2] !== 'B' || cube.faces[Cube_1.Faces.L].data[0][2] !== 'L') {
                return 'BL';
            }
            if (cube.faces[Cube_1.Faces.B].data[0][0] !== 'B' || cube.faces[Cube_1.Faces.R].data[0][0] !== 'R') {
                return 'BR';
            }
            logManager_1.LogManager.log('Error while fixing first layer', logManager_1.LogLevel.error);
            process.exit();
            return '';
        },
        fixWrongCorner: function (position) {
            switch (position) {
                case 'FL':
                    cube.move('L D L\'');
                    solveUpperCorners_1.solveUpperCorners(cube);
                    break;
                case 'FR':
                    cube.move('R\' D\' R');
                    solveUpperCorners_1.solveUpperCorners(cube);
                    break;
                case 'BL':
                    cube.move('L\' D\' L');
                    solveUpperCorners_1.solveUpperCorners(cube);
                    break;
                case 'BR':
                    cube.move('R D R\'');
                    solveUpperCorners_1.solveUpperCorners(cube);
                    break;
                default:
                    logManager_1.LogManager.log('Error 2 while fixing first layer', logManager_1.LogLevel.error);
                    break;
            }
        },
    };
    var needToFix = false;
    while (!layerSolved_1.layerSolved(cube, Cube_1.Faces.F, 0) || !layerSolved_1.layerSolved(cube, Cube_1.Faces.L, 0) ||
        !layerSolved_1.layerSolved(cube, Cube_1.Faces.B, 0) || !layerSolved_1.layerSolved(cube, Cube_1.Faces.R, 0)) {
        needToFix = true;
        logManager_1.LogManager.log('Fixing upper corners', logManager_1.LogLevel.info);
        var position = helpers.getWrongCorners();
        helpers.fixWrongCorner(position);
    }
    if (needToFix)
        logManager_1.LogManager.log('Fixed upper corners', logManager_1.LogLevel.success);
}
exports.solveFixUpperCorners = solveFixUpperCorners;
