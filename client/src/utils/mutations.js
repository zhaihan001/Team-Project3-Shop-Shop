import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $image: String!){
        addUser(username: $username, email: $email, password: $password, image: $image){
            token
            user {
                _id
                username
                email
                image
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
                            images
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
                    product{
                        _id
                        name
                        description
                        images
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
`
//
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
                        product{
                            _id
                            name
                            description
                            images
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
//
export const ADD_SHOP = gql`
    mutation addShop($businessName: String!, $slogan: String!, $image: String!, $primaryHex: String!, $secondaryHex: String!){
        addShop(businessName: $businessName, slogan: $slogan image: $image, primaryHex: $primaryHex, secondaryHex: $secondaryHex){
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

export const ADD_PRODUCT = gql`
    mutation addProduct($name: String!, $description: String!, $images: [String!]!, $price: Float!, $quantity: Int!){
        addProduct(name: $name, description: $description, images: $images, price: $price, quantity: $quantity){
            _id
            name
            description
            images
            price
            quantity
            userId{
                _id
                username
            }
        }
    }
`
//
export const UPDATE_PRODUCT = gql`
    mutation updateProduct($_id: ID!, $productInput: productInput!){
        updateProduct(_id: $_id, productInput: $productInput){
            _id
            name
            description
            images
            price
            quantity
        }
    }
`

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($productId: ID!){
        deleteProduct(productId: $productId){
            _id
            name
            description
            images
            price
            quantity
        }
    }
`
//
export const ADD_TO_CART = gql`
    mutation addToCart($productId: ID!, $quantity: Int!, $businessId: ID!){
        addToCart(productId: $productId, quantity: $quantity, businessId: $businessId){
            _id
            userId {
                _id
                username
            }
            products{
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
`

export const SUBMIT_ORDER = gql`
    mutation submitOrder($businessId: ID!, $products: [ID]!){
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
                    businessName
                }
                purchaseDate
                products{
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
`
//
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
`

export const UPDATE_QUANTITY = gql`
    mutation updateProductQuantity($quantity: Int!){
        updateProductQuantity(quantitity: $quantity){
            _id
            name
            description
            images
            price
            quantity
        }
    }
`

export const UPDATE_SHOP_IMAGE = gql`
    mutation updateShopImage($image: String!){
        updateShopImage(image: $image){
            _id
            businessName
            image
            
        }
    }
`

export const UPDATE_USER_IMAGE = gql`
    mutation updateUserImage($image: String!){
        updateUserImage(image: $image){
            _id
            username
            image
            
        }
    }
`