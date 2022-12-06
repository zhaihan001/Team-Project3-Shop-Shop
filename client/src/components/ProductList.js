import { useQuery } from '@apollo/client'
import { identity } from 'angular'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShopContext } from '../contexts/ShopContext'
import { GET_PRODUCTS, GET_SHOP } from '../utils/queries'
import { Container, Content, Wrap } from './ShopList'

export default function ProductList({id}) {
    const {shops} = useShopContext();
    const {loading, data: shopData} = useQuery(GET_SHOP, {
        variables: {
            _id: id
        }
    })


    if(loading){
        return (
            <div>Loading...</div>
        )
    }


  return (
    <>
        <Container>
            {<h2>{shopData.getShop.businessName}'s Products</h2>}
            <Content>
                {shopData && shopData.getShop.products.map((item,index) => (
                    <Wrap key={index}>
                    {<img src={item.images[0] || ""} alt="product" />}
                    <Link to={`/shop/${id}/product/${item._id}`} state={{price: item.price}} >
                        <div>
                        <h4>View Product</h4>
                        </div>
                        <h3>{item.name}</h3>
                    </Link>
                    </Wrap>
                ))}
            </Content>
        </Container>
    </>
  )
}
