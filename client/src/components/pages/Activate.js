import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { activateUser } from '../../actions/user';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';

function Activate() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const userActivate = useSelector(state => state.userActivate);
    const {loading, error, userInfo} = userActivate

    const userActivatefun = () => {
        const token = params.id
        console.log(token);
        dispatch(activateUser(token));
    }

    useEffect(() => {
        if(userInfo){
            history.push('/mynotes');
        }
        userActivatefun();
    }, [history, userInfo])

    return (
        <>
            <h1 className='heading' >Activating your account...</h1>
            { error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
            {loading && <Loading/>}
        </>
    )
}

export default Activate
