import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: '_id',
    
    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        payload = {books: payload};
        console.log("normalizeResponse");
        console.log(payload);
        return this._super(store, primaryModelClass, payload, id, requestType);
    }
});
