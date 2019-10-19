"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cube_1 = require("../classes/Cube");
var logManager_1 = require("../manager/logManager");
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.faceToString = function (face) {
        switch (face) {
            case Cube_1.Faces.U:
                return 'U';
                break;
            case Cube_1.Faces.R:
                return 'R';
                break;
            case Cube_1.Faces.F:
                return 'F';
                break;
            case Cube_1.Faces.D:
                return 'D';
                break;
            case Cube_1.Faces.L:
                return 'L';
                break;
            case Cube_1.Faces.B:
                return 'B';
                break;
        }
        logManager_1.LogManager.log('Error while converting face to string', logManager_1.LogLevel.error);
        return '';
    };
    return Tools;
}());
exports.Tools = Tools;
