import { faceSolved } from "./FaceSolved";
import { Cube } from "../Cube";

export function cubeSolved(cube: Cube): boolean {

    for (let i = 0; i < 6; i++) {
        if(!faceSolved(cube.faces[i])) {
            return false;
        }
    }

    return true;

}

