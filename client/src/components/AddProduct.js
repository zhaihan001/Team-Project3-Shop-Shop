import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Palette } from './Palette';
import { useProductContext } from '../contexts/ProductContext';

function AddProduct() {

    const [productData, setProductData] = useState({name: '', description: '', price: '' })
    const [images, setImages] = useState([]);
    const [dataUrlArr, setDataUrlArr] = useState("")
    console.log(productData);
    const { newProduct } = useProductContext();

    const handleImageChange = (e) => {
        setImages(e.target.files[0]);
      }
    
      const handleFormChange = (e) => {
        const {name, value} = e.target
        setProductData(prev => {
          return {
            ...prev,
            [name]: value
          }
        })
      }

      const submitProductData = async (e) => {
        e.preventDefault();
        try {
          const { data } = await newProduct({
            variables: {
              ...productData,
              image: dataUrlArr
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
        if(images.length > 0){
          const reader = new FileReader();
      
          reader.onloadend = (e) => {
            setDataUrlArr(e.target.result)
          }
      
          reader.readAsDataURL(images[images.length - 1])
    
        }
    
      }, [images])

    return(
        <Container>
            <ProductForm>
            <form onSubmit={submitProductData}>
              <h2>Add Your Product</h2>
              <label htmlFor='productname'>Name:</label>
              <input value={productData.name} onChange={handleFormChange} type='text' name='itemName' id='itemname' />
              <label htmlFor='itemdesc'>Item Description.</label>
              <input value={productData.description} onChange={handleFormChange} type='text' name='desc' id='itemdesc' />
              <label htmlFor='itemdesc'>Input price.</label>
              <input value={productData.price} onChange={handleFormChange} type='number' min='0' max='10000' step='any' name='desc' id='itemdesc' />
              <label htmlFor='itemImg'>Upload an image of your product.</label>
              <input onChange={handleImageChange} type='file' name='itemImg' id='itemImg' /><br></br>
              {images && <img src={dataUrlArr} alt="itemImage" style={{width: "20rem"}} />}
              <button type='submit'>Add Product</button>
          </form>
            </ProductForm>
        </Container>
    )
}

export default AddProduct

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
const ProductForm = styled.div`

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

