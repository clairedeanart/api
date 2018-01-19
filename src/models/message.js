const BaseModel = require("./default").Model;
const mailgunjs = require('mailgun-js');
const emailer = mailgunjs({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN})

// Model
const Message = BaseModel.extend({
  tableName: 'messages',
  schema: [
    'text',
    'fromEmail',
    'fromName',
    'toEmail',
    'imageId',
    'createdAt',
    'updatedAt',
  ],
  sendEmail: function (options) {
    return new Promise((resolve, reject) => {
      options = options || {}
      message = this
      emailer.messages().send({
        from: `${this.get('fromName')} <${this.get('fromEmail')}>`,
        to: this.get('toEmail'),
        subject: `Claire Dean Art - ${this.get('fromName')} contacted you`,
        text: this.get('text')
      }, function(error, body) {
        if (error) { reject(error) }
        else resolve(message)
      });
    });
  }

});

const Messages = Bookshelf.Collection.extend({
  model: Message,
});

module.exports = {
  Model: Message,
  Collection: Messages,
};
