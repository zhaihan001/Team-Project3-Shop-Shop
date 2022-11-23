const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const productSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
});

module.exports = productSchema;
