const humps = require('humps');
const _ = require('underscore');

Model = Bookshelf.Model.extend({
  save: function (key, value, options) {
    // Pickout
    if (_.isArray(this.schema) && this.schema.length) {
      this.attributes = _.pick(this.attributes, this.schema);
    }
    return Bookshelf.Model.prototype.save.call(this, key, value, options)
  },
  parse: function (attrs) {
    console.log('attrs parse', attrs)
    console.log('thisssss', this)
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
