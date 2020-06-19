import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
//Actions
import {createProfile,getCurrentProfile} from '../../actions/profileActions'
import {withRouter,Link} from 'react-router-dom';

import isEmpty from '../../validation/is-empty';


class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            displaySocialInputs:false,
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkdin:'',
            youtube:'',
            instagram:'',
            errors:{}
                

        }
         this.onChange=this.onChange.bind(this);
         this.onSubmit=this.onSubmit.bind(this);
    };
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    //we want that if component receive the props then set state
     //and change the state of errors component 
     componentWillReceiveProps(nextProps){
         
      if(nextProps.errors){
          
          this.setState({errors:nextProps.errors})
      }
      if(nextProps.profile.profile){
          const profile=nextProps.profile.profile;

          //skills array back to comma seperated values CSV
          const skillsCSV=profile.skills.join(',');

          //if profile field doesn't exist make empty string
             profile.company=!isEmpty(profile.company)?profile.company:'';
             profile.website=!isEmpty(profile.website)?profile.website:'';
             profile.location=!isEmpty(profile.location)?profile.location:'';
             profile.githubusername=!isEmpty(profile.githubusername)?profile.githubusername:'';
             profile.bio=!isEmpty(profile.bio)?profile.bio:'';
                 //as soical is object
             profile.social=!isEmpty(profile.social)?profile.social:{}; 
                profile.twitter=!isEmpty(profile.social.twitter)?profile.social.twitter:''; 
                profile.facebook=!isEmpty(profile.social.facebook)?profile.social.facebook:''; 
                profile.linkedin=!isEmpty(profile.social.linkedin)?profile.social.linkedin:''; 
                profile.instagram=!isEmpty(profile.social.instagram)?profile.social.instagram:''; 
      
        //Set component fields state
        this.setState({
             handle:profile.handle,
             company:profile.company,
             website:profile.website,
             location:profile.location,
             status:profile.status,
             skills:skillsCSV,
             githubusername:profile.githubusername,
             bio:profile.bio,
             twitter:profile.twitter,
             facebook:profile.facebook,
             linkedin:profile.linkedin,
             instagram:profile.instagram,

        });
      }
     }
     
     onSubmit(e){
        e.preventDefault();
         const profileData={
             handle:this.state.handle,
             company:this.state.company,
             website:this.state.website,
             location:this.state.location,
             status:this.state.status,
             skills:this.state.skills,
             githubusername:this.state.githubusername,
             bio:this.state.bio,
             twitter:this.state.twitter,
             facebook:this.state.facebook,
             linkedin:this.state.linkedin,
             instagram:this.state.instagram,

         };
        this.props.createProfile(profileData,this.props.history);
    }
     onChange(e){
         this.setState({[e.target.name]:e.target.value});
     };
    render() {
        const {errors,displaySocialInputs}=this.state;
     
     const Todisplay=(
         <div>
         <InputGroup
         placeholder="Twitter Porfile Url"
         name="twitter"
         value={this.state.twitter}
         icon="fab fa-twitter"
         onChange={this.onChange}
         error={errors.twitter}
         />
          <InputGroup
         placeholder="Facebook Porfile Url"
         name="facebook"
         value={this.state.facebook}
         icon="fab fa-facebook"
         onChange={this.onChange}
         error={errors.facebook}
         />
          <InputGroup
         placeholder="Linkedin Porfile Url"
         name="linkedin"
         value={this.state.linkedin}
         icon="fab fa-linkedin"
         onChange={this.onChange}
         error={errors.linkedin}
         />
          <InputGroup
         placeholder="Instagram Porfile Url"
         name="instagram"
         value={this.state.instagram}
         icon="fab fa-instagram"
         onChange={this.onChange}
         error={errors.instagram}
         />
         <InputGroup
         placeholder="Youtube Porfile Url"
         name="youtube"
         value={this.state.youtube}
         icon="fab fa-youtube"
         onChange={this.onChange}
         error={errors.youtube}
         />
         </div>
     )
        //select options for status
        const options=[
            {label:'*Select Professional status',value:0},
            {label:'Developer',value:'Developer'},
            {label:'Junior Developer',value:'Junior Developer'},
            {label:'Senior Developer',value:'Senior Developer'},
            {label:'Manager',value:'Manager'},
            {label:'Student or Learner',value:'Student or Learner'},
            {label:'Instructor or Teacher',value:'Instructor or Teacher'},
            {label:'Intern',value:'Intern'},
            {label:'Other',value:'Other'}]
        return (

            <div className='create-profile'>
               <div className='container'>
                 <div className='row'>
                     <div className="col-md-10 m-auto">
                             <Link to='/dashboard' className="btn btn-info">
                             Go Back
                             </Link>
                         <h1 className="display-4 text-center">Edit Profile</h1>
                         
                         <small className="d-block pb-3">*=required fields</small>
                        <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder="*Profile Handle"
                            name= "handle"
                            type="text"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for you profile URL.Your full name,company name,nickname"/>
                            <SelectListGroup 
                            placeholder="Status"
                            name= "status"
                            value={this.state.status}
                            options={options}
                            onChange={this.onChange}
                            error={errors.status}
                            info="Give us an Idea of where you are in your career"/>
                        <TextFieldGroup 
                            placeholder="Company"
                            name= "company"
                            type="text"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                            info="Could be your own company or You work for"/>
                        <TextFieldGroup 
                            placeholder="*Skills"
                            name= "skills"
                            type="text"
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={errors.skills}
                            info="Please use comma seperated values (eg. HTML,CSS,JavaScript,Python)"/>
                        <TextFieldGroup 
                            placeholder="GitHub Username"
                            name= "githubusername"
                            type="text"
                            value={this.state.githubusername}
                            onChange={this.onChange}
                            error={errors.githubusername}
                            info="If you want to inculde youe latest repofrom GitHub, include your username"/>
                        <TextAreaFieldGroup 
                            placeholder="Short Bio"
                            name= "bio"
                            type="text"
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="Tell us about your Self"/>
                       
                            
                         <div className="mb-3">
                         <button type="button" className="btn btn-info mb-4" onClick={()=>{
                             this.setState(prevState=>({
                                 displaySocialInputs:!prevState.displaySocialInputs
                             }));
                         }}
                         >
                         Add Social linkdin
                         </button>
                         <span className="text-muted  ml-4">Optional</span>
                         {displaySocialInputs?
                         Todisplay:
                         null}
                         <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>
                         </div>
                        </form>
                      </div>
                  </div>
               </div>
            </div>
        )
    }
}
CreateProfile.propTypes={
     createProfile:PropTypes.func.isRequired,
     getCurrentProfile:PropTypes.func.isRequired,
     profile:PropTypes.object.isRequired,
     errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
        profile:state.profile,
        auth:state.auth,
        errors:state.errors
    })
export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(CreateProfile));