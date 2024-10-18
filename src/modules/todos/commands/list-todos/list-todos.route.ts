import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { todoSchema } from "../../domain/todo.types";
import listTodosHandler from "../../services/list-todos.handler";

export default async function listTodosRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/api/todos",
    preHandler: [fastify.authenticate],
    schema: {
      response: {
        200: z.array(todoSchema),
      },
    },
    handler: async (request, reply) => {
      const { user } = request;

      const todos = await listTodosHandler({
        userId: user.id,
      });

      reply.code(200).send(todos);
    },
  });
}
