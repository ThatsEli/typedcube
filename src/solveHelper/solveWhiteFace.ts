import { Cube, Faces } from "../classes/Cube";
import { faceSolved } from "../solveTester/faceSolved";
import { solveWhiteCross } from "./solveWhiteCross";
import { solveFixWhiteCross } from "./solveFixWhiteCross";
import { solveWhiteCorners } from "./solveWhiteCorners";
import { logManager, LogLevel } from "../manager/logManager";

export function solveWhiteFace(cube: Cube) {

    solveWhiteCross(cube);
    solveFixWhiteCross(cube);
    solveWhiteCorners(cube);

    if(!faceSolved(cube, Faces.U)) {
    	logManager.log('Error while solving upper face', LogLevel.error);
    	process.exit();
    }

	logManager.log('Solved white face', LogLevel.success);

}
