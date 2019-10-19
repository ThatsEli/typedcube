"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../Cube");
var CornerOnFace_1 = require("../solveTester/CornerOnFace");
var AllCornersOnFace_1 = require("../solveTester/AllCornersOnFace");
var logManager_1 = require("../manager/logManager");
function solveWhiteCorners(cube) {
    var helper = {
        positionCorner: function (face) {
            var faceData = cube.faces[face].data;
            switch (face) {
                case Cube_1.Faces.F:
                    if (faceData[0][0] == 'U') {
                        cube.move('F\' D\' F D');
                        helper.errorCheck(face, 2, 0, 'U', 1);
                        return 'L';
                    }
                    if (faceData[0][2] == 'U') {
                        cube.move('F D F\' D\'');
                        helper.errorCheck(face, 2, 2, 'U', 2);
                        return 'R';
                    }
                    if (faceData[2][0] == 'U') {
                        return 'L';
                    }
                    if (faceData[2][2] == 'U') {
                        return 'R';
                    }
                    break;
                case Cube_1.Faces.L:
                    if (faceData[0][0] == 'U') {
                        cube.move('L\' D\' L D');
                        helper.errorCheck(face, 2, 0, 'U', 3);
                        return 'L';
                    }
                    if (faceData[0][2] == 'U') {
                        cube.move('L D L\' D\'');
                        helper.errorCheck(face, 2, 2, 'U', 4);
                        return 'R';
                    }
                    if (faceData[2][0] == 'U') {
                        return 'L';
                    }
                    if (faceData[2][2] == 'U') {
                        return 'R';
                    }
                    break;
                case Cube_1.Faces.B:
                    if (faceData[0][0] == 'U') {
                        cube.move('B\' D\' B D');
                        helper.errorCheck(face, 2, 0, 'U', 5);
                        return 'L';
                    }
                    if (faceData[0][2] == 'U') {
                        cube.move('B D B\' D\'');
                        helper.errorCheck(face, 2, 2, 'U', 6);
                        return 'R';
                    }
                    if (faceData[2][0] == 'U') {
                        return 'L';
                    }
                    if (faceData[2][2] == 'U') {
                        return 'R';
                    }
                    break;
                case Cube_1.Faces.R:
                    if (faceData[0][0] == 'U') {
                        cube.move('R\' D\' R D');
                        helper.errorCheck(face, 2, 0, 'U', 7);
                        return 'L';
                    }
                    if (faceData[0][2] == 'U') {
                        cube.move('R D R\' D\'');
                        helper.errorCheck(face, 2, 2, 'U', 8);
                        return 'R';
                    }
                    if (faceData[2][0] == 'U') {
                        return 'L';
                    }
                    if (faceData[2][2] == 'U') {
                        return 'R';
                    }
                    break;
            }
            logManager_1.logManager.log('Error while positioning corner for upper face', logManager_1.LogLevel.error);
            process.exit();
            return '';
        },
        errorCheck: function (face, pos1, pos2, compare, errorId) {
            if (cube.faces[face].data[pos1][pos2] !== compare) {
                logManager_1.logManager.log('Error while solving corners. ID:' + errorId, logManager_1.LogLevel.error);
                process.exit();
            }
        },
        getColors: function (face, position) {
            switch (face) {
                case Cube_1.Faces.F:
                    if (position === 'L') {
                        return cube.faces[Cube_1.Faces.L].data[2][2] + cube.faces[Cube_1.Faces.D].data[0][0];
                    }
                    if (position === 'R') {
                        return cube.faces[Cube_1.Faces.R].data[2][0] + cube.faces[Cube_1.Faces.D].data[0][2];
                    }
                    break;
                case Cube_1.Faces.L:
                    if (position === 'L') {
                        return cube.faces[Cube_1.Faces.B].data[2][2] + cube.faces[Cube_1.Faces.D].data[2][0];
                    }
                    if (position === 'R') {
                        return cube.faces[Cube_1.Faces.F].data[2][0] + cube.faces[Cube_1.Faces.D].data[0][0];
                    }
                    break;
                case Cube_1.Faces.B:
                    if (position === 'L') {
                        return cube.faces[Cube_1.Faces.R].data[2][2] + cube.faces[Cube_1.Faces.D].data[2][2];
                    }
                    if (position === 'R') {
                        return cube.faces[Cube_1.Faces.L].data[2][0] + cube.faces[Cube_1.Faces.D].data[2][0];
                    }
                    break;
                case Cube_1.Faces.R:
                    if (position === 'L') {
                        return cube.faces[Cube_1.Faces.F].data[2][2] + cube.faces[Cube_1.Faces.D].data[0][2];
                    }
                    if (position === 'R') {
                        return cube.faces[Cube_1.Faces.B].data[2][0] + cube.faces[Cube_1.Faces.D].data[2][2];
                    }
                    break;
                case Cube_1.Faces.D:
                    return cube.faces[Cube_1.Faces.L].data[2][2] + cube.faces[Cube_1.Faces.F].data[2][0];
                    break;
            }
            logManager_1.logManager.log('Error while getting corner color', logManager_1.LogLevel.error);
            process.exit();
            return '';
        },
        insertFrontCorners: function () {
            var position = helper.positionCorner(Cube_1.Faces.F), colors = helper.getColors(Cube_1.Faces.F, position);
            logManager_1.logManager.log('Inserting corner on the front face', logManager_1.LogLevel.info);
            if (position === 'L') {
                if (colors === 'LF') {
                    cube.move('D L D\' L\'');
                    helper.errorCheck(Cube_1.Faces.U, 2, 0, 'U', 9);
                }
                if (colors === 'FR') {
                    cube.move('D D F D\' F\'');
                    helper.errorCheck(Cube_1.Faces.U, 2, 2, 'U', 10);
                }
                if (colors === 'RB') {
                    cube.move('D\' R D\' R\'');
                    helper.errorCheck(Cube_1.Faces.U, 0, 2, 'U', 11);
                }
                if (colors === 'BL') {
                    cube.move('B D\' B\'');
                    helper.errorCheck(Cube_1.Faces.U, 0, 0, 'U', 12);
                }
            }
            else if (position === 'R') {
                if (colors === 'FL') {
                    cube.move('D D F\' D F');
                    helper.errorCheck(Cube_1.Faces.U, 2, 0, 'U', 13);
                }
                if (colors === 'RF') {
                    cube.move('D\' R\' D R');
                    helper.errorCheck(Cube_1.Faces.U, 2, 2, 'U', 14);
                }
                if (colors === 'BR') {
                    cube.move('B\' D B');
                    helper.errorCheck(Cube_1.Faces.U, 0, 2, 'U', 15);
                }
                if (colors === 'LB') {
                    cube.move('L\' D D L');
                    helper.errorCheck(Cube_1.Faces.U, 0, 0, 'U', 16);
                }
            }
        },
        insertLeftCorners: function () {
            var position = helper.positionCorner(Cube_1.Faces.L), colors = helper.getColors(Cube_1.Faces.L, position);
            logManager_1.logManager.log('Inserting corner on the left face', logManager_1.LogLevel.info);
            if (position === 'L') {
                if (colors === 'BL') {
                    cube.move('D B D\' B\'');
                    helper.errorCheck(Cube_1.Faces.U, 0, 0, 'U', 17);
                }
                if (colors === 'LF') {
                    cube.move('D D L D\' L\'');
                    helper.errorCheck(Cube_1.Faces.U, 2, 0, 'U', 18);
                }
                if (colors === 'FR') {
                    cube.move('D\' F D\' F\'');
                    helper.errorCheck(Cube_1.Faces.U, 2, 2, 'U', 19);
                }
                if (colors === 'RB') {
                    cube.move('R D\' R\'');
                    helper.errorCheck(Cube_1.Faces.U, 0, 2, 'U', 20);
                }
            }
            else if (position === 'R') {
                if (colors === 'LB') {
                    cube.move('D D L\' D L');
                    helper.errorCheck(Cube_1.Faces.U, 0, 0, 'U', 21);
                }
                if (colors === 'FL') {
                    cube.move('D\' F\' D F');
                    helper.errorCheck(Cube_1.Faces.U, 2, 0, 'U', 22);
                }
                if (colors === 'RF') {
                    cube.move('R\' D R');
                    helper.errorCheck(Cube_1.Faces.U, 2, 2, 'U', 23);
                }
                if (colors === 'BR') {
                    cube.move('B\' D D B');
                    helper.errorCheck(Cube_1.Faces.U, 0, 2, 'U', 24);
                }
            }
        },
        insertBackCorners: function () {
            var position = helper.positionCorner(Cube_1.Faces.B), colors = helper.getColors(Cube_1.Faces.B, position);
            logManager_1.logManager.log('Inserting corner on the back face', logManager_1.LogLevel.info);
            if (position === 'L') {
                if (colors === 'RB') {
                    cube.move('D R D\' R\'');
                    helper.errorCheck(Cube_1.Faces.U, 0, 2, 'U', 25);
                }
                if (colors === 'BL') {
                    cube.move('D D B D\' B\'');
                    helper.errorCheck(Cube_1.Faces.U, 0, 0, 'U', 26);
                }
                if (colors === 'LF') {
                    cube.move('D\' L D\' L\'');
                    helper.errorCheck(Cube_1.Faces.U, 2, 0, 'U', 27);
                }
                if (colors === 'FR') {
                    cube.move('F D\' F\'');
                    helper.errorCheck(Cube_1.Faces.U, 2, 2, 'U', 28);
                }
            }
            else if (position === 'R') {
                if (colors === 'BR') {
                    cube.move('D D B\' D B');
                    helper.errorCheck(Cube_1.Faces.U, 0, 2, 'U', 29);
                }
                if (colors === 'LB') {
                    cube.move('D\' L\' D L');
                    helper.errorCheck(Cube_1.Faces.U, 0, 0, 'U', 30);
                }
                if (colors === 'FL') {
                    cube.move('F\' D F');
                    helper.errorCheck(Cube_1.Faces.U, 2, 0, 'U', 31);
                }
                if (colors === 'RF') {
                    cube.move('R\' D D R');
                    helper.errorCheck(Cube_1.Faces.U, 2, 2, 'U', 32);
                }
            }
        },
        insertRightCorners: function () {
            var position = helper.positionCorner(Cube_1.Faces.R), colors = helper.getColors(Cube_1.Faces.R, position);
            logManager_1.logManager.log('Inserting corner on the right face', logManager_1.LogLevel.info);
            if (position === 'L') {
                if (colors === 'FR') {
                    cube.move('D F D\' F\'');
                    helper.errorCheck(Cube_1.Faces.U, 2, 2, 'U', 33);
                }
                if (colors === 'RB') {
                    cube.move('D D R D\' R\'');
                    helper.errorCheck(Cube_1.Faces.U, 0, 2, 'U', 34);
                }
                if (colors === 'BL') {
                    cube.move('D\' B D\' B\'');
                    helper.errorCheck(Cube_1.Faces.U, 0, 0, 'U', 35);
                }
                if (colors === 'LF') {
                    cube.move('L D\' L\'');
                    helper.errorCheck(Cube_1.Faces.U, 2, 0, 'U', 36);
                }
            }
            else if (position === 'R') {
                if (colors === 'RF') {
                    cube.move('D D R\' D R');
                    helper.errorCheck(Cube_1.Faces.U, 2, 2, 'U', 37);
                }
                if (colors === 'BR') {
                    cube.move('D\' B\' D B');
                    helper.errorCheck(Cube_1.Faces.U, 0, 2, 'U', 38);
                }
                if (colors === 'LB') {
                    cube.move('L\' D L');
                    helper.errorCheck(Cube_1.Faces.U, 0, 0, 'U', 39);
                }
                if (colors === 'FL') {
                    cube.move('F\' D D F');
                    helper.errorCheck(Cube_1.Faces.U, 2, 0, 'U', 40);
                }
            }
        },
        insertDownCorners: function () {
            logManager_1.logManager.log('Inserting corner on the down face', logManager_1.LogLevel.info);
            var faceData = cube.faces[Cube_1.Faces.D].data;
            if (faceData[0][2] === 'U') {
                cube.move('D\'');
            }
            else if (faceData[2][2] === 'U') {
                cube.move('D\' D\'');
            }
            else if (faceData[2][0] === 'U') {
                cube.move('D');
            }
            var colors = helper.getColors(Cube_1.Faces.D, '');
            if (cube.faces[Cube_1.Faces.D].data[0][0] === 'U') {
                switch (colors) {
                    case 'FL':
                        cube.move('F\' D F L D\' D\' L\'');
                        break;
                    case 'RF':
                        cube.move('D R\' D\' D\' R D D F D\' F\'');
                        break;
                    case 'BR':
                        cube.move('D D B\' D B D\' R D\' R\'');
                        break;
                    case 'LB':
                        cube.move('D\' L\' D\' D\' L D D B D\' B\'');
                        break;
                    default:
                        logManager_1.logManager.log('Error while inserting bottom corner', logManager_1.LogLevel.error);
                        process.exit();
                        break;
                }
            }
            else {
                logManager_1.logManager.log('Another error while inserting bottom corners', logManager_1.LogLevel.error);
                process.exit();
            }
        },
    };
    while (!AllCornersOnFace_1.allCornersOnFace(cube, 'U', Cube_1.Faces.U)) {
        if (CornerOnFace_1.cornerOnFace(cube, 'U', Cube_1.Faces.F)) {
            helper.insertFrontCorners();
        }
        if (CornerOnFace_1.cornerOnFace(cube, 'U', Cube_1.Faces.L)) {
            helper.insertLeftCorners();
        }
        if (CornerOnFace_1.cornerOnFace(cube, 'U', Cube_1.Faces.B)) {
            helper.insertBackCorners();
        }
        if (CornerOnFace_1.cornerOnFace(cube, 'U', Cube_1.Faces.R)) {
            helper.insertRightCorners();
        }
        if (CornerOnFace_1.cornerOnFace(cube, 'U', Cube_1.Faces.D)) {
            helper.insertDownCorners();
        }
    }
    logManager_1.logManager.log('Solved white corners!', logManager_1.LogLevel.success);
}
exports.solveWhiteCorners = solveWhiteCorners;
