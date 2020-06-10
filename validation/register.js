const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validateRegisterInput(data) {
    let errors={};
    //for empty fields in register inputs
    data.name=!isEmpty(data.name) ? data.name :'';
    data.email=!isEmpty(data.email) ? data.email :'';
    data.password=!isEmpty(data.password) ? data.password:'';
    data.password2=!isEmpty(data.password2) ? data.password2 :'';

    //for length validation
    if(!Validator.isLength(data.name,{min:2,max:30})){
        errors.name='Name must be between';
    }
    //for name field is not empty
    if(Validator.isEmpty(data.name)){
        errors.name='Name field is required';
    }
    //for email field is not empty
    if(Validator.isEmpty(data.email)){
        errors.email='Email field is required';
    }
     //for email is not valid
    if(!Validator.isEmail(data.email)){
        errors.email='Email is  invalid';
    }
      //for password field is not empty
    if(Validator.isEmpty(data.password)){
        errors.password='Password field is required';
    }
      //for password length max,min
    if(!Validator.isLength(data.password,{min:6,max:30})){
        errors.password='Password must have at least of 6 digits';
    }
      //for password2 field is not empty
    if(Validator.isEmpty(data.password2)){
        errors.password2='Confirm Password field is required';
    }
      //compare the  password and confirm password fields
    if(!Validator.equals(data.password,data.password2)){
        errors.password2='Confirm Password does not match';
    }
    
   return{
       errors:errors,
       isValid:isEmpty(errors)
   } 
}