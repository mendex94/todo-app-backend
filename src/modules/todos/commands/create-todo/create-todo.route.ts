import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createTodoDtoSchema } from "./create-todo.schema";
import createTodoHandler from "../../services/create-todo.handler";

export default async function createTodoRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/api/todos",
    preHandler: [fastify.authenticate],
    schema: {
      body: createTodoDtoSchema,
      response: {
        201: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { user } = request;
      const { title, body } = request.body;

      const { id } = await createTodoHandler({
        title,
        body,
        userId: user.id,
      });

      reply.code(201).send({ id });
    },
  });
}
