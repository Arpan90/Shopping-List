import React, { useState } from "react";
import { 
    Button,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
// import { v4 as uuid } from 'uuid';

function ItemModal(props){

    function toggle(){
        setModal(prevState => !prevState);
    }

    function changeHandler(e){
        setName(e.target.value);
    }

    function submitHandler(e){
        e.preventDefault();

        console.log("name in itemmodel is: ", name)
        const newItem = {
            // id: uuid(),
            name: name
        }

        // Add item via addItem action
        props.addItem(newItem);

        // Close modal
        toggle();
    }

    const [ modal, setModal ] = useState(false);
    const [ name, setName ] = useState('');

    return(
        <div>
            <Button
                color='dark'
                style={{ marginBottom: '2rem' }}
                onClick={toggle} >
                    Add Item
            </Button>
            <Modal
                isOpen={modal}
                toggle={toggle}>

                    <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitHandler} >
                            <FormGroup>
                                <Label for='item' >Item</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='item'
                                    placeholder='Add shopping item'
                                    onChange={changeHandler} />
                                    <Button
                                        color='dark'
                                        style={{ marginTop: '2rem' }}
                                        block >
                                        Confirm
                                    </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

            </Modal>
        </div>
    );
}

// const mapStateToProps = state => ({
//     item: state.item
// });

export default connect( null , { addItem })(ItemModal);