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

  type CartItem{
    product: Product
    userId: User
    quantity: Int
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
    businessId: Business
    purchaseDate: String
    products: [CartItem]
  }

  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
  }

  type Cart{
    _id: ID
    user: User
    products: [CartItem]
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
    users: [User]
    shops: [Business]
    getShop(_id:ID!): Business
    product(_id: ID!): Product
    cart: Cart
    user: User
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(firstName: String!, lastName: String!, email: String!, password: String): User
    deleteUser: User
    login(username: String!, password: String!): Auth
    addShop(businessName: String!,slogan: String!, image: String!, primaryHex: String!, secondaryHex: String!): Business 
    addProduct(productInput: productInput): Business
    updateProduct(_id: ID!, productInput: productInput!): Product
    deleteProduct(_id: ID!): Product
    addToCart(productId: ID!): Cart
    deleteFromCart(productId: ID!): Cart
    submitOrder(businessId: ID!, products: [ID]!): User
    cancelOrder(_id: ID!): User
    updateProductQuantity(quanitity: Int): Product
    updateCartItemQuantity(productId: ID!, quantity: Int!): CartItem
  }
`;

module.exports = typeDefs;
