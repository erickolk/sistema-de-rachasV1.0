"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const mongoose_1 = __importDefault(require("mongoose"));
const EnvSchema_1 = require("../../environment/EnvSchema");
function mongooseConnector(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mongoURL = `${EnvSchema_1.env.DB_DRIVER}://${EnvSchema_1.env.DB_USER}:${EnvSchema_1.env.DB_PASSWORD}@${EnvSchema_1.env.DB_HOST}:${EnvSchema_1.env.DB_PORT}/${EnvSchema_1.env.DB_DATABASE}?authSource=${EnvSchema_1.env.DB_AUTH_SOURCE}`;
            const options = {
                serverSelectionTimeoutMS: 30000,
            };
            yield mongoose_1.default.connect(mongoURL, options);
            fastify.log.info('MongoDB connected');
        }
        catch (err) {
            fastify.log.error('MongoDB connection error:', err);
            throw err;
        }
    });
}
exports.default = (0, fastify_plugin_1.default)(mongooseConnector);
