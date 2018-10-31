import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

const bookModel = {
    _id: 'someID',
    title: 'someTitle',
    author: 'someAuthor',
    publisher: 'somePublisher',
    isbn: 'isbn',
    tempIsbn: 'tempIsbn',
    subject: 'someSubject'
};

module('Unit | Model | book', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('book', bookModel));
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
});
