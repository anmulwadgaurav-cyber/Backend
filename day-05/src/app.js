const express = require("express");
const app = express();

app.use(express.json());

const booksArr = [];

app.post("/books", (req, res) => {
  booksArr.push(req.body);
  //   res.send("Entry Updated...");
  res.status(201).json({
    message: "Note Created Successfully",
  });
});

app.get("/books", (req, res) => {
  res.status(200).json({
    books: booksArr,
  });
});

app.delete("/books/:index", (req, res) => {
  booksArr.splice(req.params.index, 1);
  // delete booksArr[req.params.index]
  res.status(200).json({
    message: "Entry Deleted Successfully..!",
  });
});

app.put("/books/:index", (req, res) => {
  booksArr[req.params.index].bookTitle = req.body.bookTitle;
  booksArr[req.params.index].author = req.body.author;
  res.status(200).json({
    message: "Note Updated Successfully..!",
  });
});

app.patch("/books/:index", (req, res) => {
  booksArr[req.params.index].author = req.body.author;
  res.status(200).json({
    message: "Note Edited Successfully..!",
  });
});

module.exports = app;
