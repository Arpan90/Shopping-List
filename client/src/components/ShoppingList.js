// import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { v4 as uuid } from 'uuid';
// const uuid = require('uuid').v4;
const { CSSTransition, TransitionGroup } = require('react-transition-group');
const { React, useState, useEffect } = require("react");
const { PropTypes } = require('prop-types');
const { Container, ListGroup, ListGroupItem, Button } = require('reactstrap');
const { connect } = require('react-redux');
const { getItems, deleteItem } = require('../actions/itemActions');
const ShoppingList = (props) => {

    useEffect(() => {
        props.getItems();
    },[]);

    function deletionHandler(id){
        props.deleteItem(id); 
    }

    const { items } = props.item;
    console.log("items: ", items)

    // const [items, setItems] = useState([
    //     {id: uuid(), name: 'Eggs'},
    //     {id: uuid(), name: 'Milk'},
    //     {id: uuid(), name: 'Steak'}, 
    //     {id: uuid(), name: 'Water'}
    // ]);

    return(
        <Container>
           
            <ListGroup className="shopping-list" >
                <TransitionGroup>
                    { items.map(({_id, name}) => ( // underscore is prefixed to id because MongoDB supplies _id 
                        <CSSTransition key={_id} timeout={500} classNames='fade' > 
                            <ListGroupItem>
                                <Button
                                    className='remove-btn'
                                    color='danger'
                                    size='sm'
                                    // onClick = {deletionHandler}
                                    onClick={() => {
                                         deletionHandler(_id);
                                        // items.filter(item => item.id !== id)
                                        // setItems(prevItems => (
                                        //     prevItems.filter(item => item.id !== id)
                                        // ))
                                     }}    
                                    >
                                        &times;
                                </Button>
                                { name }
                            </ListGroupItem>
                        </CSSTransition>
                     ) ) }
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect( mapStateToProps, { getItems, deleteItem } )(ShoppingList);

// Note: CSSTransitions takes classNames and not className as an attribute.

                                