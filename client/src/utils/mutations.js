import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
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
                        productId
                        name
                        description
                        image
                        price
                        quantity
                    }
                }
                

            }
            
        }
    }
`

export const UPDATE_USER = gql`
    mutation updateUser($firstName: String, $lastName: String, $email: String, $password: String){
        updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
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
                    productId
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

export const DELETE_USER = gql`
    mutation deleteUser($_id: ID){
        deleteUser(_id: $_id){
            _id
            email
            orders{
                _id
                userId
                businessId
                purchaseDate
            }
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
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
                        productId
                        name
                        description
                        image
                        price
                        quantity
                    }
                }
                

            }
        }
    }
`

export const ADD_SHOP = gql`
    mutation addShop($businessName: String!, $userId: ID! $image: String!, $primaryHex: String!, $secondaryHex: String!){
        addShop(businessName: $businessName, userId: $userId, image: $image, primaryHex: $primaryHex, secondaryHex: $secondaryHex){
            _id
            userId
            businessName
            image
            orders{
                _id
                userId
                businessId
                purchaseDate
                products{
                    productId
                    name
                    description
                    image
                    price
                    quantity
                }

            }
            products{
                productId
                name
                description
                image
                price
                quantity
            }
        }
    }
`

export const ADD_PRODUCT = gql`
    mutation addProduct($_id: ID, $productInput: productInput){
        addProduct(_id: $_id, productInput: $productInput){
            _id
            userId
            businessName
            image
            orders{
                _id
                userId
                businessId
                purchaseDate
                products{
                    productId
                    name
                    description
                    image
                    price
                    quantity
                }

            }
            products{
                productId
                name
                description
                image
                price
                quantity
            }
        }
    }
`

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($productId: ID, $productInput: productInput){
        updateProduct(productId: $productId, productInput: $productInput){
            _id
            userId
            businessName
            image
            orders{
                _id
                userId
                businessId
                purchaseDate
                products{
                    productId
                    name
                    description
                    image
                    price
                    quantity
                }

            }
            products{
                productId
                name
                description
                image
                price
                quantity
            }
        }
    }
`

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($_id: ID, $productId: ID){
        deleteProduct(_id: $_id, productId: $productId){
            _id
            userId
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
                productId
                name
                description
                image
                price
                quantity
            }
        }
    }
`

export const ADD_TO_CART = gql`
    mutation addToCart($productInput: productInput!){
        addToCart(productInput: $productInput){
            _id
            userId
            products{
                productId
                name
                description
                image
                price
                quantity
            }
        }
    }
`

export const DELETE_FROM_CART = gql`
    mutation deleteFromCart($productId: ID!){
        deleteFromCart(productId: $productId){
            _id
            userId
            products{
                productId
                name
                description
                image
                price
                quantity
            }
        }
    }
`

export const SUBMIT_ORDER = gql`
    mutation submitOrder($businessId: ID!, $products: productInput){
        submitOrder(businessId: $businessId, products: $products){
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
                    productId
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

export const CANCEL_ORDER = gql`
    mutation cancelOrder($_id: ID!){
        cancelOrder(_id: $_id){
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
                    productId
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