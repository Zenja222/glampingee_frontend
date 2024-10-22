import React from 'react'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

function MenuBtn() {
    return (
        <div>
            <Link to='/explore'>
                <Button href='/register' className='btn btn-warning text-uppercase fw-semibold ms-2'
                        style={{ backgroundColor: '#ff9f00', border: 'none' }}>Explore</Button>
            </Link>
        </div>
    )
}

export default MenuBtn
