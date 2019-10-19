import { Cube } from "../classes/Cube";
import { cubeSolved } from "../solveTester/cubeSolved";
import { LogManager, LogLevel } from "./logManager";

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

		console.log('Pre:' + moves.length);

		for (let i = 0; i < 3; i++) {
			
			for (let i = 0; i < moves.length; i++) {
				
				let currentMove: string = moves[i];
				
				if(this.invertMove(currentMove) === moves[i+1]) {
					moves.splice(i, 2); continue;
				}
				
				if(moves[i + 1] === currentMove && moves[i + 2] === currentMove && moves[i + 3] === currentMove) {
					moves.splice(i, 4); continue;
				}
				
				if(moves[i + 1] === currentMove && moves[i + 2] === currentMove) {
					moves.splice(i + 1, 2); moves[i] = this.invertMove(currentMove);
					continue;
				}	
			}
		}
		
		if(!this.testMove(moves.join(' '))) { LogManager.log('Error while optimizing moves', LogLevel.error); }

		console.log('Aft:' + moves.length);
		
		return moves;
		
	}

	public testMove(move: string): boolean {
		let testCube = new Cube(this.cube.originalState);
		testCube.move(move);
		return cubeSolved(testCube);
	}

}
