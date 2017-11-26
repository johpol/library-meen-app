var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodeIsbn = require('node-isbn');
var path = require('path');

mongoose.connect('mongodb://localhost/LibraryApp'); 

var bk = mongoose.model('Book',
    new mongoose.Schema({
        type: String,
        attributes: {
            isbn: String,
            title: String,
            author: String,
            publisher: String,
            subject: String
        }
    }),
    'books_with_isbn_jsonapi'
);

/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile(path.resolve('./LibraryEmberApp/dist/index.html'))
});

router.get('/books', function(req, res) {
    bk.find(function(err, book) {
        if(err) {
            res.send(err)
        }

        res.json({'data':book});
    });
});

router.delete('/books/:book_id', function (req, res) {
    console.log(req.params);
    bk.remove({
        _id: req.params.book_id
    }, function (err, book) {
        if (err) {
            res.send(err);
        }
    })
    
    res.status(204).send();
});

router.post('/books', function (req, res) {
    console.log(req.body);
    var attributes = req.body.data.attributes;

    nodeIsbn.resolve(attributes.isbn, function (err, isbnBook) {
        if (err) {
            var error = {
                "errors": [
                    {
                        "status": "422",
                        "code": "Invalid ISBN",
                        "title": "Invalid ISBN",
                        "detail": err.toString(),
                        "source": {
                            "pointer": "/data/book/isbn/"
                        }
                    }
                ]
            };
            console.log('Book not found', err);
            res.status(422).send(error);
        } else {
            console.log('Book found %j', isbnBook);
            bk.create({
                type: 'books',
                attributes: {
                    title: isbnBook.title,
                    author: isbnBook.authors,
                    publisher: isbnBook.publisher,
                    subject: isbnBook.categories,
                    isbn: isbnBook.industryIdentifiers[0].identifier
                }
            }, function (err, newBook) {
                if (err) {
                    res.send(err);
                }

                bk.find({ _id: newBook._id }, function (err, book) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ data: book[0] });
                });
            });
        }
    });
});

module.exports = router;
