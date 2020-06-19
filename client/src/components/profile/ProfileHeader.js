import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

 class ProfileHeader extends Component {
    render() {
        const {profile}=this.props.profile;
        
        return (

<div className="row">
    <div className="col-md-12">
        <div className="card shadow card-body bg-info text-white mb-3">
          <div className="row">
                    <div className="col-md-3 col-4 m-auto">
                      <img className="shadow rounded-circle"
                      src={profile.user.avatar} alt=""/>
                    </div>
             </div>
                <div className="text-center">
                 <h1 className="display-4 text-center">
                 {profile.user.name}
                 </h1>
                 <p className="lead text-center">{profile.status}{' '}
                 {isEmpty(profile.company)? null:
                     (<span>at {profile.company}</span>)}
                 </p>
                 <p>
                  {isEmpty(profile.location)? null:
                     (<span>at {profile.location}</span>)}
                 </p>
                 <p>
                 {isEmpty(profile.website)?(<a className="text-white p-2" href="#"
                      target="_black">
                             <i className="fas fa-globe fa-2x"></i>                
                        </a>):
                     (<span>
                      <a className="text-white p-2" href={profile.website}
                      target="_black">
                             <i className="fas fa-globe fa-2x"></i>                
                        </a>
                     
                     </span>)}

                     {isEmpty(profile.social&& profile.social.twitter)?(<a className="text-white p-2"
                      href="#"
                      target="_black">
                             <i className="fab fa-twitter fa-2x"></i>                
                        </a>):
                     (<span>
                      <a className="text-white p-2" href={profile.social.twitter}
                      target="_black">
                             <i className="fab fa-twitter fa-2x"></i>                
                        </a>
                     
                     </span>)}
                     {isEmpty(profile.social&&profile.social.facebook)?(<a className="text-white p-2" href="#"
                      target="_black">
                             <i className="fab fa-facebook fa-2x"></i>                
                        </a>):
                     (<span>
                      <a className="text-white p-2" href={profile.social.facebook}
                      target="_black">
                             <i className="fab fa-facebook fa-2x"></i>                
                        </a>
                     
                     </span>)}
                     {isEmpty(profile.socail&& profile.social.instagram)?(<a className="text-white p-2" href="#"
                      target="_black">
                             <i className="fab fa-instagram fa-2x"></i>                
                        </a>):
                     (<span>
                      <a className="text-white p-2" href={profile.social.instagram}
                      target="_black">
                             <i className="fab fa-instagram fa-2x"></i>                
                        </a>
                     
                     </span>)}
                       
                        
                </p>
             </div>
         </div>     
    </div>
</div>
        )
    }
}
ProfileHeader.propTypes={
     
     profile:PropTypes.object.isRequired
     }
//map the state with props
const mapStateToProps=(state)=>({
    profile:state.profile
});
export default connect(mapStateToProps)(ProfileHeader);
