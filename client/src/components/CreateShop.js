import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Palette } from './Palette';
import { useShopContext } from '../contexts/ShopContext';


function CreateShop() {

  const [shopData, setShopData] = useState({businessName: '', slogan: '', primaryHex: '#ffffff', secondaryHex: '#ffffff' })
  const [image, setImage] = useState(null);
  const [dataUrl, setDataUrl] = useState("")
  console.log(shopData);
  const { newShop } = useShopContext();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleFormChange = (e) => {
    const {name, value} = e.target
    setShopData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const submitShopData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await newShop({
        variables: {
          ...shopData,
          image: dataUrl
        }
      })
      console.log("hit");
      console.log(data);
      window.location.reload();

      return data

    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if(image){
      const reader = new FileReader();
  
      reader.onloadend = (e) => {
        setDataUrl(e.target.result)
      }
  
      reader.readAsDataURL(image)

    }

  }, [image])

  return (
      <Container>
          <ShopForm>  
              <form onSubmit={submitShopData}>
              <h2>Create Your Shop</h2>
              <label htmlFor='shopname'>Shop Name:</label>
              <input value={shopData.businessName} onChange={handleFormChange} type='text' name='businessName' id='shopname' />
              <label htmlFor='shopdesc'>Give a brief description of your shop.</label>
              <input value={shopData.slogan} onChange={handleFormChange} type='text' name='slogan' id='shopdesc' />
              <label htmlFor='logo'>Upload an image for your shop's logo.</label>
              <input onChange={handleImageChange} type='file' name='logo' id='logo' /><br></br>
              {image && <img src={dataUrl} alt="chosen-logo" style={{width: "20rem"}} />}
              <label htmlFor='primary'>Pick a primary color for your shop.</label>
              <input value={shopData.primaryHex} onChange={handleFormChange} type="color" id="primary" name="primaryHex"
                />
              <label htmlFor='secondary'>Pick a secondary color for your shop.</label>
              <input value={shopData.secondaryHex} onChange={handleFormChange} type="color" id="secondary" name="secondaryHex"
                />
              <button type='submit'>Create Shop</button>
          </form>
          </ShopForm>

      </Container>

  )
}

export default CreateShop

const Container = styled.div`
  padding-top: 3vw;
  background-image: url("/images/pinkgrid.png");
  background-size: cover;

  h2 {
    font-size: 40px;
    text-decoration: underline;
    color: ${Palette.red};
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 4px;
    text-underline-offset: 8px;
    margin-bottom: 5vh;
 }
    
`
const ShopForm = styled.div`

display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  font-size: 16px;
  padding: 60px;

  input {
    width: 300px;
    min-height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(123, 145, 171);
    &:focus {
      border: 2px solid rgb(144, 57, 57);
      }
    }
  }

  label {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: ${Palette.fadedGrey};
  }

  // Signup BUTTON STYLES

  button{
    padding: 20px;
    margin-top: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    background: ${Palette.blue};
    color: white;
    border: none;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.05);
      border-color: rgba(249, 249, 249, 0.8);
    }
  }

  input[type="submit"] {
    padding: 20px;
    margin-top: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    background: black;
    color: white;
    border: none;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.05);
      border-color: rgba(249, 249, 249, 0.8);
      background: grey;
      color: black;
    }
  }
  
  // Login link

  a {
    padding-top: 20px;
  }
  
  `

