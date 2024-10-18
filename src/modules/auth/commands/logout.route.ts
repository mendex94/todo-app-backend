import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export default async function logoutRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "DELETE",
    url: "/api/logout",
    preHandler: [fastify.authenticate],
    handler: async (_, reply) => {
      reply.clearCookie("accessToken");

      return reply.code(200).send();
    },
  });
}
