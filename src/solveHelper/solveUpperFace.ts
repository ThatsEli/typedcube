import { Cube, Faces } from "../classes/Cube";
import { faceSolved } from "../solveTester/faceSolved";
import { logManager, LogLevel } from "../manager/logManager";
import { solveUpperCross } from "./solveUpperCross";
import { solveFixUpperCross } from "./solveFixUpperCross";
import { solveUpperCorners } from "./solveUpperCorners";
import { solveFixUpperCorners } from "./solveFixUpperCorners";

export function solveUpperFace(cube: Cube) {

    solveUpperCross(cube);
    solveFixUpperCross(cube);
    solveUpperCorners(cube);
    solveFixUpperCorners(cube);
    
    if(!faceSolved(cube, Faces.U)) {
    	logManager.log('Error while solving upper face', LogLevel.error);
    }

	logManager.log('Solved white face', LogLevel.success);

}
