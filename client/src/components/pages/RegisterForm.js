import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import { register } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
    const history = useHistory();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
    const [passErr, setPassErr] = useState("");

    const [picMessage, setPicMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegistration);
    const { loading, error, message } = userRegister;

    const userActivate = useSelector(state => state.userActivate);
    const {userInfo} = userActivate

    const postDetails = (pics) => {
        if (
          pics ===
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        ) {
          return setPicMessage("Please Select an Image");
        }
        setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "mernnotesapp");
          data.append("cloud_name", "tarununiversal");
          fetch("https://api.cloudinary.com/v1_1/tarununiversal/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setPic(data.url.toString());
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return setPicMessage("Please Select an Image");
        }
      };

    useEffect(() => {
        if (userInfo) {
          history.push("/");
        }
      }, [history, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if(name === "" || email === "" || password === "" || confirmpassword === ""){
          setPassErr("Please fill desired fields.");
        }
        else if (password !== confirmpassword) {
          setPassErr("Passwords does not match.");
        }
        else{
          dispatch(register(name, email, password, pic));
        }
    };

    return (
        <div style={{marginBottom:'2rem'}} >
            {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {passErr && <ErrorMessage variant="danger" >{passErr}</ErrorMessage>}
            {message && <ErrorMessage variant="success">{message}</ErrorMessage>}
            {picMessage && (<ErrorMessage variant="danger">{picMessage}</ErrorMessage>)}
            {loading && <Loading/>}
            <Form onSubmit={submitHandler} >
            <Form.Group className="mb-3" >
                <Form.Label>Name <spam style={{color:'red'}} >*</spam> </Form.Label>
                <Form.Control id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email address <spam style={{color:'red'}} >*</spam> </Form.Label>
                <Form.Control id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Password <spam style={{color:'red'}} >*</spam> </Form.Label>
                <Form.Control id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Confirm Password <spam style={{color:'red'}} >*</spam> </Form.Label>
                <Form.Control id="confirm-password" type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="form-group mb-3" >
                <Form.Label className="form-label" >Choose Profile Picture</Form.Label>
                <Form.Control id="pic" className="form-control" type="file" onChange={(e) => postDetails(e.target.files[0])} />
            </Form.Group>
            <div style={{textAlign:'center'}}>
            <Button variant="primary" type="submit">
                Register
            </Button>
            </div>
            </Form>
        </div>
    )
}

export default RegisterForm;
