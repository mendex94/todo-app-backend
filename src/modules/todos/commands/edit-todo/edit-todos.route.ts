import { z } from "zod";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { todoSchema } from "../../domain/todo.types";
import editTodoHandler from "../../services/edit-todo.handler";

export default async function editTodosRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "PUT",
    url: "/api/todos/:todoId",
    preHandler: [fastify.authenticate],
    schema: {
      params: z.object({
        todoId: z.string().uuid(),
      }),
      body: z.object({
        title: z.string().optional(),
        body: z.string().optional(),
        completed: z.boolean().optional(),
      }),
      response: {
        200: todoSchema,
      },
    },
    handler: async (request, reply) => {
      const { todoId } = request.params;
      const todo = request.body;

      const updatedTodo = await editTodoHandler({
        todoId,
        todo,
      });

      reply.code(200).send(updatedTodo);
    },
  });
}
