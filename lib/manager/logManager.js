"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogManager = /** @class */ (function () {
    function LogManager() {
    }
    LogManager.log = function (message, level) {
        if (level >= this.logLevel && this.enable) {
            var prefix = '';
            if (level === LogLevel.info)
                prefix += '[I]';
            if (level === LogLevel.success)
                prefix += '[S]';
            if (level === LogLevel.warning)
                prefix += '[W]';
            if (level === LogLevel.error)
                prefix += '[E]';
            console.log(prefix + message);
            if (level === LogLevel.error) {
                process.exit();
            }
        }
    };
    LogManager.enable = true;
    LogManager.logLevel = 4;
    return LogManager;
}());
exports.LogManager = LogManager;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["info"] = 1] = "info";
    LogLevel[LogLevel["success"] = 2] = "success";
    LogLevel[LogLevel["warning"] = 3] = "warning";
    LogLevel[LogLevel["error"] = 4] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
