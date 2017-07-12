import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {$} = Ember;

const model =[
  {
    title: "Some Title",
    author: "Some Author",
    publisher: "Some Publisher",
    isbn: "1234567890",
    subject: "Some Subject",
  }
]

moduleForComponent('library-book', 'Integration | Component | library book', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('model', model);
  this.set('deleteIsbn', () => assert.ok(true));
  this.set('postIsbn', () => assert.ok(true));
  this.render(hbs`{{library-book model=model postIsbn=(action postIsbn) deleteIsbn=(action deleteIsbn)}}`);

  const tableCells = $('table')["0"].children[1].children["0"].cells;

  assert.equal(tableCells.length, 6);
  assert.equal(tableCells[0].innerText, 'Some Title');
  assert.equal(tableCells[1].innerText, 'Some Author');
  assert.equal(tableCells[2].innerText, 'Some Publisher');
  assert.equal(tableCells[3].innerText, 'Some Subject');
  assert.equal(tableCells[4].innerText, '1234567890');
  assert.equal(tableCells[5].innerText, 'Remove');
});
