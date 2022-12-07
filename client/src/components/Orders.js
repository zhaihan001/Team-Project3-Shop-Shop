import React, { useEffect, useState } from 'react'

export default function Orders({orders}) {

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
