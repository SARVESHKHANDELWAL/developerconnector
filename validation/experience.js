const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validateExperienceInput(data) {
    let errors={};

    //for empty fields in experience inputs
    
    data.title=!isEmpty(data.title) ? data.title :'';
    data.company=!isEmpty(data.company) ? data.company :'';
    data.from=!isEmpty(data.from) ? data.from:'';
   

    
    //for title field is not empty
    if(Validator.isEmpty(data.title)){
        errors.title='title field is required';
    }
    //for company field is not empty
    if(Validator.isEmpty(data.company)){
        errors.company='company field is required';
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