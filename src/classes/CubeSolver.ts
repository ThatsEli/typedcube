import { Cube } from "./Cube";
import { cubeSolved } from "../solveTester/cubeSolved";
import { solveWhiteFace } from "../solveHelper/solveWhiteFace";
import { solveSecondLayer } from "../solveHelper/solveSecondLayer";

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
        solveSecondLayer(this.cube);
        return '';
    }



}
