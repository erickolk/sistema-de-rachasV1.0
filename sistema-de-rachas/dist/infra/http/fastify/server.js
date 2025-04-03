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
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const plugin_1 = __importDefault(require("../../database/mongose/plugin"));
const routes_1 = __importDefault(require("../routes"));
const EnvSchema_1 = require("../../environment/EnvSchema");
const jwt_1 = __importDefault(require("./plugin/jwt"));
class FastifyServer {
    constructor() {
        this.server = (0, fastify_1.default)({ logger: true });
        this.boot();
    }
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.register(cors_1.default, {
                origin: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
            });
            yield this.server.register(require('@fastify/swagger'));
            yield this.server.register(require('@fastify/swagger-ui'), {
                routePrefix: '/documentation',
            });
            yield this.server.register(jwt_1.default);
            yield this.server.register(routes_1.default);
            yield this.server.register(plugin_1.default, { timeout: 30000 });
            yield this.server.ready();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.server.listen({ port: Number(EnvSchema_1.env.PORT), host: '0.0.0.0' });
                console.log('Servidor iniciado com sucesso!');
            }
            catch (err) {
                console.error(err);
                this.server.log.error(err);
                process.exit(1);
            }
        });
    }
}
exports.default = new FastifyServer();
