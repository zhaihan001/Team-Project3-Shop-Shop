const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Business"
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CartItem'
    }
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
