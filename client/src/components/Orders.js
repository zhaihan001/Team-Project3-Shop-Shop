import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { USER_ORDERS } from '../utils/queries'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const {loading, data} = useQuery(USER_ORDERS);
    console.log(orders);

    useEffect(() => {
        if(data?.orders){
            setOrders(data?.orders.slice(0,4))
        }

    },[data])

  return (
    <>
        <div>
            {orders.map((item,index) => {
                return (<div key={index}>
                    <p>Order #{item._id}</p>
                    <p>pending</p>
                </div>
            )
            })}
            {orders.length === 0 && <p>No orders yet.</p>}
        </div>
    </>
  )
}
