import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {registeruser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

 class Register extends Component {
     constructor(){
         super();
         this.state={
             name:'',
             email:'',
             password:'',
             password2:'',
             errors:{}
         }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
     };
      //Again a lifecycle method to not go to again for login when we change the api parameter
     componentDidMount(){
         if(this.props.auth.isAuthenticated){
             this.props.history.push('/dashboard');
         }
     }
     //we want that if component receive the props then set state
     //and change the state of errors component 
     componentWillReceiveProps(nextProps){
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
         const newUser={
             name:this.state.name,
             email:this.state.email,
             password:this.state.password,
             password2:this.state.password2
         };
         //action called by this.props
         //here this.props.history will allow as to redirect within action
         //withRouter is for using props with the actions file 
         this.props.registeruser(newUser,this.props.history);
         /*for fetching the route in backent from frontent components
         we can also use fetchapi() method of react lib*/
         //console.log(newUser);
         
     }
    render() {
        //same mean as {}=this.state.eroors same for user also
        const {errors}=this.state;
        
         
        return (
            <div>
              <div className="register">

              <div className="container">
              <div className="row">
              <div className="col-md-8 col-sm-12 m-auto" > 
              <h1 className="display-4 text-center"  style={{color:"black"}}>Sign Up</h1>
              <p className="lead text-center" style={{color:"black"}}>Create your DevConnector Account</p>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
                    placeholder="Name"
                    name= "name"
                    type="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}/>
              <TextFieldGroup 
                    placeholder="Email Address"
                    name= "email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="This Site uses Gravatar so if you want profile image,use a Gravatar email"/>
             <TextFieldGroup 
                    placeholder="Password"
                    name= "password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}/>
              <TextFieldGroup 
                    placeholder=" Confirm Password"
                    name= "password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}/>
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
Register.propTypes={
    registeruser:PropTypes.func.isRequired,
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

//registerUser is action as second parameter
//mapStateToProps is to get State
//CONNECTING COMPONENT TO REDUX by using connect 
export default connect(mapStateToProps,{registeruser})(withRouter(Register));
