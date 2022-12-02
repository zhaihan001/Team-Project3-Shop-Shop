import React from 'react'
import CreateShop from '../components/CreateShop';


function Usershop(shop) {
  if (!shop.id) {
    return (
      <div>
        <CreateShop />
      </div>
    );
  }
  return(
    <Usershop/>
  )

  }

export default Usershop