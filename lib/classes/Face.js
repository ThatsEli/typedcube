"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Face = /** @class */ (function () {
    function Face(dataString) {
        this.data = [[], [], []];
        if (dataString === undefined) {
            this.data[0].push(cell.U, cell.U, cell.U);
            this.data[1].push(cell.U, cell.U, cell.U);
            this.data[2].push(cell.U, cell.U, cell.U);
        }
        else {
            var inputData = dataString.split('');
            this.data[0].push(inputData[0], inputData[1], inputData[2]);
            this.data[1].push(inputData[3], inputData[4], inputData[5]);
            this.data[2].push(inputData[6], inputData[7], inputData[8]);
        }
    }
    return Face;
}());
exports.Face = Face;
var cell;
(function (cell) {
    cell["U"] = "U";
    cell["R"] = "R";
    cell["F"] = "F";
    cell["D"] = "D";
    cell["L"] = "L";
    cell["B"] = "B";
})(cell = exports.cell || (exports.cell = {}));
