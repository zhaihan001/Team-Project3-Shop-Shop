import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Palette } from './Palette';
import { useProductContext } from '../contexts/ProductContext';

function AddProduct({setShowProductForm}) {

    const [productData, setProductData] = useState({name: '', description: '', price: '', quantity: "" });
    const [images, setImages] = useState([]);
    const [dataUrlArr, setDataUrlArr] = useState([])
    const { newProduct } = useProductContext();
    

    const handleImageChange = (e) => {
      e.persist();
      setImages(prev => {
        return [...prev, e.target.files[0]]
      });
    }

   
    
    const handleFormChange = (e) => {
      const {name, value} = e.target
      setProductData(prev => {
        return {
          ...prev,
          [name]: name === "price" || name === "quantity" ? parseInt(value) : value
        }
      })
    }

    const submitProductData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await newProduct({
          variables: {
            ...productData,
            images: dataUrlArr
          }
        })


        console.log(data);
        window.location.reload();
  
        return data
  
      } catch (error) {
        console.log(error)
        return error
      }
    }

    useEffect(() => {
      if(images.length > 0){
        const reader = new FileReader();
    
        reader.onloadend = (e) => {
          setDataUrlArr(prev => {
            return [...prev, e.target.result]
          })
        }
    
        reader.readAsDataURL(images[images.length - 1])
  
      }
  
    }, [images])

    return(
        <Container>
            <button onClick={() => setShowProductForm(prev => !prev)}>Back</button>
            <ProductForm>
            <form onSubmit={submitProductData}>
              <h2>Add Your Product</h2>
              <label htmlFor='productname'>Name:</label>
              <input value={productData.name} onChange={handleFormChange} type='text' name='name' id='itemname' required />
              <label htmlFor='itemdesc'>Item Description</label>
              <input value={productData.description} onChange={handleFormChange} type='text' name='description' id='itemdesc' required />
              <label htmlFor='itemdesc'>Input price</label>
              <div>$ <input value={`${productData.price}.00`} onChange={handleFormChange} type='number' min='0' max='10000' step='any' name='price' id='itemdesc' className='price' required /></div>
              <label htmlFor='itemdesc'>In stock</label>
              <input placeholder='Enter quantity' value={productData.quantity} onChange={handleFormChange} type='number' min='0' max='10000' step='any' name='quantity' id='itemdesc' className='quantity' required />
              <label htmlFor='itemImg'>Upload an image of your product.</label>
              <input onChange={handleImageChange} type='file' name='image' required /><br></br>
              {images[0] && <img src={dataUrlArr[0]} alt="itemImage" style={{width: "20rem"}} />}
              {/* <input onChange={handleImageChange} type='file' name='image' required /><br></br>
              {images[1] && <img src={dataUrlArr[1]} alt="itemImage" style={{width: "20rem"}} />}
              <input onChange={handleImageChange} type='file' name='image' required /><br></br>
              {images[2] && <img src={dataUrlArr[2]} alt="itemImage" style={{width: "20rem"}} />} */}
              <button type='submit'>Add Product</button>
          </form>
            </ProductForm>
        </Container>
    )
}

export default AddProduct

const Container = styled.div`
  padding: 3vw;
  background-image: url("/images/pinkgrid.png");
  background-size: cover;

  button {
    padding: 10px;
    cursor: pointer;
    font-size: 1.5rem;
    background: ${Palette.fadedGrey};
    color: white;
    border: none;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.05);
      background: ${Palette.red};
    }
  }

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
      background: ${Palette.blue};
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

