"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Face_1 = require("./Face");
var CubeSolver_1 = require("./CubeSolver");
var moveOptimizer_1 = require("../manager/moveOptimizer");
var CubeJS = require('cubejs');
var Cube = /** @class */ (function () {
    function Cube(stateString) {
        this._faces = [];
        this.originalState = '';
        this.cube = new CubeJS();
        this.moves = [];
        this.moveOptimizer = new moveOptimizer_1.MoveOptimizer(this);
        if (stateString) {
            this.cube = CubeJS.fromString(stateString);
            this.originalState = stateString;
        }
        else {
            this.cube = new CubeJS();
        }
    }
    Object.defineProperty(Cube.prototype, "faces", {
        get: function () {
            this._faces = [];
            var facesData = this.cube.asString().split('');
            for (var i = 0; i < 6; i++) {
                this._faces.push(new Face_1.Face(facesData.slice(i * 9, i * 9 + 9).join('')));
            }
            return this._faces;
        },
        set: function (value) {
            this._faces = value;
            console.error('DO NEVER CALL THIS / YOU FUCKED UP');
        },
        enumerable: true,
        configurable: true
    });
    Cube.prototype.randomize = function () {
        this.cube.randomize();
        this.originalState = this.cube.asString();
    };
    Cube.prototype.getMoves = function () {
        return this.moveOptimizer.optimizeMoves(this.moves).join(' ');
        // return this.moves.join(' ');
    };
    Cube.prototype.move = function (move) {
        this.cube.move(move);
        this.moves = this.moves.concat(move.split(' '));
    };
    Cube.prototype.solve = function () {
        var solver = new CubeSolver_1.CubeSolver(this);
        solver.solveCube();
    };
    Cube.prototype.getFace = function (face) {
        var facesData = this.cube.asString().split('');
        return new Face_1.Face(facesData.slice(face * 9, face * 9 + 9).join(''));
    };
    return Cube;
}());
exports.Cube = Cube;
var Faces;
(function (Faces) {
    Faces[Faces["U"] = 0] = "U";
    Faces[Faces["R"] = 1] = "R";
    Faces[Faces["F"] = 2] = "F";
    Faces[Faces["D"] = 3] = "D";
    Faces[Faces["L"] = 4] = "L";
    Faces[Faces["B"] = 5] = "B";
})(Faces = exports.Faces || (exports.Faces = {}));
