const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
