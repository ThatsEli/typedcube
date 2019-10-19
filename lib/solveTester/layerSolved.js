"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function layerSolved(cube, face, layer) {
    var layerData = cube.faces[face].data[layer];
    if (layerData[0] !== layerData[1])
        return false;
    if (layerData[2] !== layerData[1])
        return false;
    return true;
}
exports.layerSolved = layerSolved;
