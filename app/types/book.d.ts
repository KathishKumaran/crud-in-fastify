import { BuildOptions, Model } from "sequelize";
import { UserInstance } from "./user";

export interface BookAttributes {
  BookName: string;
  BookAuthor: string;
  Description: string;
}

export interface BookInstance extends Model<BookAttributes>, BookAttributes {
  users?: UserInstance[];
  isAdmin(): boolean;
  name(): string;
  isAgent(): boolean;
}

export type BookStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BookInstance;
};
