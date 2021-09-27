import React from 'react'
import { Button} from 'react-bootstrap'
import createn from '../images/createn.png'

const NotFound = () => {
    return (
        <div style={{width:'fit-content', textAlign:'center', display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'space-evenly', margin:'0rem auto 3rem auto'}} >
            <img src={createn} alt="#" className="" style={{height:'auto', maxWidth:'100%'}}/>

            <div style={{alignSelf:'center', textAlign:'initial'}}>
            <h1 className='heading' style={{textAlign:'initial'}} >Nothing to show,<br/>create a note.</h1>
                <Button className="me-1 btn btn-outline-light" href="/createnote" style={{backgroundColor:'#485785', color:'white'}} >Create Note</Button>
            </div>
        </div>
    )
}

export default NotFound
