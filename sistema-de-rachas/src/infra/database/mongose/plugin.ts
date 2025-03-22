import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongoose, { ConnectOptions } from 'mongoose';
import { env } from '../../environment/EnvSchema';

async function mongooseConnector(fastify: FastifyInstance) {
  try {
    const mongoURL = `${env.DB_DRIVER}://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}?authSource=${env.DB_AUTH_SOURCE}`;

    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 30000,
    };

    await mongoose.connect(mongoURL, options);
    fastify.log.info('MongoDB connected');
  } catch (err) {
    fastify.log.error('MongoDB connection error:', err);
    throw err;
  }
}

export default fp(mongooseConnector);
