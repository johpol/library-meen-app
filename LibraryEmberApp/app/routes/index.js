import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),

    model() {
        let mod;
        mod = this.get('ajax').request('/book', {
        method: 'GET'
      });
      console.log(mod);
      return mod;
    },

    actions: {
        postIsbn(isbn) {
            console.log(isbn);
            return this.get('ajax').request('/book', {
                method: 'POST',
                data: {
                    text: isbn
                }
            });
        }
    }
});
