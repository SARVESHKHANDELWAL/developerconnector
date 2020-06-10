const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validatePostInput(data) {
    let errors={};

    //for empty fields in post inputs
    data.text=!isEmpty(data.text) ? data.text :'';
    
    //for length validation
    if(!Validator.isLength(data.text,{min:2,max:300})){
        errors.text='Post must be between 2 and 300 characters';
    }
    //for text field is not empty
    if(Validator.isEmpty(data.text)){
        errors.text='text field is required';
    }
    
   return{
       errors:errors,
       isValid:isEmpty(errors)
   } 
}