import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),

    model() {
        return this.store.findAll('book');
    }
});
