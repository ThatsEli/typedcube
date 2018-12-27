import { Cube, Faces } from '../classes/Cube';

export function upCrossCheck(cube: Cube): boolean {
	if(cube.faces[Faces.F].data[0][1] !== 'F') return false;
	if(cube.faces[Faces.L].data[0][1] !== 'L') return false;
	if(cube.faces[Faces.R].data[0][1] !== 'R') return false;
	if(cube.faces[Faces.B].data[0][1] !== 'B') return false;
	return true;
}
