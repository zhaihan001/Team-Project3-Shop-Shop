import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_SHOP } from '../utils/queries'
import { Container, Content, Wrap } from './ShopList'

export default function ProductList({id}) {
    const {loading, data} = useQuery(GET_SHOP, {
        variables: {
            _id: id
        }
    })

  return (
    <>
        <Container>
            <h2>Shop's Products</h2>
            <Content>
                <Wrap>
                <img src="/images/soap.jpg" alt="product" />
                <Link to="/shop/product">
                    <div>
                    <h4>View Product</h4>
                    </div>
                    <h3>Marnie's Soaps</h3>
                </Link>
                </Wrap>
            </Content>
        </Container>
    </>
  )
}
