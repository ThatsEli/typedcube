"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var logManager_1 = require("../manager/logManager");
var Tools_1 = require("../classes/Tools");
function solveSecondLayer(cube) {
    var helper = {
        colorValid: function (color) {
            return !color.includes('D');
        },
        getColors: function (face) {
            switch (face) {
                case Cube_1.Faces.F:
                    return cube.faces[Cube_1.Faces.F].data[2][1] + cube.faces[Cube_1.Faces.D].data[0][1];
                    break;
                case Cube_1.Faces.L:
                    return cube.faces[Cube_1.Faces.L].data[2][1] + cube.faces[Cube_1.Faces.D].data[1][0];
                    break;
                case Cube_1.Faces.B:
                    return cube.faces[Cube_1.Faces.B].data[2][1] + cube.faces[Cube_1.Faces.D].data[2][1];
                    break;
                case Cube_1.Faces.R:
                    return cube.faces[Cube_1.Faces.R].data[2][1] + cube.faces[Cube_1.Faces.D].data[1][2];
                    break;
            }
            logManager_1.LogManager.log('Error while getting colors for solving the second layer', logManager_1.LogLevel.error);
            return '';
        },
        errorCheck: function (face1, pos11, pos12, face2, pos21, pos22, errorId) {
            if (cube.faces[face1].data[pos11][pos12] !== Tools_1.Tools.faceToString(face1) ||
                cube.faces[face2].data[pos21][pos22] !== Tools_1.Tools.faceToString(face2)) {
                logManager_1.LogManager.log('Error while positioning edge on second layer. ID:' + errorId, logManager_1.LogLevel.error);
            }
        },
        positionFrontCorners: function () {
            switch (helper.getColors(Cube_1.Faces.F)) {
                case 'FL': /* --- */
                    cube.move('D L D\' L\' D\' F\' D F');
                    helper.errorCheck(Cube_1.Faces.F, 1, 0, Cube_1.Faces.L, 1, 2, 1);
                    break;
                case 'LF':
                    cube.move('D\' D\' F\' D F D L D\' L\'');
                    helper.errorCheck(Cube_1.Faces.F, 1, 0, Cube_1.Faces.L, 1, 2, 1);
                    break;
                case 'FR': /* --- */
                    cube.move('D\' R\' D R D F D\' F\'');
                    helper.errorCheck(Cube_1.Faces.F, 1, 2, Cube_1.Faces.R, 1, 0, 3);
                    break;
                case 'RF':
                    cube.move('D D F D\' F\' D\' R\' D R');
                    helper.errorCheck(Cube_1.Faces.F, 1, 2, Cube_1.Faces.R, 1, 0, 4);
                    break;
                case 'LB': /* --- */
                    cube.move('D\' D B D\' B\' D\' L\' D L ');
                    helper.errorCheck(Cube_1.Faces.L, 1, 0, Cube_1.Faces.B, 1, 2, 5);
                    break;
                case 'BL':
                    cube.move('D D D\' L\' D L D B D\' B\'');
                    helper.errorCheck(Cube_1.Faces.L, 1, 0, Cube_1.Faces.B, 1, 2, 6);
                    break;
                case 'RB': /* --- */
                    cube.move('D D\' B\' D B D R D\' R\'');
                    helper.errorCheck(Cube_1.Faces.R, 1, 2, Cube_1.Faces.B, 1, 0, 7);
                    break;
                case 'BR':
                    cube.move('D D D R D\' R\' D\' B\' D B');
                    helper.errorCheck(Cube_1.Faces.R, 1, 2, Cube_1.Faces.B, 1, 0, 8);
                    break;
            }
        },
        positionLeftCorners: function () {
            switch (helper.getColors(Cube_1.Faces.L)) {
                case 'FL': /* --- */
                    cube.move('D D L D\' L\' D\' F\' D F');
                    helper.errorCheck(Cube_1.Faces.F, 1, 0, Cube_1.Faces.L, 1, 2, 9);
                    break;
                case 'LF':
                    cube.move('D\' F\' D F D L D\' L\'');
                    helper.errorCheck(Cube_1.Faces.F, 1, 0, Cube_1.Faces.L, 1, 2, 10);
                    break;
                case 'FR': /* --- */
                    cube.move('D D\'  R\' D R D F D\' F\'');
                    helper.errorCheck(Cube_1.Faces.F, 1, 2, Cube_1.Faces.R, 1, 0, 11);
                    break;
                case 'RF':
                    cube.move('D\' F D\' F\' D\' R\' D R');
                    helper.errorCheck(Cube_1.Faces.F, 1, 2, Cube_1.Faces.R, 1, 0, 12);
                    break;
                case 'LB': /* --- */
                    cube.move('D B D\' B\' D\' L\' D L ');
                    helper.errorCheck(Cube_1.Faces.L, 1, 0, Cube_1.Faces.B, 1, 2, 13);
                    break;
                case 'BL':
                    cube.move('D D L\' D L D B D\' B\'');
                    helper.errorCheck(Cube_1.Faces.L, 1, 0, Cube_1.Faces.B, 1, 2, 14);
                    break;
                case 'RB': /* --- */
                    cube.move('D\' D\' D\' B\' D B D R D\' R\'');
                    helper.errorCheck(Cube_1.Faces.R, 1, 2, Cube_1.Faces.B, 1, 0, 15);
                    break;
                case 'BR':
                    cube.move('D\' D R D\' R\' D\' B\' D B');
                    helper.errorCheck(Cube_1.Faces.R, 1, 2, Cube_1.Faces.B, 1, 0, 16);
                    break;
            }
        },
        positionBackCorners: function () {
            switch (helper.getColors(Cube_1.Faces.B)) {
                case 'FL': /* --- */
                    cube.move('D D D L D\' L\' D\' F\' D F');
                    helper.errorCheck(Cube_1.Faces.F, 1, 0, Cube_1.Faces.L, 1, 2, 17);
                    break;
                case 'LF':
                    cube.move('D D\' F\' D F D L D\' L\'');
                    helper.errorCheck(Cube_1.Faces.F, 1, 0, Cube_1.Faces.L, 1, 2, 18);
                    break;
                case 'FR': /* --- */
                    cube.move('D D D\'  R\' D R D F D\' F\'');
                    helper.errorCheck(Cube_1.Faces.F, 1, 2, Cube_1.Faces.R, 1, 0, 19);
                    break;
                case 'RF':
                    cube.move('F D\' F\' D\' R\' D R');
                    helper.errorCheck(Cube_1.Faces.F, 1, 2, Cube_1.Faces.R, 1, 0, 20);
                    break;
                case 'LB': /* --- */
                    cube.move('D D B D\' B\' D\' L\' D L');
                    helper.errorCheck(Cube_1.Faces.L, 1, 0, Cube_1.Faces.B, 1, 2, 21);
                    break;
                case 'BL':
                    cube.move('D\' L\' D L D B D\' B\'');
                    helper.errorCheck(Cube_1.Faces.L, 1, 0, Cube_1.Faces.B, 1, 2, 22);
                    break;
                case 'RB': /* --- */
                    cube.move('D\' D\' B\' D B D R D\' R\'');
                    helper.errorCheck(Cube_1.Faces.R, 1, 2, Cube_1.Faces.B, 1, 0, 23);
                    break;
                case 'BR':
                    cube.move('D R D\' R\' D\' B\' D B');
                    helper.errorCheck(Cube_1.Faces.R, 1, 2, Cube_1.Faces.B, 1, 0, 24);
                    break;
            }
        },
        positionRightCorners: function () {
            switch (helper.getColors(Cube_1.Faces.R)) {
                case 'FL': /* --- */
                    cube.move('D\' D L D\' L\' D\' F\' D F');
                    helper.errorCheck(Cube_1.Faces.F, 1, 0, Cube_1.Faces.L, 1, 2, 25);
                    break;
                case 'LF':
                    cube.move('D F\' D F D L D\' L\'');
                    helper.errorCheck(Cube_1.Faces.F, 1, 0, Cube_1.Faces.L, 1, 2, 26);
                    break;
                case 'FR': /* --- */
                    cube.move('D\' D\' R\' D R D F D\' F\'');
                    helper.errorCheck(Cube_1.Faces.F, 1, 2, Cube_1.Faces.R, 1, 0, 27);
                    break;
                case 'RF':
                    cube.move('D F D\' F\' D\' R\' D R');
                    helper.errorCheck(Cube_1.Faces.F, 1, 2, Cube_1.Faces.R, 1, 0, 28);
                    break;
                case 'LB': /* --- */
                    cube.move('D\' B D\' B\' D\' L\' D L');
                    helper.errorCheck(Cube_1.Faces.L, 1, 0, Cube_1.Faces.B, 1, 2, 29);
                    break;
                case 'BL':
                    cube.move('L\' D L D B D\' B\'');
                    helper.errorCheck(Cube_1.Faces.L, 1, 0, Cube_1.Faces.B, 1, 2, 30);
                    break;
                case 'RB': /* --- */
                    cube.move('D\' B\' D B D R D\' R\'');
                    helper.errorCheck(Cube_1.Faces.R, 1, 2, Cube_1.Faces.B, 1, 0, 31);
                    break;
                case 'BR':
                    cube.move('D D R D\' R\' D\' B\' D B');
                    helper.errorCheck(Cube_1.Faces.R, 1, 2, Cube_1.Faces.B, 1, 0, 32);
                    break;
            }
        },
        layerCornerOnFace: function (face) {
            var layerCorners = ['FL', 'LF', 'FR', 'RF', 'LB', 'BL', 'RB', 'BR'];
            return layerCorners.indexOf(helper.getColors(face)) > -1;
        },
    };
    while (helper.layerCornerOnFace(Cube_1.Faces.F) || helper.layerCornerOnFace(Cube_1.Faces.L) ||
        helper.layerCornerOnFace(Cube_1.Faces.B) || helper.layerCornerOnFace(Cube_1.Faces.R)) {
        logManager_1.LogManager.log('Positioning corner on second layer', logManager_1.LogLevel.info);
        helper.positionFrontCorners();
        helper.positionLeftCorners();
        helper.positionBackCorners();
        helper.positionRightCorners();
    }
    logManager_1.LogManager.log('Solved second layer', logManager_1.LogLevel.success);
}
exports.solveSecondLayer = solveSecondLayer;
