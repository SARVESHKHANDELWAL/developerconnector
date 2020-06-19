import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileAbout extends Component {
    render() {
        const {profile}=this.props.profile;
         //Important as to split the name to get the firstname
        const firstname=profile.user.name.trim().split(' ')[0];
         //Skills Array
         const skills=profile.skills.map((skill,index)=>(
             <div key={index} className="p-3">
             <i className="fa fa-check"></i>{skill}</div>
         ))

         return (
        <div className="row">
            <div className="col-md-12">
                    <div className="card shadow card-body bg-light mb-3">
                        <h3 className="text-center text-info">{firstname}'s Bio</h3>
                        <p className="lead">
                        {isEmpty(profile.bio)?
                        (<span>{firstname} does not have Bio</span>):
                         (<span>at {profile.bio}</span>)}</p>
                         <hr/>
                         <h3 className="text-center text-info">Skill Set</h3>
                            <div className="row">
                                <div className="d-flex flex-wrap justify-content-center align-items-center">
                                {skills}
                             </div>
                        </div>
                    </div>
            </div>
        </div>       
        
        )
    }
}
ProfileAbout.propTypes={
     
     profile:PropTypes.object.isRequired
     }
//map the state with props
const mapStateToProps=(state)=>({
    profile:state.profile
});

export default connect(mapStateToProps,null)(ProfileAbout);