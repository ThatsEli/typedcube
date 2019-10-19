"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layerSolved_1 = require("../solveTester/layerSolved");
function thirdLayerSolved(cube) {
    for (var i = 0; i < 6; i++) {
        if (!layerSolved_1.layerSolved(cube, i, 2))
            return false;
    }
    return true;
}
exports.thirdLayerSolved = thirdLayerSolved;
