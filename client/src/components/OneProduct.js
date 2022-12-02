import React from 'react'
import { Container, Content, Wrap } from './ShopList'

export default function OneProduct() {
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
