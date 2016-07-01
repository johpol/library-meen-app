var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/LibraryApp'); 

var bk = mongoose.model('Book', {
    text : String
});

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

module.exports = router;
