import React, { Component } from 'react'

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

 class Login extends Component {
constructor(){
         super();
         this.state={
             
             email:'',
             password:'',
             errors:{}
             
         }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
     };
    //It corresponds to the componentDidUpdate() method from the mounting phase.
     //Again a lifecycle method to not go to again for login when we change the api parameter
     componentDidMount(){
         if(this.props.auth.isAuthenticated){
             this.props.history.push('/dashboard');
         }
     }
     //we want that if component receive the props then set state
     //and change the state of errors component 
     //lifecycle methods
     //"getDerivedStateFromProps" this is used It was added in React 16.3, aiming to replace the componentWillReceiveProps deprecated
     //method.
     componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
             this.props.history.push('/dashboard')
         }
      if(nextProps.errors){
          this.setState({errors:nextProps.errors})
      }
     }
     onChange(e){
         this.setState({[e.target.name]:e.target.value});
     };
     onSubmit(e){
         
         /*preventDefult is used for when 
         submitting the form to prevent a
          browser reload/refresh.*/
         e.preventDefault();
         const LoginUser={
             
             email:this.state.email,
             password:this.state.password,
            
         }
         //console.log(LoginUser);
          this.props.loginUser(LoginUser);
     }
    render() {
        const {errors}=this.state;

        return (
            <div>
                <div className="login">
              <div className="container">
              <div className="row">
              <div className="col-md-8 col-sm-12 m-auto" >
              <h1 className="display-4 text-center"  style={{color:"black"}}>Log In</h1>
              <p className="lead text-center" style={{color:"black"}}>Sign In DevConnector Account</p>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
                    placeholder="Email Address"
                    name= "email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}/>
               <TextFieldGroup 
                    placeholder="Password"
                    name= "password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}/>
            
            <input type="submit" className="btn btn-info btn-block mt-4"/>
            <br/>
            <br/>
            </form>
            </div>
        </div>
     </div>
    </div>
 </div>
        )
    }
}
Login.propTypes={
    loginUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
//map the state with props
const mapStateToProps=(state)=>({
    //same in index.js file auth:
    //you can put any at (auth:) to access its properties and her using auth state by state.auth
    auth:state.auth,
    errors:state.errors

});

export default connect(mapStateToProps,{loginUser})(Login);
