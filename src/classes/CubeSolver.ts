import { Cube, Faces } from "./Cube";
import { cubeSolved } from "../solveTester/cubeSolved";
import { solveUpperFace } from "../solveHelper/solveUpperFace";
import { solveSecondLayer } from "../solveHelper/solveSecondLayer";
import { solveFixSecondLayer } from "../solveHelper/solveFixSecondLayer";

export class CubeSolver {

    private cube: Cube;

    constructor(cube: Cube) {
        this.cube = cube;
    }

    public getSolve(): string {
        if(cubeSolved(this.cube)) {
            return 'Solved!';
        }
        solveUpperFace(this.cube);
        solveSecondLayer(this.cube);
        solveFixSecondLayer(this.cube);
        return '';
    }



}
