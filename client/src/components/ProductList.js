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
    console.log(data);

    const productsList = data?.getShop.products || null

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

  return (
    <>
        <Container>
            {data && <h2>{data.getShop.businessName}'s Products</h2>}
            <Content>
                {productsList && productsList.map((item,index) => (
                    <Wrap key={index}>
                    <img src={item.images[0]} alt="product" />
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
