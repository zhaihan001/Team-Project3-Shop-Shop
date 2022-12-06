const mongoose = require("mongoose");

const { Schema, Types, model } = mongoose;

const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
