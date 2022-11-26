const { AuthenticationError } = require('apollo-server-express');
const { User, Business, Cart, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    shops: async () => {
      try {
        let shops = await Business.find();

        return shops

      } catch (error) {
        return error
      }
    },
    getShop: async (parent, {_id}) => {
      try {
        let shop = await Business.findOne({_id}).populate("orders");

        return shop
        
      } catch (error) {
        return error
      }
    },
    product: async (parent, { _id, productId }) => {
      try {
        let shop = await Business.findOne({_id});

        let product = shop.products.find(item => item.productId === productId);

        return product
        
      } catch (error) {
        return error
      }
    },
    user: async (parent, args, context) => {
      try {
        if (context.user) {
          const user = await User.findById(context.user._id).populate("orders");
  
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

          // if this query finds a business that belongs to the user then the business data will be returned with the user info
          const userBusiness = await Business.findOne({userId: context.user._id}).populate("orders");

          if(userBusiness){
            return { user, userBusiness }
          }
  
          return user;
        }
        throw new AuthenticationError('Not logged in');

        
      } catch (error) {
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
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addProduct: async (parent, {products}, context) => {
      try {
        if(context.user){
          let business = await Business.findOneAndUpdate(
            {userId: context.user._id}, 
            {$push: { products }},
            {new: true, runValidators: true}
          )

          return business

        }

        throw new AuthenticationError("Must be logged in");
        
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
    updateProduct: async (parent, args, context) => {
      try {
        if(context.user){
          let business = await Business.findOneAndUpdate(
            {_id: context.user._id},
            {$pull: {products: {productId: args.productId}}}
          );

          let updateNote = await Business.findOneAndUpdate(
            {_id: context.user._id},
            {$push: {products: {...args}}},
            {new: true, runValidators: true}
          )
  
          return updateNote

        }

      } catch (error) {
        return error
      }
    },
    deleteProduct: async (parent, {productId}, context) => {
      try {
        if(context.user){
          let business = await Business.findOneAndUpdate(
            {_id: context.user._id},
            {$pull: { products: {productId}}},
            {new: true, runValidators: true}
          )
          return business

        }

      } catch (error) {
        return error
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
        let removedItem = await Cart.findOneAndUpdate(
          {userId: context.user._id},
          {$pull: {products: {productId}}},
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
    }
  }
};

module.exports = resolvers;
