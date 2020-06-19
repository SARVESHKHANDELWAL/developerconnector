import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//Components
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGitHub from './ProfileGitHub';
import ProfileAbout from './ProfileAbout';
import Spinner from '../dashboard/Spinner';
import {getProfileByHandle} from '../../actions/profileActions';

class Profile extends Component {
    componentDidMount(){
        //making use of url to get the handle and then mount the component of the corresponding handle
        if(this.props.match.params.handle){

         this.props.getProfileByHandle(this.props.match.params.handle);
        }

     }
    render() {
        const  {profile,loading}=this.props.profile;
        let profileContent;

        if(profile===null||loading){
            profileContent=<Spinner/>
        }
        else{
            profileContent=(
        <div>
             <div className="row">
                  <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-info mb-3 float-left">
                              Back To Profiles
                            </Link>
                  </div>
                  <div className="col-md-6"/>
             </div>
                     <ProfileHeader/>
                     <ProfileAbout/>
                     <ProfileCreds/>
                     {profile.githubusername?(<ProfileGitHub/>):
                     null}
                     
        </div>
            )
        }
        return (
        <div className="profile">
             <div className="contanier">
                 <div className="row">
                     <div className="col-md-12">
                         {profileContent}
                     </div>
                 </div>   
             </div>
         </div>    
        )
    }
}
Profile.propTypes={
     getProfileByHandle:PropTypes.func.isRequired,
     profile:PropTypes.object.isRequired
     }
//map the state with props
const mapStateToProps=(state)=>({
    profile:state.profile
});

export default connect(mapStateToProps,{getProfileByHandle})(Profile);