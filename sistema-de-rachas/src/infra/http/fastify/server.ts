import Fastify, { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import mongoosePlugin from '../../database/mongose/plugin';
import routes from '../routes';
import { env } from '../../environment/EnvSchema';
import JWTVerifyPlugin from './plugin/jwt';
class FastifyServer {
  server: FastifyInstance;

  constructor() {
    this.server = Fastify({ logger: true });
    this.boot();
  }

  async boot() {
    await this.server.register(fastifyCors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
    await this.server.register(require('@fastify/swagger'));
    await this.server.register(require('@fastify/swagger-ui'), {
      routePrefix: '/documentation',
    });
    await this.server.register(JWTVerifyPlugin);
    await this.server.register(routes);
    await this.server.register(mongoosePlugin, { timeout: 30000 });
    await this.server.ready();
  }

  async start() {
    try {
      await this.server.listen({ port: Number(env.PORT), host: '0.0.0.0' });
      console.log('Servidor iniciado com sucesso!');
    } catch (err) {
      console.error(err);
      this.server.log.error(err);
      process.exit(1);
    }
  }
}

export default new FastifyServer();
