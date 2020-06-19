import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/postActions';

class CommentItem extends Component {
    onDeleteClick(commentId,postId){
        this.props.deleteComment(commentId,postId);
    }
    render() {
        const {comment,postId,auth}=this.props;
        return (
             <div className="card shadow1 card-body mb-3">
             <div className="row">
                 <div className="col-md-2">
                        <a href="profile.html">
                        <img className="rounded-circle d-none d-md-block"
                        src={comment.avatar} alt=""/>
                        </a>
                        <br/>
                        <p className="text-center">{comment.name}</p>
                 </div>
                 <div className="col-md-10">
                        <p className="lead">{comment.text}
                        </p>
                        {comment.user===auth.user.id?
                        (<button onClick={this.onDeleteClick.bind(this,postId,comment._id)} type="submit" 
                        className="btn btn-danger mr-1"><i className="fas fa-times"></i>{' '}Delete</button>)
                        :null}
                 </div>
             </div>
        </div>
        )
    }
}
CommentItem.propTypes={
     postId:PropTypes.string.isRequired,
     comment:PropTypes.object.isRequired,
     deleteComment:PropTypes.func.isRequired,
     auth:PropTypes.object.isRequired
 }

const mapStateToProps=(state)=>({
    auth:state.auth
})
export default connect(mapStateToProps,{deleteComment})(CommentItem);
