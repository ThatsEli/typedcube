
export class LogManager {

    public static enable: boolean = true;
    public static logLevel: number = 4;

    public static log(message: string, level: number) {
    	if(level >= this.logLevel && this.enable) {
            let prefix = '';
            if(level === LogLevel.info) prefix += '[I]';
            if(level === LogLevel.success) prefix += '[S]';
            if(level === LogLevel.warning) prefix += '[W]';
            if(level === LogLevel.error) prefix += '[E]';
    		console.log(prefix + message);
            if(level === LogLevel.error) { process.exit(); }
    	}
    }

}

export enum LogLevel {
	info = 1,
	success = 2,
	warning = 3,
	error = 4
}
