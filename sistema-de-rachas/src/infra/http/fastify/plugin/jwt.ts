import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { env } from '../../../environment/EnvSchema';
import { UserDto } from '../../../../domain';

interface JwtPluginOptions extends FastifyPluginOptions {
  secret: string;
}

const JWTVerifyPlugin = fp(
  async (fastify: FastifyInstance, opts: JwtPluginOptions) => {
    fastify.register(fastifyJwt, {
      formatUser: function (user: any): UserDto {
        return {
          email: user.email,
          id: user.id,
          name: user.name,
          role: user.role,
        };
      },
      secret: env.JWT_SECRET,
    });

    fastify.decorate(
      'authenticate',
      async function (request: FastifyRequest, reply: FastifyReply) {
        try {
          await request.jwtVerify();
        } catch (err) {
          reply.send(err);
        }
      }
    );
  }
);

export default JWTVerifyPlugin;
