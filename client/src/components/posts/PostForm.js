import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPosts}  from '../../actions/postActions';

class PostForm extends Component {
    constructor(props){
        super(props);
            this.state={
                text:'',
                errors:{}
            }
                  this.onChange=this.onChange.bind(this);
                  this.onSubmit=this.onSubmit.bind(this);    
        
    }
    //we want that if component receive the props then set state
     //and change the state of errors component 
     componentWillReceiveProps(nextProps){
      if(nextProps.errors){
          this.setState({errors:nextProps.errors})
      }
     }
    onSubmit(e){
        e.preventDefault();
        const {user}=this.props.auth;
        const newPost={
            text:this.state.text,
            name:user.name,
            avatar:user.avatar
        }
        //action creator
        this.props.addPosts(newPost);
        this.setState({text:''});
    }
    onChange(e){
         this.setState({[e.target.name]:e.target.value});
     };
    render() {
        const {errors}=this.state;
        return (
            <div className="post-form mb-3">
            <div className="card card-info">
            <div className="card-header bg-info text-white">
            say something....
            </div>
            <div className="card-body">
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <TextAreaFieldGroup
                 placeholder="Create a Post"
                 name="text"
                 value={this.state.text}
                 onChange={this.onChange}
                 error={errors.text}
             />
            </div>
            <button type="submit" className="btn btn-info">Submit</button>
            </form>
            </div>
            </div>   
            </div>
        )
    }
}
PostForm.propTypes={
     addPosts:PropTypes.func.isRequired,
   
    errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
        post:state.post,
        auth:state.auth,
        errors:state.errors
    })

export default connect(mapStateToProps,{addPosts})(PostForm); 

