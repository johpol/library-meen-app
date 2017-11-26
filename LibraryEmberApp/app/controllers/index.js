import Ember from 'ember';

const {Controller, set, inject:{service}} = Ember;

export default Controller.extend({
    ajax: service(),

    actions: {
        postIsbn(isbn) {
            console.log(isbn);

            let m = this.get('model');
            m.forEach(bkModel => {
                if(!bkModel.get('isValid')) {
                    this.store.unloadRecord(bkModel);
                }
            });

            let bookStore = this.store.createRecord('book', {
                isbn: isbn
            });
            bookStore.save();
            
            set(this, 'isbn', '');
        },

        deleteIsbn(bookID) {
            this.store.findRecord('book', bookID, { backgroundReload: false }).then(book => {
                book.destroyRecord();
            });
        }
    }
});
