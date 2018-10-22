import { Face, cellsArray } from "./Face";

export class Cube {

    private faces: Array<Face> = [];

    constructor(stateString?: string) {
        if(stateString) {
            let facesData = stateString.split('');
            for (let i = 0; i < 6; i++) {
                this.faces.push( new Face(facesData.slice(i * 9, i * 9 + 9).join('')) );
            }
        } else {
            for (let i = 0; i < 6; i++) {
                let faceData = '';
                for (let j = 0; j < 9; j++) {
                    faceData += cellsArray[i];
                }
                this.faces.push(new Face(faceData));
            }
        }
    }

}
