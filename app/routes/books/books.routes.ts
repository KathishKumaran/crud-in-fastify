import { FastifyInstance } from "fastify";
import { listBookRouterOpts } from "./books-list.routes.opts";
import { bookUpdateRouterOpts } from "./books-update.routes.opts";
import { bookCreateRouterOpts } from "./books-create.routes.opts";

import { IncomingMessage, Server, ServerResponse } from "http";

import {
  create,
  update,
  destroy,
  /*   listAll, */
  list,
} from "../../controllers/book.controller";
import { bookDeleteRouterOpts } from "./books-delete.routes.opts";
const userAuthenticate = require("../../hooks/user.authentication.hooks");

function bookRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post("/book/:userId", bookCreateRouterOpts, create);
  // fastify.get("/books", listBookRouterOpts, listAll);
  fastify.get("/books", list);
  fastify.put("/book/:userId/:bookId", bookUpdateRouterOpts, update);
  fastify.delete("/book/:userId/:bookId", bookDeleteRouterOpts, destroy);
  next();
}
export default bookRoutes;
