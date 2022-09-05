import Book from "../models/book";
import User from "../models/user";
import { UserAttributes } from "../types";
// const bcrypt = require("bcrypt");
import bcrypt from 'bcrypt'
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import { publicIp } from "public-ip";

function generateToken(Email) {
  //console.log("Email", Email)
  console.log("process.env.TOKEN_SECRET", process.env.TOKEN_SECRET);
  const token = jwt.sign({ Email }, `${process.env.TOKEN_SECRET}`);
  return token;
}
// console.log("---------------",publicIp);

async function signin(attrs) {
  const user: any = await User.findOne({ where: { Email: attrs.Email } });
  //console.log("attrs--------------------------",attrs);
  
  console.log("user---------------------------", user);

  // const hash = bcrypt.hashSync(attrs.password, 10);
  // console.log("hash--------------------------", hash);
  const checkPassword = bcrypt.compareSync(attrs.password, user.password);

  console.log("checkPassword---------------------------", checkPassword);

  if (!checkPassword) {
    throw new Error("Email or password is invalid");
  }
  const token = generateToken(attrs.Email);
  console.log("token-----------------------", token);
  await user.update({
    token: token,
  });

  return token;
}

function add(attrs) {
  console.log("------",attrs);
  
  return User.create(attrs);
}

function listUser() {
  return User.findAll({
    include: [
      {
        model: Book,
        as: "book",
      },
    ],
    order: ["id"],
  });
}

async function edit(attrs: any, params: any) {
  const user = await getUser(params.id);
  user?.update(attrs);
}

async function getUser(id) {
  return User.findByPk(id);
}

async function erase(attrs: any, id: any) {
  const user = await getUser(id);
  user?.destroy();
}

export { add, listUser, edit, erase, signin };
