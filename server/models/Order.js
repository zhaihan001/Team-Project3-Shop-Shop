const mongoose = require("mongoose");
const productSchema = require("./Product");
const User = require("./User");
const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  products: [productSchema],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
