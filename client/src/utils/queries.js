import { gql } from "@apollo/client";

export const GET_SHOPS = gql`
    query shops{
        shops{
            _id
            userId{
                _id
                firstName
                lastName
            }
            businessName
            image
            orders{
                _id
                userId{
                    _id
                    firstName
                    lastName
                }
                businessId
                purchaseDate
                products{
                    _id
                    name
                    description
                    image
                    price
                    quantity
                }

            }
            products{
                _id
                name
                description
                image
                price
                quantity
            }
        }
    }
`

export const GET_SHOP = gql`
    query getShop($_id: ID!){
        getShop(_id: $_id){
            _id
            user
            businessName
            image
            orders{
                _id
                userId
                businessId
                purchaseDate
                products{
                    _id
                    name
                    description
                    image
                    price
                    quantity
                }

            }
            products{
                _id
                    name
                    description
                    image
                    price
                    quantity
            }
        }
    }
`

export const GET_PRODUCT = gql`
    query product($_id: ID!, $productId: String!){
        product(_id: $_id){
            _id
            user
            businessName
            image
            orders{
                _id
                userId{
                    _id
                    username
                }
                businessId
                purchaseDate
                products{
                    _id
                    name
                    description
                    image
                    price
                    quantity
                }

            }
            products{
                _id
                    name
                    description
                    image
                    price
                    quantity
            }
        }
    }
`

export const GET_USER = gql`
    query user{
        user{
            _id
            firstName
            lastName
            email
            orders{
                _id
                userId
                businessId
                purchaseDate
                products{
                    _id
                    name
                    description
                    image
                    price
                    quantity
                }
            }

        }
    }
`