import { set, computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
    searchString: '',
    
    filterLibrary: computed('searchString', 'model', function() {
        let filter = this.searchString;
        let model = this.model;

        if (filter === '') {
            return model;
        } else {
            return model.filter(book => {
                return book.get('title').toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            });
        }
    }),

    actions: {
        postIsbn() {
            const isbn = this.isbn;
            const postIsbn = this.postIsbn;
            postIsbn(isbn);
            set(this, 'isbn', '');
        }
    }
});
