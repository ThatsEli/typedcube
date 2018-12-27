import { Cube, Faces } from "../classes/Cube";
import { logManager, LogLevel } from "../manager/logManager";

export function layerSolved(cube: Cube, face: Faces, layer: number): boolean {

	let layerData = cube.faces[face].data[layer];

	if(layerData[0] !== layerData[1]) return false;
	if(layerData[2] !== layerData[1]) return false;
	
	return true;
}
