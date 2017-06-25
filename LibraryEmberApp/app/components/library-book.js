import Ember from 'ember';

const {get, set, computed, Component} = Ember;

export default Component.extend({
    searchString: '',
    
    filterLibrary: computed('searchString', 'model', function() {
        let filter = get(this, 'searchString');
        let model = get(this, 'model');

        if (filter === '') {
            return model;
        } else {
            return model.filter(function (book) {
                return book.get('title').toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            });
        }
    }),

    actions: {
        postIsbn() {
            const isbn = get(this, 'isbn');
            const postIsbn = get(this, 'postIsbn');
            postIsbn(isbn);
            set(this, 'isbn', '');
        }
    }
});
