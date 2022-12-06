import { useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_SHOP } from '../utils/queries'
import { Container, Content, Wrap } from './ShopList'
import { Header } from './UserShop';

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
        <Container style={{backgroundColor: data.getShop.secondaryHex}}>
        <Header style={{backgroundColor: data.getShop.primaryHex}}>
            <div>
                <img id='logo' src={data.getShop.image} alt='Logo'/>
            </div>
            <div>
                <h2 style={{color: data.getShop.secondaryHex}}>{data.getShop.businessName}</h2>
                <h4>{data.getShop.slogan}</h4>
            </div>
            </Header>
            {data && <h2 style={{color: data.getShop.primaryHex}}>{data.getShop.businessName}'s Products</h2>}
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
