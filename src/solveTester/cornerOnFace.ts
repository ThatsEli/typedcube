import { Cube, Faces } from "../classes/Cube";

export function cornerOnFace(cube: Cube, cornerFace: string, face: Faces): boolean {
	let faceData = cube.faces[face].data;
	if(
		faceData[0][0] === cornerFace || faceData[0][2] === cornerFace ||
		faceData[2][0] === cornerFace || faceData[2][2] === cornerFace
	) {
		return true;
	}
	return false;
}
