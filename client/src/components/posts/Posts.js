import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PostForm  from './PostForm';
import Spinner from '../dashboard/Spinner';
import {getPosts} from '../../actions/postActions';
import PostFeed from './PostFeed';
class Posts extends Component {
    componentDidMount(){
         //Calling action when the component Dashboard is mounted on screen
         this.props.getPosts();
     }
     
    render() {
        const {posts,loading}=this.props.post;
        let postContent;
        if(posts===null||loading===true){
            postContent=<Spinner/>
        }
        else{
            postContent=<PostFeed posts={posts}/>
        }
        return (
             <div>
                 <div className="feed">
                     <div className="row">
                         <div className="col-md-12">
                         <PostForm/>
                         {postContent}
                         </div>
                     </div>
                 </div>
             </div>
        )
    }
}
Posts.propTypes={
     getPosts:PropTypes.func.isRequired,
     post:PropTypes.object.isRequired
 }
 const mapStateToProps=(state)=>({
     post:state.post
 })
export default connect(mapStateToProps,{getPosts})(Posts);