import { Cube, Faces } from "../Cube";
import { faceSolved } from "../solveTester/FaceSolved";
import { solveWhiteCross } from "./solveWhiteCross";
import { solveFixWhiteCross } from "./solveFixWhiteCross";
import { solveWhiteCorners } from "./solveWhiteCorners";
import { logManager } from "../manager/logManager";

export function solveWhiteFace(cube: Cube) {

    solveWhiteCross(cube);
    solveFixWhiteCross(cube);
    solveWhiteCorners(cube);

    if(!faceSolved(cube, Faces.U)) {
    	logManager.log('Error while solving upper face!')
    	process.exit();
    }

}
