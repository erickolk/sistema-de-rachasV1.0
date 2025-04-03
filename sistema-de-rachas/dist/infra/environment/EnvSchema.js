"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    PORT: zod_1.default.string(),
    DB_DRIVER: zod_1.default.string(),
    DB_HOST: zod_1.default.string(),
    DB_USER: zod_1.default.string(),
    DB_DATABASE: zod_1.default.string(),
    DB_URI: zod_1.default.string(),
    DB_AUTH_SOURCE: zod_1.default.string(),
    DB_PASSWORD: zod_1.default.string(),
    DB_PORT: zod_1.default.string(),
    JWT_SECRET: zod_1.default.string(),
    SALTS_PASSWORD: zod_1.default.string().transform((val) => {
        const parsed = parseInt(val, 10);
        if (isNaN(parsed)) {
            throw new Error('SALTS_PASSWORD precisa ser um número');
        }
        return parsed;
    }),
});
exports.env = envSchema.parse(process.env);
