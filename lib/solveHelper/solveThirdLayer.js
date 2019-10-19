"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var logManager_1 = require("../manager/logManager");
var thirdLayerSolved_1 = require("../solveTester/thirdLayerSolved");
function solveThirdLayer(cube) {
    var helper = {
        getThirdLayer: function (face) {
            return cube.faces[face].data[2];
        },
        positionDownFace: function () {
            while (helper.getThirdLayer(Cube_1.Faces.B)[1] !== 'B') {
                cube.move('D');
            }
            if (helper.getThirdLayer(Cube_1.Faces.L)[1] === 'L' &&
                helper.getThirdLayer(Cube_1.Faces.F)[1] === 'F' &&
                helper.getThirdLayer(Cube_1.Faces.R)[1] === 'R') {
                return;
            }
            if (helper.getThirdLayer(Cube_1.Faces.L)[1] === 'L' && helper.getThirdLayer(Cube_1.Faces.R)[1] === 'R') {
                cube.move('D');
                cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\''); // L R R L
                helper.positionDownFace();
            }
            if (helper.getThirdLayer(Cube_1.Faces.F)[1] === 'F' && helper.getThirdLayer(Cube_1.Faces.B)[1] === 'B') {
                cube.move('D');
                cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\''); // L R R L
                helper.positionDownFace();
            }
            if (helper.getThirdLayer(Cube_1.Faces.R)[1] === 'R' && helper.getThirdLayer(Cube_1.Faces.B)[1] === 'B') {
                cube.move('D\'');
                cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\''); // L R R L
                helper.positionDownFace();
            }
            if (helper.getThirdLayer(Cube_1.Faces.L)[1] === 'L' && helper.getThirdLayer(Cube_1.Faces.B)[1] === 'B') {
                cube.move('D');
                cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\''); // L R R L
                helper.positionDownFace();
            }
        },
        positionEdges: function () {
            helper.positionDownFace();
            while (!(helper.getThirdLayer(Cube_1.Faces.L)[1] === 'L' && helper.getThirdLayer(Cube_1.Faces.F)[1] === 'F' && helper.getThirdLayer(Cube_1.Faces.R)[1] === 'R' && helper.getThirdLayer(Cube_1.Faces.B)[1] === 'B')) {
                cube.move('R\' D R\' D\' R\' D\' R\' D R D R\' R\'');
            }
            if (!(helper.getThirdLayer(Cube_1.Faces.L)[1] === 'L' && helper.getThirdLayer(Cube_1.Faces.F)[1] === 'F' && helper.getThirdLayer(Cube_1.Faces.R)[1] === 'R' && helper.getThirdLayer(Cube_1.Faces.B)[1] === 'B')) {
                logManager_1.LogManager.log('Error while positioning edges for third layer', logManager_1.LogLevel.error);
            }
        },
        positionFirstCorner: function () {
            if (helper.getThirdLayer(Cube_1.Faces.F)[0] === 'F' && helper.getThirdLayer(Cube_1.Faces.L)[2] === 'L') {
                while (!thirdLayerSolved_1.thirdLayerSolved(cube)) {
                    cube.move('R F\' R B B R\' F R B B R R');
                }
                return;
            }
            if (helper.getThirdLayer(Cube_1.Faces.F)[2] === 'F' && helper.getThirdLayer(Cube_1.Faces.R)[0] === 'R') {
                while (!thirdLayerSolved_1.thirdLayerSolved(cube)) {
                    cube.move('B R\' B L L B\' R B L L B B');
                }
                return;
            }
            if (helper.getThirdLayer(Cube_1.Faces.B)[2] === 'B' && helper.getThirdLayer(Cube_1.Faces.L)[0] === 'L') {
                while (!thirdLayerSolved_1.thirdLayerSolved(cube)) {
                    cube.move('F L\' F R R F\' L F R R F F');
                }
                return;
            }
            if (helper.getThirdLayer(Cube_1.Faces.B)[0] === 'B' && helper.getThirdLayer(Cube_1.Faces.R)[2] === 'R') {
                while (!thirdLayerSolved_1.thirdLayerSolved(cube)) {
                    cube.move('L B\' L F F L\' B L F F L L');
                }
                return;
            }
            cube.move('R F\' R B B R\' F R B B R R');
            return helper.positionFirstCorner();
        },
    };
    helper.positionEdges();
    helper.positionFirstCorner();
    if (!thirdLayerSolved_1.thirdLayerSolved(cube)) {
        process.exit();
    }
}
exports.solveThirdLayer = solveThirdLayer;
