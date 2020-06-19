import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//Actions 
import {addEducation} from '../../actions/profileActions';

class AddEducation extends Component {
     constructor(props){
        super(props);
        this.state={
            school:'',
            degree:'',
            fieldofstudy:'',
            from:'',
            to:'',
            current:false,
            description:'',
            disabled:'',
            errors:{}
                

        }
         this.onChange=this.onChange.bind(this);
         this.onSubmit=this.onSubmit.bind(this);
         this.onCheck=this.onCheck.bind(this);
    };
    onSubmit(e){
        e.preventDefault();
       const eduData={
           school:this.state.school,
           degree:this.state.degree,
           fielsofstudy:this.state.fielsofstudy,
           from:this.state.from,
           to:this.state.to,
           current:this.state.current,
           description:this.state.description,

       }
       this.props.addEducation(eduData,this.props.history);
        /* if(window.confirm('Are you sure to sumbit this education as profiledo fill the required fields')){
             this.props.history.push('/dashboard');
         } */
        
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
     onCheck(e){
        this.setState({
            disabled:!this.state.disabled,
            current:!this.state.current
        })
     }
    render() {
         const {errors}=this.state;
         
        return (
            <div className="add-education">
                 <div className="container">
                     <div className="row">
                         <div className="col-md-10 m-auto">
                             <Link to='/dashboard' className="btn btn-info">
                             Go Back
                             </Link>
                             <h1 className="display-4 text-center">Add Education</h1> 
                             <p className="lead text-center">Add any school,bootcamp,etc that you have attended</p>
                             <small className="d-block pb-3">*=required fields</small>
                              <form onSubmit={this.onSubmit}>
                              <TextFieldGroup 
                                placeholder="*School"
                                name= "school"
                                type="text"
                                value={this.state.school}
                                onChange={this.onChange}
                                error={errors.school}
                                />
                                <TextFieldGroup 
                                placeholder="*Degree or Cerfification"
                                name= "degree"
                                type="text"
                                value={this.state.degree}
                                onChange={this.onChange}
                                error={errors.degree}
                                />
                                <TextFieldGroup 
                                placeholder="*Field of Study"
                                name= "fieldofstudy"
                                type="text"
                                value={this.state.fieldofstudy}
                                onChange={this.onChange}
                                error={errors.fieldofstudy}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup 
                                name= "from"
                                type="date"
                                value={this.state.from}
                                onChange={this.onChange}
                                error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup 
                                name= "to"
                                type="date"
                                value={this.state.to}
                                onChange={this.onChange}
                                error={errors.to}
                                disabled={this.state.disabled ?'disabled':''}
                                />
                                <div className="form-check mb-4">
                                    <input 
                                     type="checkbox" 
                                     className="form-check-input" 
                                     name="current" 
                                     value={this.state.value}
                                     checked={this.state.current} 
                                     onChange={this.onCheck} 
                                     id="current" />
                                     <label htmlFor="current" 
                                     className="form-check-label">
                                     Currently pursuing Degree
                                     </label>
                                 </div>         
                                     <TextAreaFieldGroup 
                                        placeholder="Program Description"
                                        name= "description"
                                        type="text"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        error={errors.description}
                                        info="Tell us about the program that you our in."/>
                                   
                                 <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>

                              </form>
                          </div>
                      </div> 
                 </div>
            </div>     
          )
    }
}
AddEducation.propTypes={
    addEducation:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
        profile:state.profile,
        errors:state.errors
    })

export default connect(mapStateToProps,{addEducation})(withRouter(AddEducation));
