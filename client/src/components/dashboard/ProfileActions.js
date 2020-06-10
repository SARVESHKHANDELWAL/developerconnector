import React from 'react';
import {Link} from 'react-router-dom';

const PorfileActions=()=> {
    return (

<div>
    <div className="btn-group mb-4" role="group">
        <Link to='/edit-profile' className="btn btn-light border border-info mr-4">
             <i className="fas fa-user-circle text-info mr-1"/>
             Edit profile
        </Link> 
        <Link to='/add-experience' className='btn btn-light border border-info mr-4'>
             <i className="fab fa-black-tie text-info mr-1"/>
             Add Experience
        </Link>
        <Link to='/add-education' className="btn btn-light border border-info mr-4">
             <i className="fas fa-graduation-cap text-info mr-1"/>
             Add Education
        </Link>       
    </div>
</div>
    )
}
export default PorfileActions;
