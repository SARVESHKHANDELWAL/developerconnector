import {combineReducers} from 'redux';
import authReducer from './authReducer';   
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
export default combineReducers({ 
    //here we call object which we want its name and its reducer by that 
    //reference we call its props in component fields
    auth:authReducer,
    errors:errorReducer,
    profile:profileReducer,
    post:postReducer
})