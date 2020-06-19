import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

 class ProfileCreds extends Component {
    
     
    render() {
         const {education,experience}=this.props.profile.profile;
    
     const expItems=experience.map(exp=>(
         <li key={exp._id} className="list-group-items card shadow1 card-body">
         <h4>{exp.company}</h4>
         <p>
         <Moment format="DD/MM/YYYY">
         {exp.from}</Moment>-
         {exp.to===null?('Now'):( <Moment format="DD/MM/YYYY">
         {exp.to}</Moment>)}
         </p>
         <p>
         <strong>Position:
         {exp.title}</strong>
         </p>
         <p>
         {exp.location===''?null:(
             <span><strong>Location:</strong>{exp.location}</span>
         )}
         </p>
         <p>
         {exp.description===' '?null:(
             <span><strong>Description:</strong>{exp.description}</span>
         )}
         </p>
         <hr/>
         </li>
         
     ));
     const eduItems=education.map(edu=>(
         <li key={edu._id} className="list-group-items">
         <h4>{edu.school}</h4>
         <p>
         <Moment format="DD/MM/YYYY">
         {edu.from}</Moment>-
         {edu.to===null?('Now'):( <Moment format="DD/MM/YYYY">
         {edu.to}</Moment>)}
         </p>
         <p>
         <strong>Degree:
         {edu.degree}</strong>
         </p>
         <p>
         <strong>Field Of Study:
         {edu.fieldofstudy}</strong>
         </p>
         <p>
         {edu.description===' '?null:(
             <span><strong>Description:</strong>{edu.description}</span>
         )}
         </p>
          <hr/>
         </li>
     ));
        return (
            <div className="card card-body">
            <div className="row">
            <div className="col-md-6">
            <h1 className="text-center text-info">
            Experience
            </h1>
           {expItems.length>0 ?
           (<span><ul className="list-group">{expItems}</ul></span>):
           (<span><ul className="text-center">No Experience Listed</ul></span>)}
            </div>
            <div className="col-md-6">
            <h1 className="text-center text-info">
            Education
            </h1>
           {eduItems.length>0 ?
           (<span><ul className="list-group">{eduItems}</ul></span>):
           (<span><ul className="text-center">No Education Listed</ul></span>)}
            </div>
            </div>
            </div>
        )
    }
 }  
ProfileCreds.propTypes=
{
     profile:PropTypes.object.isRequired
}
//map the state with props
const mapStateToProps=(state)=>({
    profile:state.profile
});
export default connect(mapStateToProps,null)(ProfileCreds);
