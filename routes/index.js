var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodeIsbn = require('node-isbn');
var path = require('path');

mongoose.connect('mongodb://localhost/LibraryApp'); 

var bk = mongoose.model('Book',
    new mongoose.Schema({
        isbn: String,
        title: String,
        author: String,
        publisher: String,
        subject: String
    }),
    'books_with_isbn'
);

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile(path.resolve('./LibraryEmberApp/dist/index.html'))
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

        res.status(204).send();
    })
});

router.post('/book', function (req, res) {
    console.log(req.body);
    var isbn = req.body.book.tempIsbn;

    nodeIsbn.resolve(isbn, function (err, isbnBook) {
        if (err) {
            console.log('Book not found', err);
        } else {
            console.log('Book found %j', isbnBook);
            bk.create({
                isbn: isbn,
                title: isbnBook.title,
                author: isbnBook.authors,
                publisher: isbnBook.publisher,
                subject: isbnBook.categories
            }, function (err, newBook) {
                if (err) {
                    res.send(err);
                }
                bk.find({_id: newBook._id}, function(err, book) {
                    if(err) {
                        res.send(err);
                    }
                    res.json(book);
                })
            });
        }
    });
});

module.exports = router;
