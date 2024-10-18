import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { todoSchema } from "../../domain/todo.types";
import deleteTodoHandler from "../../services/delete-todo.handler";

export default async function editTodosRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "DELETE",
    url: "/api/todos/:todoId",
    preHandler: [fastify.authenticate],
    schema: {
      params: z.object({
        todoId: z.string().uuid(),
      }),
      response: {
        200: todoSchema,
      },
    },
    handler: async (request, reply) => {
      const { todoId } = request.params;

      const deletedTodo = await deleteTodoHandler({
        todoId,
      });

      reply.code(200).send(deletedTodo);
    },
  });
}
