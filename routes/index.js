var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodeIsbn = require('node-isbn');

mongoose.connect('mongodb://localhost/LibraryApp'); 

var bk = mongoose.model('Book',
    new mongoose.Schema({
        book: String,
        author: String,
        publisher: String,
        subject: String
    }),
    'books'
);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/book', function(req, res) {
    bk.find(function(err, book) {
        if(err)
            res.send(err)
        res.json(book);
    });
});

router.delete('/book/:book_id', function (req, res) {
    bk.remove({
        _id: req.params.book_id
    }, function (err, book) {
        if (err) {
            res.send(err);
        }

        bk.find(function(err, book) {
        if(err)
            res.send(err)
        res.json(book);

    });
})});

router.post('/book', function (req, res) {
    var isbn = req.body.text;

    nodeIsbn.resolve(isbn, function (err, isbnBook) {
        if (err) {
            console.log('Book not found', err);
        } else {
            console.log('Book found %j', isbnBook);
            bk.create({
                book: isbnBook.title,
                author: isbnBook.authors,
                publisher: isbnBook.publisher,
                subject: isbnBook.categories
            }, function (err, todo) {
                if (err)
                    res.send(err);
                bk.find(function (err, book) {
                    if (err)
                        res.send(err)
                    res.json(book);
                });
            });
        }
    });
});

module.exports = router;
