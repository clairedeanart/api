const humps = require('humps');
const _ = require('underscore');

const save = Bookshelf.Model.prototype.save;

Model = Bookshelf.Model.extend({
  save: function (key, value, options) {
    // Pickout
    if (_.isArray(this.schema) && this.schema.length) {
      this.attributes = _.pick(this.attributes, ['id', ...this.schema])
    }
    return save.call(this, key, value, options)
  },
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
