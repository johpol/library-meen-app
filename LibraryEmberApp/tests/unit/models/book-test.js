import { moduleForModel, test } from 'ember-qunit';

const bookModel = {
    _id: 'someID',
    title: 'someTitle',
    author: 'someAuthor',
    publisher: 'somePublisher',
    isbn: 'isbn',
    tempIsbn: 'tempIsbn',
    subject: 'someSubject'
};

moduleForModel('book', 'Unit | Model | book', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject(bookModel);
  // let store = this.store();
  assert.ok(!!model);

  assert.equal(model.get('_id'), 'someID');
  assert.equal(model.get('title'), 'someTitle');
  assert.equal(model.get('author'), 'someAuthor');
  assert.equal(model.get('publisher'), 'somePublisher');
  assert.equal(model.get('isbn'), 'isbn');
  assert.equal(model.get('tempIsbn'), 'tempIsbn');
  assert.equal(model.get('subject'), 'someSubject');
});
