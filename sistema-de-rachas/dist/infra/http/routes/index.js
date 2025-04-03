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
const match_controller_1 = __importDefault(require("../controllers/match.controller"));
const player_controller_1 = __importDefault(require("../controllers/player.controller"));
const soccer_field_controller_1 = __importDefault(require("../controllers/soccer-field.controller"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_schema_1 = require("../swagger/auth.schema");
const player_schema_1 = require("../swagger/player.schema");
const soccer_field_schema_1 = require("../swagger/soccer-field.schema");
const match_schema_1 = require("../swagger/match.schema");
const payments_controller_1 = __importDefault(require("../controllers/payments.controller"));
const routes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    // Auth Routes
    fastify.post('/auth/register', { schema: auth_schema_1.registerSwaggerSchema }, auth_controller_1.default.register.bind(auth_controller_1.default));
    fastify.post('/auth/login', { schema: auth_schema_1.loginSwaggerSchema }, auth_controller_1.default.login.bind(auth_controller_1.default));
    fastify.get('/auth/me', {
        schema: auth_schema_1.getUserProfileSchema,
        onRequest: [fastify.authenticate],
    }, auth_controller_1.default.me.bind(auth_controller_1.default));
    fastify.put('/auth/update', {
        schema: auth_schema_1.updateUserProfileSchema,
        onRequest: [fastify.authenticate],
    }, auth_controller_1.default.updateProfile.bind(auth_controller_1.default));
    // Players
    fastify.post('/player', { schema: player_schema_1.createPlayerSchema, onRequest: [fastify.authenticate] }, player_controller_1.default.register.bind(player_controller_1.default));
    fastify.delete('/player/:id', { schema: player_schema_1.deletePlayerSchema, onRequest: [fastify.authenticate] }, player_controller_1.default.delete.bind(player_controller_1.default));
    // Match
    fastify.get('/match', { onRequest: [fastify.authenticate] }, match_controller_1.default.all.bind(match_controller_1.default));
    fastify.post('/match', { onRequest: [fastify.authenticate] }, match_controller_1.default.register.bind(match_controller_1.default));
    fastify.get('/match/by-user', { onRequest: [fastify.authenticate] }, match_controller_1.default.getUserMatches.bind(match_controller_1.default));
    fastify.get('/match/by-user/unpaid', { onRequest: [fastify.authenticate] }, match_controller_1.default.getUserUnpaidMatches.bind(match_controller_1.default));
    fastify.put('/match/:id', { onRequest: [fastify.authenticate] }, match_controller_1.default.update.bind(match_controller_1.default));
    fastify.get('/match/:id/generate-teams-by-players-stars', { onRequest: [fastify.authenticate] }, match_controller_1.default.generateTeamsByPlayerStars.bind(match_controller_1.default));
    fastify.get('/match/:id', { onRequest: [fastify.authenticate] }, match_controller_1.default.findById.bind(match_controller_1.default));
    fastify.delete('/match/:id', { onRequest: [fastify.authenticate] }, match_controller_1.default.delete.bind(match_controller_1.default));
    fastify.get('/match/:id/amount-paid-players', { onRequest: [fastify.authenticate] }, match_controller_1.default.getAmountPaidPlayer.bind(match_controller_1.default));
    fastify.get('/match/:id/generate-players', { onRequest: [fastify.authenticate] }, match_controller_1.default.generateTeamsByPlayerStars.bind(match_controller_1.default));
    fastify.post('/match/payment', { schema: match_schema_1.createPaymentSchema, onRequest: [fastify.authenticate] }, match_controller_1.default.makePayment.bind(match_controller_1.default));
    // Soccer Field
    fastify.post('/soccer-field', { schema: soccer_field_schema_1.createSoccerFieldSchema, onRequest: [fastify.authenticate] }, soccer_field_controller_1.default.register.bind(soccer_field_controller_1.default));
    fastify.put('/soccer-field/:id', {
        onRequest: [fastify.authenticate],
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                },
                required: ['id'],
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    pixKey: { type: 'string' },
                    rentalValue: { type: 'number' },
                    workStartTime: { type: 'string' },
                    workFinishTime: { type: 'string' },
                    workDays: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                },
            },
        },
    }, soccer_field_controller_1.default.update.bind(soccer_field_controller_1.default));
    fastify.delete('/soccer-field/:id', { schema: soccer_field_schema_1.deleteSoccerFieldSchema, onRequest: [fastify.authenticate] }, soccer_field_controller_1.default.delete.bind(soccer_field_controller_1.default));
    fastify.get('/soccer-field', { onRequest: [fastify.authenticate] }, soccer_field_controller_1.default.all.bind(soccer_field_controller_1.default));
    fastify.get('/soccer-field/by-user', { schema: soccer_field_schema_1.getSoccerFieldsByUserSchema, onRequest: [fastify.authenticate] }, soccer_field_controller_1.default.allByUser.bind(soccer_field_controller_1.default));
    fastify.get('/soccer-field/:id/available-times', { onRequest: [fastify.authenticate] }, soccer_field_controller_1.default.availableTimes.bind(soccer_field_controller_1.default));
    fastify.get('/soccer-field/owner/dashboard', { onRequest: [fastify.authenticate] }, soccer_field_controller_1.default.getDashboard.bind(soccer_field_controller_1.default));
    fastify.get('/soccer-field/owner/matches', { onRequest: [fastify.authenticate] }, soccer_field_controller_1.default.getOwnerMatches.bind(soccer_field_controller_1.default));
    fastify.get('/soccer-field/find/:id', { onRequest: [fastify.authenticate] }, soccer_field_controller_1.default.findById.bind(soccer_field_controller_1.default));
    // Payments
    fastify.get('/payments/owner', { onRequest: [fastify.authenticate] }, payments_controller_1.default.findByUser.bind(payments_controller_1.default));
    fastify.get('/payments/owner/dashboard', { onRequest: [fastify.authenticate] }, payments_controller_1.default.getDashboard.bind(payments_controller_1.default));
    fastify.get('/payments/owner/financial-report', {
        onRequest: [fastify.authenticate],
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    startDate: { type: 'string', format: 'date' },
                    endDate: { type: 'string', format: 'date' },
                    soccerFieldId: { type: 'string' },
                    clientId: { type: 'string' }
                }
            }
        }
    }, payments_controller_1.default.getFinancialReport.bind(payments_controller_1.default));
});
exports.default = routes;
