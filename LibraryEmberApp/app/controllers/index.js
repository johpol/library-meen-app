import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),

    actions: {
        postIsbn(isbn) {
            console.log(isbn);

            let bookStore = this.store.createRecord('book', {
                tempIsbn: isbn
            });
            bookStore.save();
            Ember.set(this, 'isbn', '');
        },

        deleteIsbn(bookID) {
            this.store.findRecord('book', bookID, { backgroundReload: false }).then(function(book) {
                book.destroyRecord();
            });
        }
    }
});
