import { BuildOptions, Model } from "sequelize";
import { BookInstance } from "./book";

export interface UserAttributes {
  Name: string;
  Email: string;
  Role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}
export interface UserInstance
  extends Model<UserAttributes>,
    UserAttributes {
  book?: BookInstance;

  isAdmin(): boolean;
  isAgent(): boolean;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};
