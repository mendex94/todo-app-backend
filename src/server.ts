import { join } from "path";
import { fastify } from "fastify";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors);
app.register(fastifyStatic, {
  root: join(__dirname, "public"),
  prefix: "/public/",
});

app.get("/", (req, reply) => {
  reply.sendFile("index.html");
});

app.listen(
  {
    port: 3333,
  },
  () => {
    console.log("App is running on port 3333 🚀");
  }
);
