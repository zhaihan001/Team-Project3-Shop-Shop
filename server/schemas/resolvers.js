const { AuthenticationError } = require('apollo-server-express');
const { User, Business, Cart, Order, Product, CartItem } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
})

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};


const resolvers = {
  Query: {
    //for testing
    users: async () => {
      try {
        let users = await User.find();

        return users

      } catch (error) {
        console.log(error);
        return error
      }
    },
    myShop: async (parent, args, context) => {
      try {
        if(context.user){
          let userShop = await Business.findOne({userId: context.user._id});
  
          return userShop

        }
      } catch (error) {
        console.log(error);
        return error
      }
    },
    shops: async () => {
      try {
        let shops = await Business.find().populate("orders");

        return shops

      } catch (error) {
        console.log(error);
        return error
      }
    },
    getShop: async (parent, {_id}) => {
      try {
        let shop = await Business.findOne({_id}).populate("orders");

        return shop
        
      } catch (error) {
        console.log(error);
        return error
      }
    },
    product: async (parent, { _id }) => {
      try {
        let product = await Product.findOne({_id});


        return product
        
      } catch (error) {
        console.log(error);
        return error
      }
    },
    user: async (parent, args, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id).populate("orders");
  
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

          // if this query finds a business that belongs to the user then the business data will be returned with the user info
          const userBusiness = await Business.findOne({userId: context.user._id}).populate("orders").populate("products");

          if(userBusiness){
            return { user, userBusiness }
          }
  
          return user;
        }

        
      } catch (error) {
        console.log(error);
        return error
      }

    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },
    cart: async (parent,args, context) => {
      try {
        if(context.user){
          let cart = await Cart.findOne({userId: context.user._id}).populate("products");
  
          return cart

        }

      } catch (error) {
        console.log(error);
        return error
      }
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addShop: async (parent, {businessName, slogan, image, primaryHex, secondaryHex}, context) => {
      try {
        if(context.user){
          console.log("logged");
          let newCloudPic = await cloudinary.uploader.upload(image, options);
          console.log(newCloudPic);
  
          let sizedPic = await cloudinary.uploader.explicit(newCloudPic.public_id, {
              type: 'upload',
                  eager: [{width: 450, height: 300}]
          })
  
          let newShop = await Business.create(
            {
              businessName,
              slogan,
              image: sizedPic.eager[0].secure_url,
              primaryHex,
              secondaryHex,
              userId: context.user._id
            }
          )
  
          return newShop

        }
        
      } catch (error) {
        return error
      }
    },
    addProduct: async (parent, {productInput: product}, context) => {
      try {
        if(context.user){
          let newImages = product.images.map(async (item) => {
            let newCloudPic = await cloudinary.uploader.upload(item, options);
            console.log(newCloudPic);
  
            let sizedPic = await cloudinary.uploader.explicit(newCloudPic.public_id, {
                type: 'upload',
                    eager: [{width: 450, height: 300}]
            })
            return sizedPic.eager[0].secure_url

          })

          let newProductObj = {
            ...product,
            images: newImages,
            userId: context.user._id
          }

          let newProduct = await Product.create(newProductObj);

          let business = await Business.findOneAndUpdate(
            {userId: context.user._id}, 
            {$push: { products: newProduct._id }},
            {new: true, runValidators: true}
          )

          return business

        }

        throw new AuthenticationError("Must be logged in");
        
      } catch (error) {
        return error
      }
    },
    addToCart: async (parent, {productId, quantity, businessId}, context) => {
      try {
        let newCartItem = await CartItem.create(
          {
            product: productId,
            userId: context.user._id,
            quantity
          }
        )

        let userCart = await Cart.findOne({userId: context.user._id});

        if(!userCart){
          let newCart = await Cart.create(
            {
              products: [newCartItem._id],
              userId: context.user._id,
              businessId
            }
          )

          return newCart

        }else{
          let updCart = await Cart.findOneAndUpdate(
            {userId: context.user._id},
            {$push: {products: newCartItem._id}},
            {new: true, runValidators: true}
          )

          return updCart

        }


      } catch (error) {
        return error
      }
    },
    submitOrder: async (parent, { businessId, products }, context) => {
      try {
        if(context.user){
          let order = await Order.create(
            {
              userId: context.user._id, 
              businessId, 
              products
            }
          )

          let updUser = await User.findOneAndUpdate(
            {_id: context.user._id},
            {$push: {orders: order._id}}
          )

          let updBusiness = await Business.findOneAndUpdate(
            {_id: businessId},
            {$push: {orders: order._id}},
          )

          let productIds = order.products.map(item => {
            return item
          });

          let removedItemsFromCart = await Cart.findOneAndUpdate(
            {userId: context.user._id},
            {$pullAll: {products: productIds}}
          )

          return order

        }

      } catch (error) {
        return error
      }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      
      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, {_id, productInput: product}, context) => {
      try {
        if(context.user){
          let updProduct = {
            ...product,
            userId: context.user._id
          }

          let newProduct = await Product.findOneAndUpdate(
            {_id},
            {$set: {product: updProduct}},
            {new: true, runValidators: true}
          )

          return newProduct

        }

      } catch (error) {
        return error
      }
    },
    deleteProduct: async (parent, {_id}, context) => {
      try {
        if(context.user){
          let deletedProduct = await Product.findOneAndDelete({_id});

          let updShop = await Business.findOneAndUpdate(
            {userId: context.user._id},
            {$pull: {products: deletedProduct._id}},
            {new: true, runValidators: true}
          )
          // will remove product from any user's cart that contains it 
          let deletedCartItem = await CartItem.deleteMany({product: {_id} });

          let updCart = await Cart.updateMany(
            {products: {product: {_id: deletedCartItem._id}}},
            {$pull: {products: {_id: deletedCartItem._id} }},
            {new: true}
          );

          return updShop

        }

      } catch (error) {
        return error
      }
    },
    login: async (parent, { username, password }) => {
      console.log(username);
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    deleteFromCart: async (parent, {productId}, context) => {
      try {
        let deletedCartItem = await CartItem.findOneAndDelete({product: productId});

        let removedItem = await Cart.findOneAndUpdate(
          {userId: context.user._id},
          {$pull: {products: deletedCartItem._id}},
          {new: true, runValidators: true}
        )

        return removedItem
        
        
      } catch (error) {
        return error
      }
    },
    cancelOrder: async (parent, {_id}, context) => {
      try {
        let cancelOrder = await Order.findByIdAndDelete({_id});

        let updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: {orders: {_id}}},
          {new: true, runValidators: true}
        )

        return updatedUser

      } catch (error) {
        return error
      }
    },
    updateProductQuantity: async (parent, {quanitity}, context) => {
      try {
        let product = await Product.findOneAndUpdate(
          {_id: context.user._id},
          {$set: {quanitity}},
          {new: true}
        )

        return product
        
      } catch (error) {
        return error
      }
    },
    deleteUser: async (parent, args, context) => {
      try {
        let removedUser = await User.findByIdAndDelete(context.user._id);

        let removedShop = await Business.findOneAndDelete({userId: context.user._id})

        return {msg: `user ${removedUser._id} has been removed`}

      } catch (error) {
        return error
      }
    },
    updateCartItemQuantity: async (parent, {productId, quantity}, context) => {
      try {
        let newCartItem = await CartItem.findOneAndUpdate(
          {product: productId},
          {$set: {quantity}},
          {new: true}
        )

        return newCartItem

      } catch (error) {
        return error
      }
    }
  }
};

module.exports = resolvers;
