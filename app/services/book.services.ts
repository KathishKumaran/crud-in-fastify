import Book from "../models/book";

import { size, map } from "lodash";
import { BookAttributes } from "../types";
import { Q_MINIMUM_SIZE } from "../config/constants";

import { paginate, paginatorResult } from "../lib/paginator-result";
import { globalSearchQuery } from "../queries";
import User from "../models/user";
import { Sequelize } from "sequelize";

async function add(attrs, userId: number) {
  //console.log("attrs-------------------------", attrs);
  // console.log("--------", id);
  attrs.userId = userId;
  // console.log(attrs)
  return Book.create(attrs);
}

// async function list() {
//   return Book.findAll();
// }
async function listAndPaginate(query: any) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const perPage = query.per_page && query.per_page > 0 ? query.per_page : 10;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const queries =
    size(query.q) >= Q_MINIMUM_SIZE ? globalSearchQuery(query.q) : {};
  console.log("0-----------QUERIES", queries);
  const listOfBooks = await Book.findAndCountAll({
    limit,
    offset,
    where: {
      ...queries,
    },
    include: [
      {
        model: User,
        as: "users",
      },
    ],
    order: [["BookName", "ASC"]],
  });
  const books = map(listOfBooks.rows, (row) => {
    const data = {
      id: row.id,
      bookName: row.BookName,
      bookAuthor: row.BookAuthor,
      bookDescription: row.Description,
      userName: row.users.Name,
    };
    return data;
  });

  const result = paginate(
    { rows: books, count: listOfBooks.count },
    perPage,
    page
  );
  return paginatorResult(result, "books");
}

async function edit(attrs: BookAttributes, bookId: number) {
  // const data = Book.update(attrs, {
  //   where: {
  //     id: bookId,
  //   },
  // });
}

async function erase(bookId: number) {
  // return Book.destroy({
  //   where: {
  //     id: bookId,
  //   },
  // });
}

export { add, edit, erase, listAndPaginate };
