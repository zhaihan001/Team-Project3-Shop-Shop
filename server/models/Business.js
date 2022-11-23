const mongoose = require("mongoose");
const { Schema } = mongoose;
const Order = require("./Order");
const productSchema = require("./Product");

const businessSchema = new Schema({
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  orders: [Order.schema],
  products: [productSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
