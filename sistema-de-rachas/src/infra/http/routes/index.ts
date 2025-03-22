import { FastifyInstance, FastifyReply } from 'fastify';

import matchController from '../controllers/match.controller';
import playerController from '../controllers/player.controller';
import soccerFieldController from '../controllers/soccer-field.controller';
import authController from '../controllers/auth.controller';
import {
  getUserProfileSchema,
  loginSwaggerSchema,
  registerSwaggerSchema,
  updateUserProfileSchema,
} from '../swagger/auth.schema';
import {
  createPlayerSchema,
  deletePlayerSchema,
} from '../swagger/player.schema';
import {
  createSoccerFieldSchema,
  deleteSoccerFieldSchema,
  getSoccerFieldsByUserSchema,
} from '../swagger/soccer-field.schema';
import { CreateSoccerFieldDto } from '../../../domain';
import { createPaymentSchema } from '../swagger/match.schema';
import paymentsController from '../controllers/payments.controller';
import { GetFinancialReportQueryParams } from '../controllers/payments.controller';


const routes = async (fastify: FastifyInstance) => {
  // Auth Routes
  fastify.post(
    '/auth/register',
    { schema: registerSwaggerSchema },
    authController.register.bind(authController)
  );
  fastify.post(
    '/auth/login',
    { schema: loginSwaggerSchema },
    authController.login.bind(authController)
  );

  fastify.get(
    '/auth/me',
    {
      schema: getUserProfileSchema,
      onRequest: [fastify.authenticate],
    },
    authController.me.bind(authController)
  );

  fastify.put(
    '/auth/update',
    {
      schema: updateUserProfileSchema,
      onRequest: [fastify.authenticate],
    },
    authController.updateProfile.bind(authController)
  );

  // Players
  fastify.post(
    '/player',
    { schema: createPlayerSchema, onRequest: [fastify.authenticate] },
    playerController.register.bind(playerController)
  );
  fastify.delete<{ Params: { id: string } }>(
    '/player/:id',
    { schema: deletePlayerSchema, onRequest: [fastify.authenticate] },
    playerController.delete.bind(playerController)
  );

  // Match
  fastify.get(
    '/match',
    { onRequest: [fastify.authenticate] },
    matchController.getUserUnpaidMatches.bind(matchController)
    matchController.all.bind(matchController)
  );
  fastify.post(
    '/match',
    { onRequest: [fastify.authenticate] },
    matchController.register.bind(matchController)
  );
  fastify.get(
    '/match/by-user',
    { onRequest: [fastify.authenticate] },
    matchController.getUserMatches.bind(matchController)
  );
  fastify.get(
    '/match/by-user/unpaid',
    { onRequest: [fastify.authenticate] },
    matchController.getUserUnpaidMatches.bind(matchController)
  );
  fastify.put<{ Params: { id: string } }>(
    '/match/:id',
    { onRequest: [fastify.authenticate] },
    matchController.update.bind(matchController)
  );
  fastify.get<{ Params: { id: string } }>(
    '/match/:id/generate-teams-by-players-stars',
    { onRequest: [fastify.authenticate] },
    matchController.generateTeamsByPlayerStars.bind(matchController)
  );
  fastify.get<{ Params: { id: string } }>(
    '/match/:id',
    { onRequest: [fastify.authenticate] },
    matchController.findById.bind(matchController)
  );
  fastify.delete<{ Params: { id: string } }>(
    '/match/:id',
    { onRequest: [fastify.authenticate] },
    matchController.delete.bind(matchController)
  );
  fastify.get<{ Params: { id: string } }>(
    '/match/:id/amount-paid-players',
    { onRequest: [fastify.authenticate] },
    matchController.getAmountPaidPlayer.bind(matchController)
  );
  fastify.get<{ Params: { id: string } }>(
    '/match/:id/generate-players',
    { onRequest: [fastify.authenticate] },
    matchController.generateTeamsByPlayerStars.bind(matchController)
  );
  fastify.post(
    '/match/payment',
    { schema: createPaymentSchema, onRequest: [fastify.authenticate] },
    matchController.makePayment.bind(matchController)
  );

  // Soccer Field
  fastify.post(
    '/soccer-field',
    { schema: createSoccerFieldSchema, onRequest: [fastify.authenticate] },
    soccerFieldController.register.bind(soccerFieldController)
  );
  fastify.put<{
    Params: { id: string };
    Body: Partial<CreateSoccerFieldDto>;
  }>(
    '/soccer-field/:id',
    {
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
    },
    soccerFieldController.update.bind(soccerFieldController)
  );

  fastify.delete<{ Params: { id: string } }>(
    '/soccer-field/:id',
    { schema: deleteSoccerFieldSchema, onRequest: [fastify.authenticate] },
    soccerFieldController.delete.bind(soccerFieldController)
  );
  fastify.get(
    '/soccer-field',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.all.bind(soccerFieldController)
  );
  fastify.get(
    '/soccer-field/by-user',
    { schema: getSoccerFieldsByUserSchema, onRequest: [fastify.authenticate] },
    soccerFieldController.allByUser.bind(soccerFieldController)
  );
  fastify.get<{ Params: { id: string }; Querystring: { day?: string } }>(
    '/soccer-field/:id/available-times',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.availableTimes.bind(soccerFieldController)
  );

  fastify.get(
    '/soccer-field/owner/dashboard',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.getDashboard.bind(soccerFieldController)
  );

  fastify.get(
    '/soccer-field/owner/matches',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.getOwnerMatches.bind(soccerFieldController)
  );

  fastify.get<{ Params: { id: string } }>(
    '/soccer-field/find/:id',
    { onRequest: [fastify.authenticate] },
    soccerFieldController.findById.bind(soccerFieldController)
  );

  // Payments
  fastify.get(
    '/payments/owner',
    { onRequest: [fastify.authenticate] },
    paymentsController.findByUser.bind(paymentsController)
  );
  fastify.get(
    '/payments/owner/dashboard',
    { onRequest: [fastify.authenticate] },
    paymentsController.getDashboard.bind(paymentsController)
  );

  fastify.get<{ Querystring: GetFinancialReportQueryParams }>(
    '/payments/owner/financial-report',
    { 
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
    },
    paymentsController.getFinancialReport.bind(paymentsController)
  );
};

export default routes;
