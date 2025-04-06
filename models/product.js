const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  // Optional: Link product to the user who created it
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Refers to the 'User' model
    required: false // Make it false if a user MUST create a product
  }
});

module.exports = mongoose.model('Product', productSchema);
