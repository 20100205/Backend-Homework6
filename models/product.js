const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  warehouse: [{
    name: { type: String },
    stock: { type: Number }
  }],
  forSale: {type: Boolean},
  feature: {type: String}
}, {
  collection: 'product',
  timestamps: true,
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 30000
  },
  read: 'nearest'
});

const Model = mongoose.model('Product', productSchema);
module.exports = Model;