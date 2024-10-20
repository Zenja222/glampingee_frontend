import React from 'react'
import {Link} from "react-router-dom";

function MenuBtn() {
    return (
        <div>
            <Link to='/explore'>
                <button type='button' className='btn btn-success btn-lg'> Explore </button>
            </Link>
        </div>
    )
}

export default MenuBtn
