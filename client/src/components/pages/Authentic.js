import {React, useState} from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Authentic = () => {

    const [key, setKey] = useState('login');

    return (
        <>
            <h1 className='heading' >Login | Register</h1>
            <div style={{margin:'10px 12% 0px 12%'}} >
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            style={{justifyContent:'center'}}
            >
            <Tab eventKey="login" title="LogIn" >
                <LoginForm/>
            </Tab>
            <Tab eventKey="register" title="Register">
                <RegisterForm/>
            </Tab>
            </Tabs>
            </div>
        </>
    )
}

export default Authentic;
