import { gql } from "@apollo/client";

//
export const GET_MY_SHOP = gql`
  query myShop{
    myShop{
      _id
      businessName
      image
      primaryHex
      secondaryHex
      orders {
        _id
        userId {
          _id
          email
        }
        businessId {
          _id
        }
        purchaseDate
        products {
          product{
            _id
            name
            description
            images
            price
            quantity

          }
          quantity
        }
      }
      products{
        _id
        name
        description
        images
        price
        quantity
      }
    }
  }
`

//
export const GET_SHOPS = gql`
  query shops {
    shops {
      _id
      businessName
      image
      products {
        _id
        name
        description
        images
        price
        quantity
      }
      primaryHex
      secondaryHex
    }
  }
`;

//
export const GET_SHOP = gql`
  query getShop($_id: ID!) {
    getShop(_id: $_id) {
      _id
      businessName
      image
      products {
        _id
        name
        description
        images
        price
        quantity
      }
      primaryHex
      secondaryHex
    }
  }
`;

//
export const GET_PRODUCT = gql`
  query product($_id: ID!) {
    product(_id: $_id) {
      _id
      userId{
        _id
        username
      }
      name
      description
      images
      price
      quantity
    }
  }
`;

//
export const GET_USER = gql`
  query user {
    user {
      _id
      username
      email
      image
      orders {
        _id
        businessId {
          _id
          businessName
        }
        purchaseDate
        products {
          product{
            _id
            name
            description
            images
            price
            quantity

          }
          quantity
        }
      }
    }
  }
`;

//
export const GET_CART = gql`
  query cart {
    cart {
      userId {
        _id
        username
      }
      products {
        product{
          _id
          name
          description
          images
          price
          quantity

        }
        quantity
      }
      businessId{
        _id
      }
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query cartItems {
    cartItems {
      _id
      product {
        _id
        description
        images
        name
        price
        quantity
      }
      quantity
      productPrice
      total
    }
  }

`

export const GET_PRODUCTS = gql`
  query products($owner: ID!){
    products(owner: $owner){
      _id
      name
      description
      images
    }
  }
`
