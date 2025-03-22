"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError {
    constructor(code, message) {
        this.message = message;
        this.code = code;
    }
}
exports.HttpError = HttpError;
