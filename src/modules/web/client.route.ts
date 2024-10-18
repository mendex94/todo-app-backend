import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export default async function clientRoute(fastify: FastifyInstance) {
  const routes = ["/", "/todos", "/signup"];

  routes.forEach((route) => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
      method: "GET",
      url: route,
      handler: async (_, reply) => {
        return reply.sendFile("index.html");
      },
    });
  });
}
