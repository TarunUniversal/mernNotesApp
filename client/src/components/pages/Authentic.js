import {React, useEffect, useState} from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {useParams, useHistory} from 'react-router'

const Authentic = () => {
    const params = useParams()
    const history = useHistory()
    const [key, setKey] = useState('login');

    useEffect(() => {
        setKey(params.id);
    },[history])

    return (
        <>
            <div style={{margin:'5rem 12% 0px 12%'}} >
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
