import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const model =[
  {
    title: "Some Title",
    author: "Some Author",
    publisher: "Some Publisher",
    isbn: "1234567890",
    subject: "Some Subject",
  }
]

module('Integration | Component | library book', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('model', model);
    this.set('deleteIsbn', () => assert.ok(true));
    this.set('postIsbn', () => assert.ok(true));
    await render(hbs`{{library-book model=model postIsbn=(action postIsbn) deleteIsbn=(action deleteIsbn)}}`);

    const tableCells = this.element.querySelectorAll('td');

    assert.equal(tableCells.length, 6);
    assert.equal(tableCells[0].innerText, 'Some Title');
    assert.equal(tableCells[1].innerText, 'Some Author');
    assert.equal(tableCells[2].innerText, 'Some Publisher');
    assert.equal(tableCells[3].innerText, 'Some Subject');
    assert.equal(tableCells[4].innerText, '1234567890');
    assert.equal(tableCells[5].innerText, 'Remove');
  });
});
