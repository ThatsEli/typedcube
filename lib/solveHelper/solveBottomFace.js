"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var logManager_1 = require("../manager/logManager");
var faceSolved_1 = require("../solveTester/faceSolved");
function solveBottomFace(cube) {
    var faceSolutions = [
        {
            name: 'eight',
            pattern: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
            downPosition: 0,
            action: 'R'
        },
        {
            name: 'spaceinvader front',
            pattern: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }],
            action: 'R'
        },
        {
            name: 'spaceinvader sides',
            pattern: [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
            action: 'R'
        },
        {
            name: 'fish left',
            pattern: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
            upperPosition: 2,
            downPosition: 0,
            action: 'L'
        },
        {
            name: 'fish right',
            pattern: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
            upperPosition: 0,
            downPosition: 2,
            action: 'R'
        },
        {
            name: 'cross front and sides',
            pattern: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }],
            upperPosition: 2,
            downPosition: 2,
            action: 'R'
        },
        {
            name: 'cross front and back',
            pattern: [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 },],
            action: 'R'
        }
    ];
    var helper = {
        getInvertedLRotation: function () {
            var faceData = cube.faces[Cube_1.Faces.D].data, faceColor = faceData[1][1];
            if (faceData[0][1] === faceColor && faceData[1][0] === faceColor)
                return 'FL';
            if (faceData[0][1] === faceColor && faceData[1][2] === faceColor)
                return 'FR';
            if (faceData[2][1] === faceColor && faceData[1][0] === faceColor)
                return 'BL';
            if (faceData[2][1] === faceColor && faceData[1][2] === faceColor)
                return 'BR';
            return '';
        },
        orientBottomFace: function () {
            var invertedLRotation = helper.getInvertedLRotation();
            while (invertedLRotation === '') {
                cube.move('B R D R\' D\' B\'');
                invertedLRotation = helper.getInvertedLRotation();
            }
            switch (invertedLRotation) {
                case 'FL': /* */ break;
                case 'FR':
                    cube.move('D\'');
                    break;
                case 'BL':
                    cube.move('D');
                    break;
                case 'BR':
                    cube.move('D D');
                    break;
                default:
                    logManager_1.LogManager.log('Error while orienting bottom face', logManager_1.LogLevel.error);
                    break;
            }
        },
        createBeamAndContinue: function () {
            if (cube.faces[Cube_1.Faces.D].data[1].join('') === 'DDD') {
                return;
            }
            cube.move('B R D R\' D\' B\''); // beam move
            if (cube.faces[Cube_1.Faces.D].data[1].join('') !== 'DDD') {
                logManager_1.LogManager.log('Error while creating the beam', logManager_1.LogLevel.error);
            }
            cube.move('B R D R\' D\' B\''); // beam move
        },
        checkForPattern: function (faceSolution) {
            var matchPattern = function (faceSolution) {
                var faceData = cube.faces[Cube_1.Faces.D].data, color = faceData[1][1];
                for (var i = 0; i < faceSolution.pattern.length; i++) {
                    var pattern = faceSolution.pattern[i];
                    if (faceData[pattern.x][pattern.y] !== color) {
                        return false;
                    }
                }
                if (faceSolution.upperPosition) {
                    if (cube.faces[Cube_1.Faces.F].data[2][faceSolution.upperPosition] !== color)
                        return false;
                }
                if (faceSolution.downPosition) {
                    if (cube.faces[Cube_1.Faces.B].data[2][2 - faceSolution.downPosition] !== color)
                        return false;
                }
                return true;
            };
            for (var i = 0; i < 4; i++) {
                if (matchPattern(faceSolution))
                    return true;
                cube.move('D');
            }
            return false;
        },
        completeBottomFace: function () {
            for (var i = 0; i < faceSolutions.length; ++i) {
                if (helper.checkForPattern(faceSolutions[i])) {
                    if (faceSolutions[i].action === 'L') {
                        cube.move('L\' D\' L D\' L\' D\' D\' L');
                    }
                    else {
                        if (cube.faces[Cube_1.Faces.B].data[2][2] !== 'D') {
                            cube.move('D D');
                        }
                        cube.move('R D R\' D R D D R\'');
                        helper.completeBottomFace();
                    }
                    break;
                }
            }
        },
    };
    helper.orientBottomFace();
    helper.createBeamAndContinue();
    helper.completeBottomFace();
    if (!faceSolved_1.faceSolved(cube, Cube_1.Faces.D)) {
        logManager_1.LogManager.log('Error while solving bottom face', logManager_1.LogLevel.error);
    }
    logManager_1.LogManager.log('Solved bottom face', logManager_1.LogLevel.success);
}
exports.solveBottomFace = solveBottomFace;
