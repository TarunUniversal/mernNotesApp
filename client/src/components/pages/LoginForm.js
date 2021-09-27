import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/user';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const LoginForm = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const sendGoogleToken = tokenId => {
        axios
            .post(`/api/users/googlelogin`,{
                idToken: tokenId
            })
            .then(res => {
                console.log("google",res.data);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    const googleAuth = response => {
        console.log(response);
        sendGoogleToken(response.tokenId)
      };

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    };

    useEffect(() => {
        if(userInfo){
            history.push('/mynotes');
        }
    }, [userInfo, history]);

    return (
        <div>
            {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {loading && <Loading/>}
            <div style={{textAlign:'center'}} >
            <GoogleLogin
                clientId="445177317379-vm6spbkq5c1is9jk024i020ttiaqgplo.apps.googleusercontent.com"
                render={renderProps => (
                    // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                    <Button  onClick={renderProps.onClick} disabled={renderProps.disabled} style={{width:'310px', display:'flex', justifyContent:'center', alignItems:'center', margin:"2rem auto 2rem auto"}} > <FontAwesomeIcon icon={faGoogle} size="2x" style={{marginRight:'0.5rem'}} />  login with Google</Button>
                  )}
                buttonText="login with Google"
                onSuccess={googleAuth}
                onFailure={googleAuth}
                cookiePolicy={"single_host_origin"}
                style={{width:'100px', justifyContent:'center'}}
            />
            <h2>or login using your email</h2>
            </div>
            <Form onSubmit={submitHandler} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address <spam style={{color:'red'}} >*</spam> </Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password <spam style={{color:'red'}} >*</spam> </Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div style={{textAlign:'center'}}>
            <Button variant="primary" type="submit">
                Login
            </Button>
            </div>

            <a href="/forgot-password" style={{textDecoration:'none'}} >forgot password</a>
            </Form>
        </div>
    )
}

export default LoginForm
