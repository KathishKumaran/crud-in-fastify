import { Op } from "sequelize";

function columnSearchQuery(query) {
  const searchQueries: any[] = [];
  //console.log("T")
  const {bookname, bookauthor,description,username} = query
  if(bookname){
  searchQueries.push({
    BookName: { [Op.iLike]: `%${bookname}%` },
  })};
  if(bookauthor){
  searchQueries.push({
    BookAuthor: { [Op.iLike]: `%${bookauthor}%` },
  })};
  if(description){
  searchQueries.push({
    Description: { [Op.iLike]: `%${description}%` },
  })};
  if(username){
  searchQueries.push({
    "$users.Name$": { [Op.iLike]: `%${username}%` },
  })};
  return {
    [Op.and]: searchQueries,
  };
}

export default columnSearchQuery;
