import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from '../utils/setAuthToken';
import {GET_ERRORS,SET_CURRENT_USER} from "./types";

//Register User
//action creator
export const registeruser=(userData,history)=>dispatch=>{
//we our fetching async data from backend via axios module
// and wait for respond and then we will dispatch 
//her userData function will have dispatch function 
//inside it means function inside function 
axios
.post('api/users/register',userData)
//Her on we get register data then we redirect to login page
//her history is equal to this.props,history
 .then(res=>history.push('/login'))
.catch(err=>
dispatch({
    type:GET_ERRORS,
    payload:err.response.data
})

);
};

//Login User --Get User Token
export const loginUser=userData=>dispatch=>{
    axios.post('api/users/login',userData)
    .then(res=>{
 //Save to localStorage
 const {token}=res.data;
 localStorage.setItem('jwtToken',token);
 //Set token Auth header
  setAuthToken(token);
  //Decode token to get user data
  const decoded=jwt_decode(token);
  //Set Current_User
  dispatch(setCurrentUser(decoded));

    })
    .catch(err=> dispatch({
    type:GET_ERRORS,
    payload:err.response.data
}))
}
//Set Login User
export const setCurrentUser=(decoded)=>{
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}
//Log user Out
export const logoutUser=()=>dispatch=>{
    if(window.confirm('Are you sure do you want to logout the site?')){
    //Remove token from localStorage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to empty user which will set isAuthenticated =false
    dispatch(setCurrentUser({}));
    }
}