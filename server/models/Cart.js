const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = require("./Product");

const cartSchema = new Schema({
  products: [productSchema],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
