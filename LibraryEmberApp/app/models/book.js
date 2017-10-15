import DS from 'ember-data';

const {
    attr
} = DS;
export default DS.Model.extend({
    title: attr('string'),
    author: attr('string'),
    publisher: attr('string'),
    isbn: attr('string'),
    subject: attr('string')
});
