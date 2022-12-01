import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
                orders{
                    _id
                    userId{
                        _id
                        email
                    }
                    businessId{
                        _id 
                        businessName
                    }
                    purchaseDate
                    products{
                        product{
                            _id
                            name
                            description
                            image
                            price
                            quantity

                        }
                        userId{
                            _id
                        }
                        quantity
                    }
                }
                

            }
            
        }
    }
`

export const UPDATE_USER = gql`
    mutation updateUser($username: String, $email: String, $password: String){
        updateUser(username: $username, email: $email, password: $password){
            _id
            username
            email
            orders{
                _id
                userId{
                    _id
                    username
                }
                businessId{
                    _id 
                    businessName
                }
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

export const DELETE_USER = gql`
    mutation deleteUser{
        deleteUser{
            _id
            email
            orders{
                _id
                userId{
                    _id
                    username
                }
                businessId{
                    _id 
                    businessName
                }
                purchaseDate
            }
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            token
            user {
                _id
                username
                email
                orders{
                    _id
                    userId{
                        _id
                        username
                    }
                    businessId{
                        _id 
                        businessName
                    }
                    purchaseDate
                    products{
                        product{
                            _id
                            name
                            description
                            image
                            price
                            quantity

                        }
                        userId{
                            _id
                        }
                        quantity
                    }
                }
                

            }
        }
    }
`

export const ADD_SHOP = gql`
    mutation addShop($businessName: String!, $image: String!, $primaryHex: String!, $secondaryHex: String!){
        addShop(businessName: $businessName, image: $image, primaryHex: $primaryHex, secondaryHex: $secondaryHex){
            _id
            userId{
                _id
                username
            }
            businessName
            image
            orders{
                _id
                userId{
                    _id
                    username
                }
                businessId{
                    _id
                    name
                }
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

export const ADD_PRODUCT = gql`
    mutation addProduct($productInput: productInput){
        addProduct(productInput: $productInput){
            _id
            userId{
                _id
                username
            }
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

export const UPDATE_PRODUCT = gql`
    mutation updateProduct($productId: ID, $productInput: productInput){
        updateProduct(productId: $productId, productInput: $productInput){
            _id
            userId{
                _id
                username
            }
            businessName
            image
            orders{
                _id
                userId{
                    _id
                    username
                }
                businessId{
                    _id
                    name
                }
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

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($productId: ID!){
        deleteProduct(productId: $productId){
            _id
            userId{
                _id
                username
            }
            businessName
            image
            orders{
                _id
                userId{
                    _id
                    username
                }
                businessId{
                    _id
                    businessName
                }
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

export const ADD_TO_CART = gql`
    mutation addToCart($productId: ID!, $quantity: Int!, $businessId: ID!){
        addToCart(productId: $productId, quantity: $quantity, businessId: $businessId){
            _id
            userId{
                _id
                username
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

export const DELETE_FROM_CART = gql`
    mutation deleteFromCart($productId: ID!){
        deleteFromCart(productId: $productId){
            _id
            userId{
                _id
                username
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

export const SUBMIT_ORDER = gql`
    mutation submitOrder($businessId: ID!, $products: productInput){
        submitOrder(businessId: $businessId, products: $products){
            _id
            username
            email
            orders{
                _id
                userId{
                    _id
                    username
                }
                businessId{
                    _id
                    businessNames
                }
                purchaseDate
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
    }
`

export const CANCEL_ORDER = gql`
    mutation cancelOrder($_id: ID!){
        cancelOrder(_id: $_id){
            _id
            username
            email
            orders{
                _id
                userId{
                    _id
                    username
                }
                businessId{
                    _id
                    businessName
                }
                purchaseDate
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
    }
`

export const UPDATE_QUANTITY = gql`
    mutation updateProductQuantity($quantity: Int!){
        updateProductQuantity(quantitity: $quantity){
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
                    username
                }
                businessId{
                    _id
                    businessName
                }
                purchaseDate
                products{
                    _id
                    name
                    description
                    images
                    price
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