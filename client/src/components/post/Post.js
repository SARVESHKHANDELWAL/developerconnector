import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import {getPost} from '../../actions/postActions';
import Spinner from '../dashboard/Spinner';
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
     componentDidMount(){
         //Calling action when the component Dashboard is mounted on screen

         this.props.getPost(this.props.match.params.id);
     }
    render() {
        const {post,loading} =this.props.post;
        let postContent;
        if(post===null||loading||Object.keys(post).length===0){
            postContent=<Spinner/>
        }
        else{
            postContent=(
                <div>
                <PostItem post={post} showActions={false}/>
                <CommentForm postId={post._id}/>
                <CommentFeed postId={post._id} comment={post.comment}/>
                </div>
            )
            
            
            
        
        }
        return (
            <div className="post">
                <div className="row">
                <div className="col-md-12 ">
                <Link to='/feed' className="btn btn-info mb-4" >Back To Feed</Link>
                {postContent}
                </div>
                </div>
            </div>
        )
    }
}
Post.propTypes={
     post:PropTypes.object.isRequired,
     getPost:PropTypes.func.isRequired,
    
 }

const mapStateToProps= state =>({
    post:state.post
})
export default connect(mapStateToProps,{getPost})(Post);


