import React, { useState, useEffect, useRef } from "react";
import { 
    Button,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

function LoginModal(props){

    function toggle(){
        props.clearErrors();
        console.log("modal is: ", modal)
        setModal(prevState => !prevState);
    }

    function changeHandler(e){
        // if(e.target.name === 'name'){
        //     console.log("name is: ", e.target.value);
        //     setName(e.target.value);
        // }
        if(e.target.name === 'email'){
            setEmail(e.target.value);
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value);
        }
    }

    function submitHandler(e){
        e.preventDefault();
        // Create new user object
        const user = {
            email,
            password
        };

        // Attempt to login
        props.login(user);
    }

    const [ modal, setModal ] = useState(false);
    // const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ msg, setMsg ] = useState(null);
    const [ prevError, setPrevError ] = useState('');

    const didMountRef = useRef(false);

    useEffect(() => {
        const { error, isAuthenticated } = props;
        if(didMountRef){
            // componentDidUpdate logic
            if(error !== prevError){
                // Check for register error
                if(error.id === 'LOGIN_FAIL'){
                    setMsg(error.msg.msg );
                }
                else{
                    setMsg(null );
                }
            }
        }
        else{
            // componentDidMount logic
            didMountRef.current = true;
        }
        setPrevError(error); // stores last value of error to be compared with new value.

        if(modal && isAuthenticated){ // if modal is open and the user successfully registered
            console.log("hit", isAuthenticated)
            toggle(); // close modal
        }
    });

    return(
        <div>
            <NavLink onClick={toggle} href="#" >
                Login
            </NavLink>
            <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader toggle={toggle}>Login</ModalHeader>
                    <ModalBody>
                    { msg ? (<Alert color='danger' >{ msg }</Alert>) : null }
                        <Form onSubmit={submitHandler} >
                            <FormGroup>
                                {/* <Label for='name' >Name</Label>
                                <Input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Name'
                                    className='mb-3'
                                    onChange={changeHandler} /> */}

                                <Label for='email' >Email</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Email'
                                    className='mb-3'
                                    onChange={changeHandler} />

                                <Label for='password' >Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password'
                                    className='mb-3'
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

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect( mapStateToProps , { login, clearErrors })(LoginModal);