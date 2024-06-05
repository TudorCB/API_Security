const mongoose = require('mongoose');

const ApiSpecificationSchema = new mongoose.Schema({
  url: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: Object },
  body: { type: Object },
  authentication: { type: Object },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

module.exports = mongoose.model('ApiSpecification', ApiSpecificationSchema);