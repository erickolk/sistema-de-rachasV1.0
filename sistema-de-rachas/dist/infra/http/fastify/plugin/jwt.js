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
const jwt_1 = __importDefault(require("@fastify/jwt"));
const EnvSchema_1 = require("../../../environment/EnvSchema");
const JWTVerifyPlugin = (0, fastify_plugin_1.default)((fastify, opts) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.register(jwt_1.default, {
        formatUser: function (user) {
            return {
                email: user.email,
                id: user.id,
                name: user.name,
                role: user.role,
            };
        },
        secret: EnvSchema_1.env.JWT_SECRET,
    });
    fastify.decorate('authenticate', function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield request.jwtVerify();
            }
            catch (err) {
                reply.send(err);
            }
        });
    });
}));
exports.default = JWTVerifyPlugin;
