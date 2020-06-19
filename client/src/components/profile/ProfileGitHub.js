import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

 class ProfileGitHub extends Component {
     constructor(props){
         super(props);
         this.state={
             clientId:'2b61d507b14646f747fa',
             clientSecret:'beba58d492af9359ec2b08c3e2a1544eb6848840',
             count:6,
             sort:'created:asc',
             repos:[]
         }
     }
     componentDidMount(){
        const {githubusername}=this.props.profile.profile;
        const{count,sort,clientId,clientSecret}=this.state;
        //how to deal with api its important to have it
                 fetch(`https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
                 .then(res=>res.json())
                 .then(data=>{
                   
                    this.setState({repos:data})
                 })
                 .catch(err=>console.log(err))

     }  

       render() {
       const {repos}= this.state;
       
       const repoItems=repos.map(repo=>(
           <div key={repo.id} className="card card-body shadow1 border border-info mb-2">
           <div className="row">
           <div className="col-md-6">
           <h4>
           <a className="text-info" href={repo.html_url}
              target="_blank">
              {repo.name}
              </a>
              </h4>
              <p>
              {repo.description}
              </p>
              
              <span className="badge badge-info float-md-left">
 
           Created At:{repo.created_at}
           </span>
           </div>
           <div className="col-md-6">
           <span className="badge badge-info float-md-right mr-1">
           Stars:{repo.stargazers_count}
           </span>
           <span className="badge badge-secondary float-md-right mr-1">
           Watchers:{repo.watchers_count}
           </span>
           <span className="badge badge-success float-md-right mr-1">
           Forks:{repo.forks_count}
           </span>
           </div>
          
           </div>
           </div>
       ))
    
        return (
            <div>
                <h3 className="text-center text-info">GitHub</h3>
                <hr/>
                <h4 className="mb-4 text-center">Latest User Repo</h4>
                {repoItems}
            </div>
        )
    }
}
ProfileGitHub.propTypes={
     
     profile:PropTypes.object.isRequired
     }
//map the state with props
const mapStateToProps=(state)=>({
    profile:state.profile
});

export default connect(mapStateToProps,null)(ProfileGitHub);


