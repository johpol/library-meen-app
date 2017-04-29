import DS from 'ember-data';

const {
    attr
} = DS;
export default DS.Model.extend({
    _id: attr('string'),
    title: attr('string'),
    author: attr('string'),
    publisher: attr('string'),
    isbn: attr('string'),
    tempIsbn: attr('string'),
    subject: attr('string')
});
