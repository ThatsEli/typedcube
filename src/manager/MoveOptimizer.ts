import { Cube } from "../classes/Cube";
import { cubeSolved } from "../solveTester/cubeSolved";
import { logManager, LogLevel } from "../manager/logManager";

export class MoveOptimizer {

	private cube: Cube;

	constructor(cube: Cube) {
		this.cube = cube;
	}

	private invertMove(move: string): string {
		if(move.includes('\'')) {
			return move.replace('\'', '');
		} else return move + '\'';
	}

	public optimizeMoves(movesInput: Array<string>): Array<string> {

		let moves = movesInput;

		if(!this.testMove(moves.join(' '))) { console.error('Error wrong moves'); process.exit(); }

		for (let i = 0; i < moves.length; i++) {

			let currentMove: string = moves[i];

			if(moves[i + 1] === currentMove && moves[i + 2] === currentMove && moves[i + 3] === currentMove) {
				moves.splice(i, 4);
			}

			if(moves[i + 1] === currentMove && moves[i + 2] === currentMove) {
				moves.splice(i, 3, this.invertMove(currentMove));
			}

			if(this.invertMove(currentMove) === moves[i+1]) {
				moves.slice(i, 1);
			}

		}

		if(!this.testMove(moves.join(' '))) { logManager.log('Error while optimizing moves', LogLevel.error); }

		return moves;

	}

	public testMove(move: string): boolean {
		let testCube = new Cube(this.cube.originalState);
		testCube.move(move);
		return cubeSolved(testCube);
	}

}
