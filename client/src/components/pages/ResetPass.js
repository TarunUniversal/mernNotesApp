import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap'
import ErrorMessage from './ErrorMessage';
import { useParams } from 'react-router';
import { resetPass } from '../../actions/user';
import Loading from './Loading';

function ResetPass() {

    const params = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [err, setErr] = useState("")

    const dispatch = useDispatch()
    const resetPassword = useSelector(state => state.resetPassword);
    const {loading, message, error} = resetPassword;

    const submitHandler = (e) => {
        e.preventDefault();
        const token = params.id;
        if(newPassword === "" || confirmPassword === ""){
            setErr('Enter all fields')
        }
        else if(newPassword !== confirmPassword){
            setErr('Passwords do not match.')
        }
        else{
            dispatch(resetPass(token, newPassword, confirmPassword))
        }
    }


    return (
        <>
        <h1 className='heading' >Reset Password</h1>
        {message && <ErrorMessage variant="success" >{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
        {err && <ErrorMessage variant="danger" >{err}</ErrorMessage>}
        {loading && <Loading/>}
        <div style={{margin:'10px 12% 0px 12%'}} >
            <Form onSubmit={(e) => submitHandler(e)} >
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>

            <div style={{textAlign:'center'}}>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </div>
            </Form>
        </div>
        </>
    )
}

export default ResetPass
