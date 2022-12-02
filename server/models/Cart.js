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
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Business"
  }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
