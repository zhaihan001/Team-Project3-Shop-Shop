const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Business {
    _id: ID
    userId: User
    businessName: String
    slogan: String
    image: String
    orders: [Order]
    products: [Product]
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: [String]
    price: Float
    quantity: Int
  }

  type Order {
    _id: ID
    userId: User
    businessId: ID
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
    products: [Product]
  }

  input productInput {
    name: String!
    description: String!
    image: [String]!
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
    product(_id: ID!, productId: ID!): Business
    cart: Cart
    user: User
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String!, lastName: String!, email: String!, password: String): User
    deleteUser: User
    login(email: String!, password: String!): Auth
    addShop(businessName: String!,slogan: String!, image: String!, primaryHex: String!, secondaryHex: String!): Business 
    addProduct(productInput: productInput): Business
    updateProduct(productId: ID!, productInput: productInput!): Business
    deleteProduct(productId: ID!): Business
    addToCart(productInput: productInput): Cart
    deleteFromCart(productId: ID!): Cart
    submitOrder(businessId: ID!, products: [ID]!): User
    cancelOrder(_id: ID!): User
    updateProductQuantity(quanitity: Int): Product
  }
`;

module.exports = typeDefs;
