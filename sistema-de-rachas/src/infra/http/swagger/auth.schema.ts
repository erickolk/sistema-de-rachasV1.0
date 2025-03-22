import { FastifySchema } from 'fastify';

export const registerSwaggerSchema = {
  tags: ['Usuário'],
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', description: 'The name of the user' },
      email: {
        type: 'string',
        format: 'email',
        description: 'The email address of the user',
      },
      password: {
        type: 'string',
        description: 'The password of the user',
        format: 'password',
      },
      photoUrl: {
        type: 'string',
        format: 'uri',
        description: "Optional URL for the user's profile photo",
        nullable: true,
      },
      role: {
        type: 'number',
        description: 'Role of user',
        nullable: false,
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique ID of the newly created user',
        },
        name: { type: 'string', description: 'The name of the user' },
        email: {
          type: 'string',
          format: 'email',
          description: 'The email of the user',
        },
        photoUrl: {
          type: 'string',
          format: 'uri',
          description: "The URL of the user's profile photo",
        },
        role: {
          type: 'number',
          description: 'Role of user',
        },
      },
    },
    400: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const loginSwaggerSchema = {
  tags: ['Usuário'],
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'The email address of the user',
      },
      password: {
        type: 'string',
        description: 'The password of the user',
        format: 'password',
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          description: 'Token do usuário',
        },
      },
    },
    400: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const getUserProfileSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID of the user' },
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
      example: {
        id: '6717f7ef66f1861cb37a5055',
        email: 'josesilva12@gmail.com',
        name: 'José da Silva3',
        photoUrl: 'https://lasdijasidas.com',
        role: 1,
      },
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
  tags: ['Usuário'],
};

export const updateUserProfileSchema = {
  body: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string', description: 'Nome do usuário' },
      email: {
        type: 'string',
        format: 'email',
        description: 'Email do usuário',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID do usuário' },
        name: { type: 'string', description: 'Nome do usuário' },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email do usuário',
        },
        photoUrl: {
          type: 'string',
          format: 'uri',
          description: "URL da foto de perfil do usuário",
        },
        role: {
          type: 'integer',
          description: 'Função do usuário (por exemplo, administrador, usuário regular)',
        },
      },
      example: {
        id: '6717f7ef66f1861cb37a5055',
        email: 'josesilva12@gmail.com',
        name: 'José da Silva3',
        photoUrl: 'https://lasdijasidas.com',
        role: 1,
      },
    },
    400: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Mensagem de erro de validação',
        },
      },
      example: { message: 'Este e-mail já está em uso por outro usuário' },
    },
    401: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Mensagem de erro de acesso não autorizado',
        },
      },
      example: { error: 'Unauthorized' },
    },
    404: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Mensagem de erro quando o usuário não é encontrado',
        },
      },
      example: { message: 'Usuário não encontrado' },
    },
    500: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Mensagem de erro interno do servidor',
        },
      },
      example: { message: 'Erro ao atualizar o perfil' },
    },
  },
  tags: ['Usuário'],
};
