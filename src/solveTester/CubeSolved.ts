import { faceSolved } from "./faceSolved";
import { Cube } from "../classes/Cube";

export function cubeSolved(cube: Cube): boolean {

    for (let i = 0; i < 6; i++) {
        if(!faceSolved(cube, i)) {
            return false;
        }
    }

    return true;

}

