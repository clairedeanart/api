const BaseModel = require("./default").Model;

// Model
const Image = BaseModel.extend({
  tableName: 'images',
  schema: [
    // Storage/AWS related
    'filename',
    'location',
    'mimetype',
    'contentType',
    'key',
    'etag',
    'hidden',
    'unedited',
    'createdAt',
    'updatedAt',
    // Public facing
    'name',
    'medium',
    'date',
    'dimensions',
    'price',
    'sold',
    'tags',
  ]
});

const Images = Bookshelf.Collection.extend({
  model: Image,
});

module.exports = {
  Model: Image,
  Collection: Images,
};
