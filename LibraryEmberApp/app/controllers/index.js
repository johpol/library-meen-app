import Ember from 'ember';

export default Ember.Controller.extend({
    ajax: Ember.inject.service(),

    actions: {
        postIsbn(isbn) {
            console.log(isbn);
            return this.get('ajax').request('/book', {
                method: 'POST',
                data: {
                    text: isbn
                }
            }).then((data) => {
                Ember.set(this, 'model', data);
            });
        }
    }
});
