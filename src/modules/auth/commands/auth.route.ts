import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { authRequestDtoSchema } from "./auth.schema";
import authHandler from "../services/auth.handler";

export default async function authRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/api/auth",
    schema: {
      body: authRequestDtoSchema,
      response: {
        200: z.object({
          accessToken: z.string(),
        }),
        401: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { email, password } = request.body;

      const { payload } = await authHandler({ email, password });

      const accessToken = fastify.jwt.sign(payload);

      reply.setCookie("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: true,
      });

      return reply.code(200).send({ accessToken });
    },
  });
}
