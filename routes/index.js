var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/LibraryApp'); 

var bk = mongoose.model('Book',
    new mongoose.Schema({
        book: String,
        author: String,
        publisher: String,
        genre: String
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
    bk.create({
        //        book: req.body.text
        book: 'Test Book',
        author: 'Test Author',
        publisher: 'Test Publisher',
        genre: 'Test Genre'
    }, function (err, todo) {
        if (err)
            res.send(err);
        bk.find(function (err, book) {
            if (err)
                res.send(err)
            res.json(book);
        });
    });
});

module.exports = router;
