import React from 'react'
import styled from 'styled-components'
import ShopList from './Shoplist'

// import styled from 'styled-components'

function Home() {
  return (
<Container>
    <ShopList />
</Container>
  )
}

export default Home

const Container = styled.main`

height: 100vh;
position: relative;
overflow-x: hidden;
overflow-y: auto;
background: white;
perspective: 10px;

&:before {
  no-repeat fixed;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
`