import { Faces } from "../classes/Cube";
import { LogManager, LogLevel } from "../manager/logManager";

export class Tools {

	public static faceToString(face: Faces): string {
		switch (face) {
			case Faces.U: return 'U'; break;
			case Faces.R: return 'R'; break;
			case Faces.F: return 'F'; break;
			case Faces.D: return 'D'; break;
			case Faces.L: return 'L'; break;
			case Faces.B: return 'B'; break;
		}
		LogManager.log('Error while converting face to string', LogLevel.error);
		return '';
	}

}
