import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import FastifyJWT, { FastifyJWT as IFastifyJWT } from "@fastify/jwt";
import FastifyCookie from "@fastify/cookie";
import Cors from "@fastify/cors";

export default async function createServer(fastify: FastifyInstance) {
  // Enable CORS
  fastify.register(Cors);

  // Register JWT
  fastify.register(FastifyJWT, {
    secret: "supersecret",
  });

  fastify.addHook("preHandler", (request, _, next) => {
    request.jwt = fastify.jwt;
    return next();
  });

  fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    const accessToken = request.cookies.accessToken;

    if (!accessToken) {
      reply.code(401).send({ message: "Unauthorized access" });
    }

    const payload = fastify.jwt.verify<IFastifyJWT["user"]>(accessToken!);

    request.user = payload;
  });

  // Register Cookie

  fastify.register(FastifyCookie, {
    secret: "supersecret",
    hook: "preHandler",
  });

  return fastify;
}
