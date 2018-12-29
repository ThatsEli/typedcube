import { Cube } from "../classes/Cube";
import { layerSolved } from "../solveTester/layerSolved";

export function thirdLayerSolved(cube: Cube): boolean {

	for (let i = 0; i < 6; i++) {
		if(!layerSolved(cube, i, 2)) return false;
	}

	return true;

}
