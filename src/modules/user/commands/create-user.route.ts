import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserSchema } from "../services/create-user.schema";
import { z } from "zod";
import createUserHandler from "../services/create-user.handler";

export default async function createUserRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/api/users",
    schema: {
      body: createUserSchema,
      response: {
        201: z.object({
          accessToken: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { name, email, password } = request.body;

      const { payload } = await createUserHandler({ name, email, password });

      const accessToken = fastify.jwt.sign(payload);

      reply.setCookie("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: true,
      });

      return reply.code(201).send({ accessToken });
    },
  });
}
