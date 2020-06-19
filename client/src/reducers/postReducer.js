import {DELETE_POST,ADD_POST,GET_POSTS,GET_POST,POST_LOADING} from '../actions/types';
const initialState={
    posts:[],
    post:[],
    loading:false
    
};
export default function (state=initialState,action){
    switch (action.type) {
        case ADD_POST:
        return{
            ...state,
            //adding the the posts in posts
            // array have the old one also as ...state.posts
            posts:[action.payload,...state.posts]
        }
        case POST_LOADING:
        return{
            ...state,
            loading:true
        }
        case GET_POSTS:
        return{
            ...state,
            posts:action.payload,
            loading:false
        }
        case GET_POST:
        return{
            ...state,
            post:action.payload,
            loading:false
        }
        case DELETE_POST:
        return{
            ...state,
            //the array come but not with the the click on delete button
           posts:state.posts.filter(post=>post._id!==action.payload)
        }
         default:
             return state;
    }
}