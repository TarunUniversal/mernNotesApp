import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { createNoteAction } from '../../actions/notes';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

const CreateNote = () => {
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();
    const noteCreate = useSelector(state => state.noteCreate);
    const { loading, error, note } = noteCreate;
    console.log(note);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(!title || !content || !category) return;
        dispatch(createNoteAction(title, content, category));
        
        resetHandler();
        history.push("/mynotes");
    }

    useEffect(() => {
        if(!userInfo) history.push('/')
    }, [userInfo, history])

    return (
        <>
            <h1 className='heading' >Create Note</h1>
            {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {loading && <Loading size={50} />}
            <div style={{margin:'10px 12% 0px 12%'}} >
            <Form onSubmit={submitHandler} >
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Title <spam style={{color:'red'}} >*</spam> </Form.Label>
                <Form.Control type="text" placeholder="Started React JS" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content <spam style={{color:'red'}} >*</spam></Form.Label>
                <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="I aim to be a full stack dev someday Made my first App in React JS." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Category <spam style={{color:'red'}} >*</spam></Form.Label>
                <Form.Control type="text" placeholder="Learning" value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>
            <div style={{textAlign:'center'}}>
            <button className="btn btn-success" variant="primary" type="submit">
                Create
            </button>
            &emsp;
            <button className="btn btn-danger" variant="primary" type="submit" onClick={resetHandler} >
                Reset
            </button>
            </div>
            </Form>
            </div>
        </>
    )
}

export default CreateNote
