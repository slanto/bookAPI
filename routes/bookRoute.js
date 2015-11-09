var express = require('express');

var routes = function(Book) {
  var bookRouter = express.Router();
  bookRouter.route('/')
    .post(function(req, res) {
      var book = new Book(req.body);
      book.save();
      res.status(201).send(book);
    })
    .get(function(req, res) {
      Book.find(function(err, books) {
        if (err) {
          res.status(500).json(err);
        }
        else {
          res.json(books);
        }
      });
    });

  bookRouter.route('/:bookId')
    .get(function(req, res) {
        Book.findById(req.params.bookId, function(err, book) {
          if (err) {
            res.status(500).json(err);
          }
          else {
            res.json(book);
          }
        });
      })
    .put(function(req, res) {
      Book.findById(req.params.bookId, function(err, book) {
        if (err) {
          res.status(500).json(err);
        }
        else {
          book.title = req.body.title;
          book.author = req.body.author;
          book.genre = req.body.genre;
          book.read = req.body.read;          
          book.save();
          res.json(book);
        }
      });
    });

    return bookRouter;
};

module.exports = routes;
