import { Face } from "../Face";

export function faceSolved(face: Face): boolean {

    let faceColor = face.data[0][0];

    for (let i = 0; i < 3; i++) {
        const row = face.data[i];
        for (let j = 0; j < 3; j++) {
            const cell = row[j];
            if(cell !== faceColor) {
                return false;
            }
        }
    }
    return true;

}
