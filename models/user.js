const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure emails are unique
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // Reference the Product model
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

// Add methods to the userSchema for cart manipulation
userSchema.methods.addToCart = function(product) {
  // `this` refers to the user instance
  const cartProductIndex = this.cart.items.findIndex(cp => {
    // Use .toString() because ObjectId types might not strictly equal
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    // Product exists in cart, increase quantity
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    // Product not in cart, add new item
    updatedCartItems.push({
      productId: product._id, // Store the ObjectId
      quantity: newQuantity
    });
  }

  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save(); // Save the user document with the updated cart
};

userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
}


module.exports = mongoose.model('User', userSchema);
