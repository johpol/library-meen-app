import Controller from '@ember/controller';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    ajax: service(),

    actions: {
        postIsbn(isbn) {
            console.log(isbn);

            let m = this.model;
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
