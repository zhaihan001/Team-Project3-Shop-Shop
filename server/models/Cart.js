const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = require("./Product");

const cartSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
