import axios from "axios";

import 
{GET_PROFILE,
GET_PROFILES,
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
    .then(res=>history.push('/dashboard'))
    .catch(err=>
         dispatch({
         type:GET_ERRORS,
         payload:err.response.data
    }))
}
//Add Experience
export const addExperience= (expData,history) => dispatch=>{
    axios
    .post('api/profile/experience',expData)
    .then(res=>history.push('/dashboard'))
    .catch(err=>
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data

    }))

}
//Add Education
export const addEducation= (eduData,history) => dispatch=>{
    axios
    .post('api/profile/education',eduData)
    .then(res=>history.push('/dashboard'))
    .catch(err=>
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data

    }))

}
//Get Profiles
export const getProfiles= () => dispatch=>{
    //loading state before the action does the request 
    dispatch(setProfileLoading());
            axios
            .get('/api/profile/all')
            .then(res=>
            dispatch({
                type:GET_PROFILES,
                payload:res.data
            }))
            .catch(err=>
            dispatch({
                type:GET_PROFILE,
                payload:{}

    }))

}
//Get Profile
export const getProfileByHandle= (handle) => dispatch=>{
    //loading state before the action does the request 
    dispatch(setProfileLoading());
            axios
            .get(`/api/profile/handle/${handle}`)
            .then(res=>
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            }))
            .catch(err=>
            dispatch({
                type:GET_PROFILE,
                payload:null

    }))

}




//delete Experience
export const deleteExperience= id => dispatch=>{
    axios
    .delete(`api/profile/experience/${id}`)
    .then(res=>
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    }))
    .catch(err=>
    dispatch({
        type:GET_ERRORS,
        payload:err.response.data

    }))

}

//delete Education
export const deleteEducation= id => dispatch=>{
    axios
    .delete(`api/profile/education/${id}`)
    .then(res=>
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    }))
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

