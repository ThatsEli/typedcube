import { Cube, Faces } from "./Cube";
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

        console.log(this.cube.faces[Faces.F].data[1], this.cube.faces[Faces.L].data[1],
                    this.cube.faces[Faces.B].data[1], this.cube.faces[Faces.R].data[1]);

        return '';
    }



}
