import { FastifySchema } from 'fastify';

export const createPlayerSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Name of the player' },
      stars: {
        type: 'number',
        description: 'Player’s rating in stars',
        minimum: 0,
      },
    },
    required: ['name', 'stars'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID of the created player' },
        name: { type: 'string', description: 'Name of the player' },
        stars: { type: 'number', description: 'Player’s rating in stars' },
      },
    },
  },
};

export const deletePlayerSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'ID of the player to delete' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Success message confirming deletion',
        },
      },
      example: { message: 'Player deleted successfully' },
    },
    404: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Error message if player not found',
        },
      },
      example: { error: 'Player not found' },
    },
    401: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Unauthorized access error message',
        },
      },
      example: { error: 'Unauthorized' },
    },
  },
};
