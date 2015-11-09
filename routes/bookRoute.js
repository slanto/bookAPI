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

  bookRouter.use('/:bookId', function(req, res, next){
    Book.findById(req.params.bookId, function(err, book) {
      if (err) {
        res.status(500).json(err);
      }
      else if (book){
        req.book = book;
      }
      else {
        res.status(404).send('no book found');
      }
    });
  });

  bookRouter.route('/:bookId')
    .get(function(req, res) {
      res.json(req.book);
    })
    .put(function(req, res) {
      res.book.title = req.body.title;
      res.book.author = req.body.author;
      res.book.genre = req.body.genre;
      res.book.read = req.body.read;
      res.book.save(function(err){
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(res.book);
        }
      });
    })
    .patch(function(req, res){
      if (req.body._id) {
        delete req.body._id;
      }
      for (var p in req.body) {
        req.book[p] = req.body[p];
      }
      res.book.save(function(err){
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(res.book);
        }
      });
    })
    .delete(function(req, res){
      req.book.remove(function(err){
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(204).send('Removed');
        }
      })
    });

    return bookRouter;
};

module.exports = routes;
