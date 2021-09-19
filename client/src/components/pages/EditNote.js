import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap'
import axios from 'axios';
import { updateNoteAction } from '../../actions/notes';
import Loading from '../pages/Loading';
import ErrorMessage from '../pages/ErrorMessage';

const EditNote = ({match}) => {
    const history = useHistory();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();

    const dispatch = useDispatch();
    const noteUpdate = useSelector(state => state.noteUpdate);
    const {loading, error} = noteUpdate;

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const fetching = async () => {
        const {data} = await axios.get(`/api/notes/${match.params.id}`);
        console.log(data);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
    };

    useEffect(() => {
        fetching();
    });
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(!title || !content || !category) return;
        dispatch(updateNoteAction(match.params.id, title, content, category));

        resetHandler();
        history.push("/mynotes");
    }

    return (
        <>
            <h1 className='heading' >Edit Note</h1>
            {loading && <Loading/>}
            {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            <div style={{margin:'10px 12% 0px 12%'}} >
            <Form onSubmit={submitHandler} >
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Title</Form.Label>
                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Started React JS"  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Content</Form.Label>
                <Form.Control value={content} onChange={(e) => setContent(e.target.value)} as="textarea" rows={3} placeholder="I aim to be a full stack dev someday Made my first App in React JS." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Category</Form.Label>
                <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Learning"  />
            </Form.Group>
            <div style={{textAlign:'center'}}>
            <Button variant="primary" type="submit">
                Edit
            </Button>
            </div>
            </Form>
</div>
        </>
    )
}

export default EditNote;
