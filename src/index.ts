import path from "node:path";
import Fastify from "fastify";
import FastifyStatic from "@fastify/static";
import AutoLoad from "@fastify/autoload";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import GracefulServer from "@gquittet/graceful-server";
import server from "./server";

async function init() {
  const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  // Serve static files
  fastify.register(FastifyStatic, {
    root: path.join(__dirname, "./public"),
    prefix: "/",
  });

  // Auto load routes and resolvers
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "./modules"),
    dirNameRoutePrefix: false,
    options: {
      autoPrefix: "api",
    },
    matchFilter: (path) => [".route.ts", ".resolver.ts", ".route.js", ".resolver.js"].some((e) => path.endsWith(e)),
  });

  await server(fastify);

  const gracefulServer = GracefulServer(fastify.server);

  gracefulServer.on(GracefulServer.READY, () => {
    fastify.log.info("Server is ready");
  });

  gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
    fastify.log.info("Server is shutting down");
  });

  gracefulServer.on(GracefulServer.SHUTDOWN, (error: { message: string }) => {
    fastify.log.info("Server is down because of", error.message);
  });

  try {
    await fastify.listen({ port: 3333, host: "0.0.0.0" });
    gracefulServer.setReady();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

init();
