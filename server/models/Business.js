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
  slogan: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  primaryHex: {
    type: String,
    require: true
  },
  secondaryHex: {
    type: String,
    required: true
  },
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product'
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
