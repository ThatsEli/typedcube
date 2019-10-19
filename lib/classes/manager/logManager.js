"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logManager = /** @class */ (function () {
    function logManager() {
    }
    logManager.log = function (message, level) {
        if (level >= this.logLevel) {
            console.log(message);
        }
    };
    logManager.enable = true;
    logManager.logLevel = 2;
    return logManager;
}());
exports.logManager = logManager;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["info"] = 1] = "info";
    LogLevel[LogLevel["success"] = 2] = "success";
    LogLevel[LogLevel["warning"] = 3] = "warning";
    LogLevel[LogLevel["error"] = 4] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
