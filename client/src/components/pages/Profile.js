import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';

const Profile = () => {

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(() => {
        
    }, [userInfo])

    return (
        <>
            <h1 className='heading' >Profile</h1>

            <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', backgroundColor:'#f0f5fa', borderRadius:'100px', margin:'0 20px 0 20px', flexWrap:'wrap', }}>
                <div>
                    <img src={userInfo.pic} alt="" style={{height:'200px', width:'200px', borderRadius:'50%', margin:'10px'}} />
                </div>

                <div style={{textAlign:'center'}} >
                    <h2>{userInfo.name}</h2>
                    <p>{userInfo.email}</p>
                </div>
            </div>
            
            <div style={{textAlign:'center', marginTop:'5%'}} >
            <Button className="btn btn-outline-dark ms-1" href="/profileupdate" style={{backgroundColor:'#485785'}} >Update Profile</Button>
            </div>
        </>
    )
}

export default Profile
