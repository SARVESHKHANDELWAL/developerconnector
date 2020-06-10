import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

   
class Landing extends Component {
    //Again a lifecycle method to not go to again for login when we change the api parameter
     componentDidMount(){
         if(this.props.auth.isAuthenticated){
             this.props.history.push('/dashboard');
         }
     }
    render() {
        return (
            <div>
            <div className="landing">
            <div className="dark-overlay landing-inner text-light">
            <div className="container">
            <div className="row">
            <div className="col-md-12 text-center">
            <h1 className="display-3 mb-4">Developer Connector
            </h1>
            <p className="lead">Create a Developer Profile,Share Posts and get help from
            other developers</p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-info mr-2">SignUp</Link>
            <Link to="/login" className="btn btn-lg btn-light mr-2">Login</Link>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        )
    }
}
Landing.propTypes={
   
    auth:PropTypes.object.isRequired,
   
}
//map the state with props
const mapStateToProps=(state)=>({
    //same in index.js file auth:
    //you can put any at (auth:) to access its properties and her using auth state by state.auth
    auth:state.auth,
   

});
export default connect(mapStateToProps)(Landing);