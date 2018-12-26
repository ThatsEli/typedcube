
export class logManager {

    public static enable: boolean = true;
    public static logLevel: number = 2;

    public static log(message: string, level: number) {
    	if(level >= this.logLevel) {
    		console.log(message);
    	}
    }

}

export enum LogLevel {
	info = 1,
	success = 2,
	warning = 3,
	error = 4
}
