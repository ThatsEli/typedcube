import { Cube } from "./Cube";
import { cubeSolved } from "./solveTester/CubeSolved";
import { solveWhiteFace } from "./solveHelper/solveWhiteFace";

export class CubeSolver {

    private cube: Cube;

    constructor(cube: Cube) {
        this.cube = cube;
    }

    public getSolve(): string {
        if(cubeSolved(this.cube)) {
            return 'Solved!';
        }
        solveWhiteFace(this.cube);
        return '';
    }



}
