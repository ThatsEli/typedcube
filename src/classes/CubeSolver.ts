import { Cube } from "./Cube";
import { cubeSolved } from "../solveTester/cubeSolved";
import { solveUpperFace } from "../solveHelper/solveUpperFace";
import { solveSecondLayer } from "../solveHelper/solveSecondLayer";
import { solveFixSecondLayer } from "../solveHelper/solveFixSecondLayer";
import { solveBottomFace } from "../solveHelper/solveBottomFace";
import { solveThirdLayer } from "../solveHelper/solveThirdLayer";
import { LogManager, LogLevel } from "../manager/logManager";

export class CubeSolver {

    private cube: Cube;

    constructor(cube: Cube) {
        this.cube = cube;
    }

    public solveCube(): void {
        if(cubeSolved(this.cube)) {
            return;
        }
        solveUpperFace(this.cube);
        solveSecondLayer(this.cube);
        solveFixSecondLayer(this.cube);
        solveBottomFace(this.cube);
        solveThirdLayer(this.cube);
        if(!cubeSolved(this.cube)) {
            LogManager.log('Error while solving the cube', LogLevel.error);
        } else {
            LogManager.log('Solved cube', LogLevel.success);
        }
    }



}
