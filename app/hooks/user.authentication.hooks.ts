import db from "../models";
import User from "../models/user";

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserAttributes, UserInstance } from "../types";
import { request } from "http";
// declare module "fastify" {
//   interface FastifyRequest {
//     currentUser: UserInstance;
//   }
// }
const { verify } = require("jsonwebtoken");
const dotenv = require("dotenv");
//console.log("db", db);

const JWT_SECRET_KEY = process.env.TOKEN_SECRET;
//console.log("===============================", JWT_SECRET_KEY);

function getHeaderToken(headers: any) {
  const bearerHeader = headers.authorization;
  const bearer = bearerHeader ? bearerHeader.split(" ") : [];
  const bearerToken = bearer[1];

  return bearerToken;
}

function verifyToken(token: string, JWT_SECRET_KEY: string) {
  return new Promise((resolve, reject) => {
    //console.log("-----------------------------", JWT_SECRET_KEY);
    verify(token, JWT_SECRET_KEY, (err, decoded) => {
      console.log("error is", err);
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

const userAuthenticate = (fastify: FastifyInstance) => {
  fastify.decorateRequest("currentUser", null);
  fastify.addHook(
    "preHandler",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = getHeaderToken(req.headers);
      console.log("token----------------------------->", token);
      if (!token) {
        const error = {
          error: ["You need to sign-in to access this page"],
        };
        reply.status(401).send(error);
      } else {
        try {
          const userAttrs = (await verifyToken(
            token,
            JWT_SECRET_KEY
          )) as UserAttributes;
          console.log("userAttrs------------------", userAttrs.Email);
          //console.log("User is-----------------------------", userAttrs);

          const user = await User.findOne({
            where: {
              Email: userAttrs.Email,
            },
          });
          // console.log("---------------", user);
          console.log("user-----------------------", user);
          if (user && user.token === token) {
            //console.log("@@@@@@@@@@@@@@@@@@@@@@@");
            req.currentUser = user;
            console.log("token----------------------------->", req.currentUser);
            reply.header("Authorization", `Bearer ${token}`);
          } else {
            reply.status(400).send({
              error: ["session has expired"],
            });
          }
        } catch (error) {
          console.log("error", error);
          reply.status(400).send({
            error: ["Access Denied"],
          });
        }
      }
    }
  );
};

export default userAuthenticate;
