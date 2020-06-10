import axios from "axios";

import 
{GET_PROFILE,
PROFILE_LOADING,
CLEAR_CURRENT_PROFILE,
SET_CURRENT_USER,
GET_ERRORS}
 from './types';

//Get current profile
//Action Creator

export const getCurrentProfile = () => dispatch =>{
//we want to dispatch other action called setProfileLoading which will set the 
//loading state before the action does the request 
dispatch(setProfileLoading());
axios.get('/api/profile')
.then(res=>
dispatch({
    type:GET_PROFILE,
    payload:res.data
})
)
.catch(err=>
dispatch({
    //if a user register and come then show them empty object as profile 
    //as he would not have the profile no need the GET_ERRORS Dispatch
    type:GET_PROFILE,
    payload:{}
})
);
}
//Create Profile
export const createProfile=(profileData,history)=>dispatch=>{
    axios.
    post('/api/profile',profileData)
    .then(result=>history.push('/dashboard'))
    .catch(err=>
         dispatch({
         type:GET_ERRORS,
         payload:err.response.data
    }))
}
//delete account & profile
export const deleteAccount = () => dispatch =>{
    if(window.confirm('Are you sure? To Delete this Account')){
        axios.
        delete('/api/profile')
        .then(res=>
         dispatch({
            type:SET_CURRENT_USER,
            payload:{}
        })
        ).catch(err=>
         dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        })
        )
    }
}

//Profile Loading
export const setProfileLoading = () => {
    return{ type:PROFILE_LOADING}
}

//Clear Profile 
export const clearCurrentProfile = () => {
    return{ type:CLEAR_CURRENT_PROFILE}
}

