const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String},
  url: {type: String, required: true}
});

module.exports = mongoose.model('Document', documentSchema);
