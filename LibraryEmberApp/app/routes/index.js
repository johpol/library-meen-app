import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),

    model() {
        let mod;
        mod = this.get('ajax').request('/book', {
        method: 'GET'
      });
      return mod;
    }
});
