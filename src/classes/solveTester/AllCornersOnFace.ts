import { Cube, Faces } from "../Cube";

export function allCornersOnFace(cube: Cube, corner: 'U', face: Faces): boolean {
	let faceData = cube.faces[face].data;
	if(faceData[0][0] !== corner) return false;
	if(faceData[0][2] !== corner) return false;
	if(faceData[2][0] !== corner) return false;
	if(faceData[2][2] !== corner) return false;
	return true;
}
