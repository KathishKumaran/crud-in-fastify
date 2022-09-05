import { Sequelize } from "sequelize";
// require("dotenv").config();
import dotenv from 'dotenv'
dotenv.config()
const env = process.env.NODE_ENV || "development";
// tslint:disable-next-line: no-var-requires
const config = require(`${__dirname}/../../db/config.json`)[env];
//console.log(env);

const db = new Sequelize(process.env[config.use_env_variable] as string, {
  host: "localhost",
  dialect: "postgres",
});
//console.log(db);

export default db;
