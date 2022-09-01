import { IncomingMessage, Server, ServerResponse } from "http";
import { UserInstance } from "../../types";
import { FastifyInstance } from "fastify";
import addUserAuthHook from "../../hooks/user.authentication.hooks";
import bookRoutes from "./books.routes";

declare module "fastify" {
  interface FastifyRequest {
    currentUser: UserInstance;
  }
}

function privateRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  addUserAuthHook(fastify);
  fastify.register(bookRoutes);
  next();
}
export default privateRoutes;
