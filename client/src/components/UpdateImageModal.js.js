import { useMutation } from '@apollo/client';
import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import styled from "styled-components";
import { useUserContext } from '../contexts/UserContext';

export default function UpdateImageModal({toggleModal, showModal}) {
    const {updateImage} = useUserContext();  
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState("")  

    const updateUserImg = async () => {
        try {
            const { data } = await updateImage({
                variables: {
                    image: newImage
                }
            })

            window.location.reload();

        } catch (error) {
            console.log(error);
            return error
        }
    }

    useEffect(() => {
        if(image){
          const reader = new FileReader();
    
          reader.onloadend = (e) => {
            setNewImage(e.target.result)
          }
    
          reader.readAsDataURL(image)
    
        }
    
    }, [image])

    const handleImageChange = (e) => {
    e.persist();
    setImage(e.target.files[0]);
    };

  
    return (
    <>
        {showModal && <Modal className='fade .modal' show={showModal} onClick={() => toggleModal}>
           <div className='modal-contain'>
                <div className='modal-header'>
                    <h4>Update Shop logo</h4>
                </div>

                <div>
                    <input
                    onChange={handleImageChange}
                    type="file"
                    name="profileImange"
                    id="profileImange"
            />

                    {newImage && <img src={newImage} alt="updated" style={{
                        width: '15rem'
                    }} />}

                </div>

                <div className='modal-footer'>
                    <Button onClick={updateUserImg}>Update</Button>
                    <Button onClick={() => toggleModal()}>Close</Button>

                </div>
           </div>


        </Modal>}
    </>
  )
}


const Modal = styled.div`

    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);
    z-index: 1; 
    width: 100%; 
    height: 100%; 
    position: fixed; 
    top: 0;
    left: 0;
    overflow: auto; 
    padding-top: 80px; 

    .modal-contain{
        box-shadow: 0 0 5px black;
        width: 70%;
        height: 250px;
        margin: auto;
        background-color: #fffeee;
        border-radius: 5px;
        position: relative;
    }

    .modal-footer{
        position: absolute;
        right: 0;
        bottom: 0;
        padding:2%;
    }
    
    .modal-header{
        border-bottom: 1px solid black;
        padding: 2%;
    }
`