import { Face } from "./Face";
import { CubeSolver } from "./CubeSolver";

const CubeJS = require('cubejs');

export class Cube {

    private _faces: Array<Face> = [];
    public get faces(): Array<Face> {
        this._faces = [];
        let facesData = this.cube.asString().split('');
        for (let i = 0; i < 6; i++) {
            this._faces.push( new Face(facesData.slice(i * 9, i * 9 + 9).join('')) );
        }
        return this._faces;
    }
    public set faces(value: Array<Face>) {
        this._faces = value;
        console.error('DO NEVER CALL THIS / YOU FUCKED UP');
    }
    private cube = new CubeJS();
    private moves: String[] = [];
    public originalState: string = '';

    constructor(stateString?: string) {

        if(stateString) {
            this.cube = CubeJS.fromString(stateString);
            this.originalState = stateString;
        } else {
            this.cube = new CubeJS();
        }
    }

    public randomize() {
        this.cube.randomize();
        this.originalState = this.cube.asString();
    }

    public getMoves() {
        return this.moves.join('');
    }

    public move(move: string) {
        this.cube.move(move);
        this.moves = this.moves.concat(move.split(' '));
    }

    public solve(): void {
        let solver = new CubeSolver(this);
        console.log(this.originalState);
        solver.solveCube();
    }

    public getFace(face: number): Face {
        let facesData = this.cube.asString().split('');
        return new Face(facesData.slice(face * 9, face * 9 + 9).join(''));
    }

}

export enum Faces {
    U = 0,
    R = 1,
    F = 2,
    D = 3,
    L = 4,
    B = 5,
}
