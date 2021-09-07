import React from 'react'

const Footer = () => {
    return (
        <>
        
        <div container style={{display:'flex', backgroundColor:'#1a1e21', position:'fixed', bottom:'0',zIndex:"8", width:'100%', justifyContent:'center'}} >
            <div style={{paddingRight:'12px'}} >Copyright © {new Date().getFullYear()} All rights are reserved</div>
        </div>
        </>
    )
}

export default Footer
