import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    pathForType() {
        return 'book';
    }
});
