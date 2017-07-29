humps = require('humps')

Model = Bookshelf.Model.extend({
  parse: function (attrs) {
    attrs = JSON.parse(JSON.stringify(attrs))
    return humps.camelizeKeys(attrs)
  },
  format: function (attrs) {
    attrs = JSON.parse(JSON.stringify(attrs));
    return humps.decamelizeKeys(attrs);
  },
});

Collection = Bookshelf.Collection;

module.exports = {
  Collection: Collection,
  Model: Model
}
