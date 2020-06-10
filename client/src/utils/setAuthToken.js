import axios from 'axios';
const setAuthToken=token=>{
    if(token){
        //Apply to every request
        axios.defaults.headers.common['Authorization']=token;
    }
    else{
        //Delete Auth Token
        delete axios.defaults.headers['Authorization'];
    }
};

export default setAuthToken;
//reponseable to add auth token to every protected route request