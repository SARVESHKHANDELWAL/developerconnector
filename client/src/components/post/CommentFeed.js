import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem'

 class CommentFeed extends Component {
    render() {
        const {comment,postId}=this.props;
        return comment.map(comment=><CommentItem key={comment._id}
        comment={comment} postId={postId}/>)
    }
}
CommentFeed.propTypes={
    comment:PropTypes.array.isRequired,
    postId:PropTypes.string.isRequired,
}

export default CommentFeed;