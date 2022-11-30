const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = require("./Product");

const cartItemSchema = new Schema({
  product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: {
    type: Number,
    required: true
  }
});



const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;