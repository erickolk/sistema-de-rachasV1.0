export const createPaymentSchema = {
  description: 'Create a new payment for a match',
  tags: ['Payment'],
  summary: 'Create payment',
  body: {
    type: 'object',
    required: ['paymentDate', 'paymentMethod', 'amount', 'match'],
    properties: {
      paymentDate: { type: 'string', format: 'date-time', description: 'Date of the payment' },
      paymentMethod: { type: 'string', description: 'Method of the payment' },
      amount: { type: 'number', description: 'Amount of the payment' },
      discount: { type: 'number', description: 'Discount on the payment', default: 0 },
      match: { type: 'string', description: 'ID of the match' },
      user: { type: 'string', description: 'ID of the user making the payment' },
    },
  },
  response: {
    201: {
      description: 'Payment created successfully',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID of the payment' },
        paymentDate: { type: 'string', format: 'date-time', description: 'Date of the payment' },
        paymentMethod: { type: 'string', description: 'Method of the payment' },
        amount: { type: 'number', description: 'Amount of the payment' },
        discount: { type: 'number', description: 'Discount on the payment' },
        totalAmountWithDiscount: { type: 'number', description: 'Total amount with discount' },
        match: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID of the match' },
            name: { type: 'string', description: 'Name of the match' },
          },
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID of the user' },
            name: { type: 'string', description: 'Name of the user' },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized access error message',
      type: 'object',
      properties: {
        error: { type: 'string', description: 'Unauthorized access error message' },
      },
    },
  },
};