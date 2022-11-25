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