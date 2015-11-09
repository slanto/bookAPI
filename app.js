var express = require('express')
  mongoose = require('mongoose')
  bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var bookRouter = require('./routes/bookRoute')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
  res.send('Welcome to my API!');
});

app.listen(port, function(){
  console.log("Gulp is running my app on port " + port);
});
