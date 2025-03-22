import { FastifySchema } from 'fastify';

export const deleteSoccerFieldSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'ID of the soccer field to delete' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Confirmation message for successful deletion',
        },
      },
      example: { message: 'Soccer field deleted successfully' },
    },
    404: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Error message if soccer field not found',
        },
      },
      example: { error: 'Soccer field not found' },
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

export const createSoccerFieldSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Name of the soccer field' },
      pixKey: { type: 'string', description: 'Pix key for payment' },
      rentalValue: {
        type: 'number',
        description: 'Rental value for the field',
      },
      workStartTime: {
        type: 'string',
        format: 'time',
        description: 'Start time of operation (HH:mm:ss)',
      },
      workFinishTime: {
        type: 'string',
        format: 'time',
        description: 'Finish time of operation (HH:mm:ss)',
      },
      workDays: {
        type: 'array',
        items: { type: 'string' },
        description: 'Days of the week when the field is available',
      },
    },
    required: [
      'name',
      'pixKey',
      'rentalValue',
      'workStartTime',
      'workFinishTime',
      'workDays',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID of the created soccer field' },
        name: { type: 'string', description: 'Name of the soccer field' },
        pixKey: { type: 'string', description: 'Pix key for payment' },
        rentalValue: {
          type: 'number',
          description: 'Rental value for the field',
        },
        workStartTime: {
          type: 'string',
          format: 'time',
          description: 'Start time of operation',
        },
        workFinishTime: {
          type: 'string',
          format: 'time',
          description: 'Finish time of operation',
        },
        workDays: {
          type: 'array',
          items: { type: 'string' },
          description: 'Days of the week when the field is available',
        },
      },
      example: {
        id: '123456',
        name: 'campo do zé',
        pixKey: 'Campo do zézinho2',
        rentalValue: 150,
        workStartTime: '10:00:00',
        workFinishTime: '21:00:00',
        workDays: ['segunda', 'sexta'],
      },
    },
    400: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Error message if validation fails',
        },
      },
      example: { error: 'Invalid request data' },
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

export const getSoccerFieldsByUserSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID of the soccer field' },
          name: { type: 'string', description: 'Name of the soccer field' },
          pixKey: { type: 'string', description: 'Pix key for payment' },
          rentalValue: {
            type: 'number',
            description: 'Rental value for the field',
          },
          workDays: {
            type: 'array',
            items: { type: 'string' },
            description: 'Days of the week when the field is available',
          },
          workStartTime: {
            type: 'string',
            format: 'time',
            description: 'Start time of operation (HH:mm:ss)',
          },
          workFinishTime: {
            type: 'string',
            format: 'time',
            description: 'Finish time of operation (HH:mm:ss)',
          },
          user: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID of the user who owns the soccer field',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Email of the user',
              },
              name: { type: 'string', description: 'Name of the user' },
              photoUrl: {
                type: 'string',
                format: 'uri',
                description: "URL of the user's profile photo",
              },
              role: {
                type: 'integer',
                description: 'Role of the user (e.g., admin, regular user)',
              },
            },
            description: 'Information about the user who owns the soccer field',
          },
        },
      },
      example: [
        {
          id: '671c026c866232c3e801b1eb',
          name: 'campo do zé',
          pixKey: 'Campo do zézinho2',
          rentalValue: 150,
          workDays: ['segunda', 'sexta'],
          workStartTime: '10:00:00',
          workFinishTime: '21:00:00',
          user: {
            id: '6717f7ef66f1861cb37a5055',
            email: 'josesilva12@gmail.com',
            name: 'José da Silva3',
            photoUrl: 'https://lasdijasidas.com',
            role: 1,
          },
        },
      ],
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
  }
};
