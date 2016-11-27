import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),

    actions: {
        postIsbn() {
            let isbn = Ember.get(this, 'isbn');
            console.log(isbn);
            return this.get('ajax').request('/book', {
                method: 'POST',
                data: {
                    text: isbn
                }
            }).then((data) => {
                Ember.set(this, 'isbn', '');
                Ember.set(this, 'model', data);
            });
        },

        deleteIsbn(bookID) {
            let url = '/book/' + bookID;
            return this.get('ajax').request(url, {
                method: 'DELETE'
            }).then((data) => {
                Ember.set(this, 'model', data);
            });
        }
    }
});
