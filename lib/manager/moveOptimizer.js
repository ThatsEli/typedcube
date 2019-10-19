"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var cubeSolved_1 = require("../solveTester/cubeSolved");
var logManager_1 = require("./logManager");
var MoveOptimizer = /** @class */ (function () {
    function MoveOptimizer(cube) {
        this.cube = cube;
    }
    MoveOptimizer.prototype.invertMove = function (move) {
        if (move.includes('\'')) {
            return move.replace('\'', '');
        }
        else
            return move + '\'';
    };
    MoveOptimizer.prototype.optimizeMoves = function (movesInput) {
        var moves = movesInput;
        for (var i = 0; i < 3; i++) {
            for (var i_1 = 0; i_1 < moves.length; i_1++) {
                var currentMove = moves[i_1];
                if (this.invertMove(currentMove) === moves[i_1 + 1]) {
                    moves.splice(i_1, 2);
                    continue;
                }
                if (moves[i_1 + 1] === currentMove && moves[i_1 + 2] === currentMove && moves[i_1 + 3] === currentMove) {
                    moves.splice(i_1, 4);
                    continue;
                }
                if (moves[i_1 + 1] === currentMove && moves[i_1 + 2] === currentMove) {
                    moves.splice(i_1 + 1, 2);
                    moves[i_1] = this.invertMove(currentMove);
                    continue;
                }
            }
        }
        if (!this.testMove(moves.join(' '))) {
            logManager_1.LogManager.log('Error while optimizing moves', logManager_1.LogLevel.error);
        }
        return moves;
    };
    MoveOptimizer.prototype.testMove = function (move) {
        var testCube = new Cube_1.Cube(this.cube.originalState);
        testCube.move(move);
        return cubeSolved_1.cubeSolved(testCube);
    };
    return MoveOptimizer;
}());
exports.MoveOptimizer = MoveOptimizer;
