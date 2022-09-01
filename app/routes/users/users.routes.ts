// import { getUser } from "../../services/user.services";
import { FastifyInstance } from "fastify";

import { IncomingMessage, Server, ServerResponse } from "http";

import {
  list,
  create,
  update,
  destroy,
  login,
} from "../../controllers/user.controller";
import { userCreateRouterOpts } from "./users-create.routes.opts";
import { userDeleteRouterOpts } from "./users-delete.routes.opts";
import { userListRouterOpts } from "./users-list.routes.opts";
import { userLoginRouterOpts } from "./users-login.routes.opts";
import { userUpdateRouterOpts } from "./users-update.routes";

function userRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post("/user", userLoginRouterOpts, login);
  fastify.get("/user", userListRouterOpts, list);
  fastify.post("/users", userCreateRouterOpts, create);
  fastify.put("/user/:id", userUpdateRouterOpts, update);
  fastify.delete("/user/:id", userDeleteRouterOpts, destroy);
  next();
}
export default userRoutes;
