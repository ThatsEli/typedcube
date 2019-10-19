import { Cube, Faces } from "../classes/Cube";
import { LogManager, LogLevel } from "../manager/logManager";
import { faceSolved } from "../solveTester/faceSolved";

interface FaceSolution {
	name: string;
	pattern: Array<{ x: number, y: number }>;
	upperPosition?: number;
	downPosition?: number;
	action: string;
}

export function solveBottomFace(cube: Cube): void {

	let faceSolutions: Array<FaceSolution> = [
		{ // eight
			name: 'eight',
			pattern: [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ],
			downPosition: 0,
			action: 'R'
		},
		{ // spaceinvader front
			name: 'spaceinvader front',
			pattern: [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 } ],
			action: 'R'
		},
		{ // spaceinvader sides
			name: 'spaceinvader sides',
			pattern: [ { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ],
			action: 'R'
		},
		{ // fish left
			name: 'fish left',
			pattern: [ { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 } ],
			upperPosition: 2,
			downPosition: 0,
			action: 'L'
		},
		{ // fish right
			name: 'fish right',
			pattern: [ { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 0 }, { x: 2, y: 1 } ],
			upperPosition: 0,
			downPosition: 2,
			action: 'R'
		},
		{ // cross front and sides
			name: 'cross front and sides',
			pattern: [ { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 },  { x: 2, y: 1 } ],
			upperPosition: 2,
			downPosition: 2,
			action: 'R'
		},
		{ // cross front and back
			name: 'cross front and back',
			pattern: [ { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }, ],
			action: 'R'
		}
	];

	let helper = {

		getInvertedLRotation: (): string => {
			let faceData = cube.faces[Faces.D].data,
				faceColor = faceData[1][1];
			if(faceData[0][1] === faceColor && faceData[1][0] === faceColor) return 'FL';
			if(faceData[0][1] === faceColor && faceData[1][2] === faceColor) return 'FR';
			if(faceData[2][1] === faceColor && faceData[1][0] === faceColor) return 'BL';
			if(faceData[2][1] === faceColor && faceData[1][2] === faceColor) return 'BR';
			return '';
		},

		orientBottomFace: (): void => {
			let invertedLRotation = helper.getInvertedLRotation();
			while(invertedLRotation === '') {
				cube.move('B R D R\' D\' B\'');
				invertedLRotation = helper.getInvertedLRotation();
			}
			switch (invertedLRotation) {
				case 'FL': /* */ break;
				case 'FR': cube.move('D\''); break;
				case 'BL': cube.move('D'); break;
				case 'BR': cube.move('D D'); break;

				default: LogManager.log('Error while orienting bottom face', LogLevel.error); break;
			}
		},

		createBeamAndContinue: (): void => {
			if(cube.faces[Faces.D].data[1].join('') === 'DDD') {
				return;
			}
			cube.move('B R D R\' D\' B\''); // beam move
			if(cube.faces[Faces.D].data[1].join('') !== 'DDD') {
				LogManager.log('Error while creating the beam', LogLevel.error);
			}
			cube.move('B R D R\' D\' B\''); // beam move
		},

		checkForPattern: (faceSolution: FaceSolution): boolean => {

			let matchPattern = (faceSolution: FaceSolution): boolean => {
				let faceData = cube.faces[Faces.D].data,
					color = faceData[1][1];
				for (let i = 0; i < faceSolution.pattern.length; i++) {
					let pattern = faceSolution.pattern[i];
					if(faceData[pattern.x][pattern.y] !== color) {
						return false;
					}
				}
				if(faceSolution.upperPosition) {
					if(cube.faces[Faces.F].data[2][faceSolution.upperPosition] !== color) return false;
				}
				if(faceSolution.downPosition) {
					if(cube.faces[Faces.B].data[2][2 - faceSolution.downPosition] !== color) return false;
				}
				return true;
			};

			for (let i = 0; i < 4; i++) {
				if(matchPattern(faceSolution)) return true;
				cube.move('D');
			}
			return false;
		},

		completeBottomFace: (): void => {

			for (let i = 0; i < faceSolutions.length; ++i) {
				if(helper.checkForPattern(faceSolutions[i])) {
					if(faceSolutions[i].action === 'L') {
						cube.move('L\' D\' L D\' L\' D\' D\' L');
					} else {
						if(cube.faces[Faces.B].data[2][2] !== 'D') { cube.move('D D'); }
						cube.move('R D R\' D R D D R\'');
						helper.completeBottomFace();
					}
					break;
				}
			}

		},

	};

	helper.orientBottomFace();
	helper.createBeamAndContinue();
	helper.completeBottomFace();

	if(!faceSolved(cube, Faces.D)) {
		LogManager.log('Error while solving bottom face', LogLevel.error);
	}

	LogManager.log('Solved bottom face', LogLevel.success);

}
