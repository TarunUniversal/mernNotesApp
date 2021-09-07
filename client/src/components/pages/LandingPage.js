import {useHistory} from 'react-router-dom';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import img1 from '../images/img1.png'

const LandingPage = () => {
    const history = useHistory();
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo){
            history.push("/mynotes");
        }
    }, [history])

    return (
        <>
            <div style={{width:'fit-content', textAlign:'center', display:'flex', flexDirection:'row', flexWrap:'wrap-reverse', justifyContent:'space-evenly', margin:'5% auto 0 auto'}} >
                <div style={{alignSelf:'center', marginBottom:'1rem'}}>
            <h1 className='heading' style={{textAlign:'initial'}} >When your heart speaks,<br/>take good notes.</h1>
                <Button className="me-1 btn btn-outline-light" href="/authenticate" >Login</Button>
                <Button className="btn btn-outline-dark ms-1" href="/authenticate" style={{backgroundColor:'#485785'}} >Register</Button>
            <p className="mt-3">first time user click on register button</p>
            </div>
            <img src={img1} alt="#" className="" style={{height:'auto', maxWidth:'100%', marginTop:'3rem'}}/>
            </div>
        </>
    )
}

export default LandingPage;
