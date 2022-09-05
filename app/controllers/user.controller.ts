import { FastifyReply, FastifyRequest } from "fastify";
import { SignatureKind } from "typescript";
import { add, listUser, edit, erase, signin } from "../services/user.services";
import { UserAttributes } from "../types";

function login(req: FastifyRequest, reply: FastifyReply) {
  const attrs = req.body as UserAttributes;

  return signin(attrs)
    .then((token) => {
      reply.header("Authorization", `Bearer ${token}`);
      reply.status(200).send({ msg: ["login successfully"] });
    })
    .catch((err: Error) => {
      reply.status(400).send(err);
    });
}

function create(req: FastifyRequest, reply: FastifyReply) {
  //console.log("user create attributes are", req.body);
  console.log("--------",req.body);
  
  const attrs = req.body as UserAttributes;
  const { id } = req.params as { id: number };
  return add(attrs)
    .then((user: any) => {
      reply.status(200).send(user);
    })
    .catch((err: Error) => {
      reply.status(400).send(err);
    });
}

function list(req: FastifyRequest, reply: FastifyReply) {
  return listUser()
    .then((user) => {
      reply.status(200).send(user);
    })
    .catch((err: Error) => {
      console.log(err)
      reply.status(400).send({ errors: ["Errors !!"] });
    });
}

function update(req: FastifyRequest, reply: FastifyReply) {
  //   console.log("req------------------------------------------------", req.body);
  //   console.log("params---------------------------", req.params);

  return edit(req.body, req.params)
    .then((user) => {
      reply.status(200).send(user);
    })
    .catch((err: Error) => {
      reply.status(400).send(err);
    });
}

function destroy(req: FastifyRequest, reply: FastifyReply) {
  // console.log("req------------------------------------------------", req.body);
  // console.log("params---------------------------", req.params);
  const { id } = req.params as { id: number };
  return erase(req.body, id)
    .then(() => {
      reply.status(200).send({ msg: ["User deleted successfully"] });
    })
    .catch((err: Error) => {
      reply.status(400).send(err);
    });
}

export { create, list, update, destroy, login };
