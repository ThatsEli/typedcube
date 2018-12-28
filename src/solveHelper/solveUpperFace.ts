import { Cube, Faces } from "../classes/Cube";
import { faceSolved } from "../solveTester/faceSolved";
import { solveUpperCross } from "./solveUpperCross";
import { solveFixUpperCross } from "./solveFixUpperCross";
import { solveUpperCorners } from "./solveUpperCorners";
import { logManager, LogLevel } from "../manager/logManager";

export function solveUpperFace(cube: Cube) {

    solveUpperCross(cube);
    solveFixUpperCross(cube);
    solveUpperCorners(cube);

    if(!faceSolved(cube, Faces.U)) {
    	logManager.log('Error while solving upper face', LogLevel.error);
    	process.exit();
    }

	logManager.log('Solved white face', LogLevel.success);

}
