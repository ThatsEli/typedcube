import { Cube, Faces } from "../Cube";
import { faceSolved } from "../solveTester/FaceSolved";
import { solveWhiteCross } from "./solveWhiteCross";
import { solveFixWhiteCross } from "./solveFixWhiteCross";
import { solveWhiteCorners } from "./solveWhiteCorners";

export function solveWhiteFace(cube: Cube) {

    solveWhiteCross(cube);
    solveFixWhiteCross(cube);
    solveWhiteCorners(cube);
}
