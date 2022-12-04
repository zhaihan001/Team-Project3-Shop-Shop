import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function AddProductModal({toggleModal, showModal}) {
  return (
    <>
        {/* <Modal className='fade' show={showModal} onHide={toggleModal}>
            <Modal.Header>
                <Modal.Title>
                    Add Product

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddProduct />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={toggleModal}>Close</Button>
            </Modal.Footer>

        </Modal> */}
    </>
  )
}
