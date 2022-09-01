"use strict";

import { DataTypes, Sequelize } from "sequelize";
//import { UserStatic } from "../types";
import Book from "./book";
import db from ".";
import { UserStatic } from "../types";
import { USER_ROLE } from "../config/constants";

const modelOPtions = {
  tableName: "Users",
};

const attributes = {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mark_as_signin: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  token: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

function userModelFactory(sequelize: Sequelize): UserStatic {
  return sequelize.define("User", attributes, modelOPtions) as UserStatic;
}

const User = userModelFactory(db);
// console.log(User)
// User.hasMany(Book, { foreignKey: "userId", as: "book" });

User.prototype.isAdmin = function (): boolean {
  return this.role === USER_ROLE.admin;
};
User.prototype.isAgent = function (): boolean {
  return this.role === USER_ROLE.agent;
};

export default User;
