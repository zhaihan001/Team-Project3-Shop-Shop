const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Business {
    _id: ID
    user: User
    businessName: String
    image: String
    orders: [Order]
    products: [Product]
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
   }

  type Order {
    _id: ID
    user: User
    business: Business
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Cart{
    _id: ID
    user: User
    products: [productSchema]
  }

  input productInput {
    name: String!
    description: String!
    image: String!
    price: Int!
    quantity: Int!
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    shops: [Business]
    getShop(_id:ID!): Business
    product(_id: ID!, productId: ID!): Product
    userOrders(_id: ID!): User
    businessOrders(_id: ID!): Business
    user: User
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    deleteUser(_id: ID!): User
    login(email: String!, password: String!): Auth
    addShop(name: String!, image: String!, primaryHex: String!, secondaryHex: String!): 
    addProduct(productInput: productInput): Business
    updateProduct(productId: ID!, name: String, description: String, image: String, price: Int, quantity: Int): Business
    deleteProduct(productId: ID!): Business
    addToCart(userId: ID!, productInput: productInput): Cart
    deleteFromCart(_id: ID!): Cart
    submitOrder(businessId: ID!, products: productInput): Order
    cancelOrder(_id: ID!): User
  }
`;

module.exports = typeDefs;
