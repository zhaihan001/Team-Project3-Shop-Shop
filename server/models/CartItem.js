const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = require("./Product");

const cartItemSchema = new Schema({
  product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: {
    type: Number,
    required: true
  }
},
  {
    toJSON: {
      virtuals: true
    },
    id: false

  }
);

//needs tested
cartItemSchema.virtual('total').get(() => {
  return this.product.price * this.quantity;
})

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;