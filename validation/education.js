const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validateEducationInput(data) {
    let errors={};

    //for empty fields in experience inputs
    
    data.school=!isEmpty(data.school) ? data.school :'';
    data.degree=!isEmpty(data.degree) ? data.degree :'';
    data.fieldofstudy=!isEmpty(data.fieldofstudy) ? data.fieldofstudy:'';
   

    
    //for school field is not empty
    if(Validator.isEmpty(data.school)){
        errors.school='school field is required';
    }
    //for degree field is not empty
    if(Validator.isEmpty(data.degree)){
        errors.degree='degree field is required';
    }
    
      //for fieldofstudy field is not empty
    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy='Field of study field is required';
    }
     //for from field is not empty
     if(Validator.isEmpty(data.from)){
        errors.from='from field is required';
    }
   
   return{
       errors:errors,
       isValid:isEmpty(errors)
   } 
}