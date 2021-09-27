import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'
import ErrorMessage from './ErrorMessage';
import { forgotPass } from '../../actions/user';
import Loading from './Loading';
import { useEffect } from 'react';

function ForgotPass() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState("")

    const dispatch = useDispatch()
    const forgotPassword = useSelector(state => state.forgotPassword)
    const {loading, error, message} = forgotPassword;

    const userActivate = useSelector(state => state.userActivate);
    const {userInfo} = userActivate;

    const submitHandler = async (e) => {
        e.preventDefault();
        if(email === ""){
            setErrMsg('Please enter your email.')
        } else{
            dispatch(forgotPass(email))
        }
    }

    useEffect(() => {
        if (userInfo) {
          history.push("/");
        }
      }, [history, userInfo]);

    return (
        <>
        <h1 className='heading' >Forgot Password</h1>
        <div style={{margin:'10px 12% 0px 12%'}} >
        {message && <ErrorMessage variant="success" >{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
        {errMsg && <ErrorMessage variant="danger" >{errMsg}</ErrorMessage>}
        {loading && <Loading/>}
            <Form onSubmit={submitHandler} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <div style={{textAlign:'center'}}>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            &emsp;
            <Button variant="danger" href="/authenticate/login">
                Cancel
            </Button>
            </div>
            </Form>
        </div>
        </>
    )
}

export default ForgotPass
