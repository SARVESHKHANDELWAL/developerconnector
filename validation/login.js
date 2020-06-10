const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validateLoginInput(data) {
    let errors={};
    //for empty fields in register inputs
    
    data.email=!isEmpty(data.email) ? data.email :'';
    data.password=!isEmpty(data.password) ? data.password:'';
   

   
    
    //for email field is not empty
    if(Validator.isEmpty(data.email)){
        errors.email='email field is required';
    }
    //for email is not valid
    if(!Validator.isEmail(data.email)){
        errors.email='email is  invalid';
    }
      //for password field is not empty
    if(Validator.isEmpty(data.password)){
        errors.password='password field is required';
    }
     
     
     
    
   return{
       errors:errors,
       isValid:isEmpty(errors)
   } 
}