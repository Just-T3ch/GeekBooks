const connection = require("../../../db");
const wantToRead = (req, res) => {
  const data = [null, req.body.book_id, req.token.user_id];
  const userList = [req.body.book_id, req.token.user_id];
  const checkBook = `SELECT * FROM User_List WHERE to_read =? and user_id = ?`;
  const query = `INSERT INTO User_List(user_list_id , to_read,user_id) VALUES (?,?,?)`;
  connection.query(checkBook, userList, (err, bookExist) => {
    if (err) throw err.sqlMessage;
    if (bookExist.length) {
      res.json("the Book is already exist");
      return;
    }
    connection.query(query, data, (err, result) => {
      if (err) throw err.sqlMessage;
      res.json("The book has been added to Want To Read list");
    });
  });
};
module.exports = wantToRead;
