import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/user';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

const LoginForm = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if(userInfo){
            history.push('/mynotes');
        }
    }, [history, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    };

    return (
        <div>
            {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {loading && <Loading/>}
            <Form onSubmit={submitHandler} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div style={{textAlign:'center'}}>
            <Button variant="primary" type="submit">
                Login
            </Button>
            </div>
            </Form>
        </div>
    )
}

export default LoginForm
