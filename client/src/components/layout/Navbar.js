import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';

class Navbar extends Component {
    onLogoutClick(e){
        e.preventDefault();
        //Action Call on click of logout button on 
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
    render() {
        const {isAuthenticated,user}=this.props.auth;
        /*const authLinks={
            <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                          <a className="nav-link" 
                          href=""
                          onClick={this.onLogoutClick.bind(this)}>
                          <img src={user.avatar} style={{width:'25px',marginRight:'5px'}} alt={user.name}/>
                          {''}Logout</a>
                    </li>
                    
            </ul>
        };
        const guestLinks={
            <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                          <Link className="nav-link" to="/register">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                          <Link className="nav-link" to="/login">Log In</Link>
                    </li>
            </ul>
        };*/
        return (
                <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                <Link className="navbar-brand" to="/">DevConnector</Link>
                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav" >
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                     <Link className="nav-link" to="/profiles">Developers
                     </Link>
                     </li>
                     <li className="nav-item ">
                     
                     </li>
                     </ul>
                     {isAuthenticated ? 
                     <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                          <a className="nav-link" 
                          href="/"
                          onClick={this.onLogoutClick.bind(this)}>
                          <img className="rounded-circle" src={user.avatar} style={{width:'25px',marginRight:'5px'}} alt={user.name}/>
                          {' '}Logout</a>
                    </li>
                    
            </ul>
            :  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                          <Link className="nav-link" to="/register">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                          <Link className="nav-link" to="/login">Log In</Link>
                    </li>
            </ul>}
                    </div>
            </div>
            </nav>
            </div>
        )
    }
}
Navbar.propTypes={
    logoutUser:PropTypes.func.isRequired,
    clearCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
    //same in index.js file auth:
    //you can put any at (auth:) to access its properties and her using auth state by state.auth
    auth:state.auth,
});
        
        
export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})(Navbar);