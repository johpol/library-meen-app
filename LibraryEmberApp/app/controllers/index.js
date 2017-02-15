import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),
    searchString: '',

    actions: {
        postIsbn() {
            let isbn = Ember.get(this, 'isbn');
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
    },

    filterLibrary: Ember.computed('searchString', 'model', function() {
        let filter = Ember.get(this, 'searchString');
        let model = Ember.get(this, 'model');

        if (filter === '') {
            return model;
        } else {
            return model.filter(function (book) {
                return book.get('book').toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            });
        }
    })
});
