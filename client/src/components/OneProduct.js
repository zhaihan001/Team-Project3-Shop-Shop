import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_PRODUCT } from '../utils/queries'
import { Container, Content, Wrap } from './ShopList'

export default function OneProduct({businessId, productId}) {
  const {loading, data} = useQuery(GET_PRODUCT, {
    variables: {
      _id: productId
    }
  })

  console.log(data);

  return (
    <>
        <Container>
            <h2>This Product</h2>
            <Content>
                <Wrap>
                    <img src="/images/soap.jpg" alt="product" />
                    <div>
                    <h4>Add to cart</h4>
                    </div>
                    <h3>Marnie's Soaps</h3>
                
                </Wrap>
            </Content>
        </Container>
    </>
  )
}
