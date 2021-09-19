import React, { useEffect, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateProfile } from '../../actions/user';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

const ProfileUpdate = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState();
    const [picMessage, setPicMessage] = useState();

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, error, success } = userUpdate;

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProfile({name, email, password, pic}));
        history.push("/profile");
    }

    const postDetails = (pics) => {
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
              setPic(data.url.toString());
              console.log(pic);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return setPicMessage("Please Select an Image");
        }
      };

    useEffect(() => {
        if(!userInfo){
            history.push("/");
        } else{
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);
        }
    }, [history, userInfo])

    return (
        <>
            <h1 className='heading' >Update Profile</h1>
            {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {picMessage && <ErrorMessage variant="danger" >{picMessage}</ErrorMessage>}
            {success && <ErrorMessage variant="success" >Successfully Updated</ErrorMessage>}
            {loading && <Loading/>}
            <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}} >
                <div>
                    <Image src={pic} alt={name} style={{height:'300px', width:'300px', backgroundColor:'#f0f5fa'}} rounded />
                </div>

                <div style={{width:'max-content', marginLeft:'5%', marginBottom:'3rem'}} >
                <Form onSubmit={submitHandler} >
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="form-group mb-3">
                        <Form.Label className="form-label" >Profile Picture</Form.Label>
                        <Form.Control className="form-control" type="file" onChange={(e) => postDetails(e.target.files[0])} />
                    </Form.Group>
                    <div style={{textAlign:'center'}}>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                    </div>
                </Form>
                </div>
            </div>
        </>
    )
}

export default ProfileUpdate
