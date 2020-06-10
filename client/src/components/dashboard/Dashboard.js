import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile,deleteAccount} from '../../actions/profileActions';
import Spinner from './Spinner';
import {Link} from 'react-router-dom';
import ProfileActions from './ProfileActions';



 class Dashboard extends Component {
     componentDidMount(){
         //Calling action when the component Dashboard is mounted on screen

         this.props.getCurrentProfile();
     }
     onDeleteClick(e){
         //action call
        this.props.deleteAccount();
        //this.props.history.push('/register');
     }
    render() {
        const {user}=this.props.auth;
        const {profile,loading} =this.props.profile;
        let dashboardContent;
        if(profile===null||loading===true){
            dashboardContent=<Spinner/>
        }
        else{
            //Check that the profile is empty object
            //profile={filled}=>Object.keys(profile).length>0 means that filled object
           if(Object.keys(profile).length>0){
              dashboardContent=(
                  <div>
                  <p className="lead text-muted">Welcome,<Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                  <ProfileActions/>
                  { /*Todo:exp and edu */}
                  <div style={{marginBottom:'60px'}}>
                  <button onClick={this.onDeleteClick.bind(this)}
                  className="btn btn-danger">Delete My Account</button>
                  </div>
                  </div>
              )
           }
           else{
               //user do not have profile as its new user
               dashboardContent=
               <div>
               <p className="lead text-muted">Welcome,{user.name}</p>
               <p>You have noy yet a profile,Please add some info</p>
               <Link to="/create-profile" className="btn btn-lg btn-info">
               Create Profile</Link>
               </div>
               
           }
        }
        return (
            <div className="dashboard">
              <div className="container">
               <div className="row">
                 <div className="col-md-12">
                  <h1 className="dispaly-4">Dashboard</h1>
                  {dashboardContent}
                  </div>
                  </div>
                  </div>
            </div>
        )
    }
}

Dashboard.propTypes={
     getCurrentProfile:PropTypes.func.isRequired,
     deleteAccount:PropTypes.func.isRequired,
     auth:PropTypes.object.isRequired,
     profile:PropTypes.object.isRequired

   
}
//map the state with props
const mapStateToProps=(state)=>({
    //same in index.js file auth:
    //you can put any at (auth:) to access its properties and her using auth state by state.auth
    auth:state.auth,
    profile:state.profile
});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
