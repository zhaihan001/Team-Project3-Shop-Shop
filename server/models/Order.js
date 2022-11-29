const mongoose = require("mongoose");
const productSchema = require("./Product");
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
  products: [productSchema],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
